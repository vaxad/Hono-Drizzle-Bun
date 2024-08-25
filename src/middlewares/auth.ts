import { createMiddleware } from 'hono/factory'
import { sendError } from '../utils/error';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { User, users } from '../db/schema';
import { getPayload } from '../utils/auth';
import { OmitKey } from '../utils/types';

export const authMiddleware = createMiddleware<{
    Variables: {
        user: OmitKey<User, "password">
    }
}>(async (c, next) => {
    const { token } = c.req.header();
    if (!token) return sendError(c, "Please login!", 404)
    const payload = await getPayload(token);
    if (!payload || !payload.id) return sendError(c, "Invalid token!", 404)
    const user = await db.query.users.findFirst({
        columns: {
            password: false
        },
        where: eq(users.id, Number(payload.id))
    })
    if (!user) return sendError(c, "User noy found!", 404)
    c.set('user', user)
    await next()
})