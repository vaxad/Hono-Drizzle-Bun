import { Hono } from "hono";
import { createUserValidator, loginUserValidator } from "../validators/user";
import { db } from "../db";
import { users } from "../db/schema";
import { checkHash, hash } from "../utils/security";
import { eq } from "drizzle-orm";
import { sendError } from "../utils/error";
import { getToken } from "../utils/auth";
import { authMiddleware } from "../middlewares/auth";

const app = new Hono();

app.post('/', createUserValidator, async (c) => {
    const { name, email, password } = await c.req.json();
    const hashedPassword = await hash(password);
    if (!hashedPassword) return c.json({ error: "Error occurred while hashing password" }, 500);
    const x = { name, email, password: hashedPassword }
    await db.insert(users).values(x);
    return c.json({ success: true }, 200);
})

app.get('/', async (c) => {
    const users = await db.query.users.findMany({
        columns: {
            password: false
        }
    });
    return c.json({ users, success: true });
})

app.post('/login', loginUserValidator, async (c) => {
    const { email, password } = await c.req.json();
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    })
    if (!user) return sendError(c, "User not found!", 404)

    const pwCheck = checkHash(user.password, password);
    if (!pwCheck) return sendError(c, "Invalid Credentials!", 400)

    const token = await getToken({
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3 // 3 day validity
    })
    return c.json({ token, success: true })
})

app.get('/me', authMiddleware, async (c) => {
    return c.json({ user: c.get("user"), success: true })
})


app.get('/:id', async (c) => {
    const { id } = c.req.param();
    const user = await db.query.users.findFirst({
        columns: {
            password: false
        },
        where: eq(users.id, Number(id))
    })
    if (!user) return sendError(c, "User not found!")
    return c.json({ user, success: true })
})

export default app;