import { Hono } from "hono";
import { createCommentValidator } from "../validators/comment";
import { authMiddleware } from "../middlewares/auth";
import { db } from "../db";
import { comments } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { sendError } from "../utils/error";

const app = new Hono()

app.get('/', authMiddleware, async (c) => {
    const commentList = await db.query.comments.findMany({
        where: eq(comments.userId, c.get('user').id)
    })
    return c.json({ comments: commentList, success: true })
})

app.get('/:id', authMiddleware, async (c) => {
    const { id } = c.req.param()
    const comment = await db.query.comments.findFirst({
        where: and(
            eq(comments.userId, c.get('user').id),
            eq(comments.id, Number(id))
        )
    })
    if (!comment) return sendError(c, "Comment not found!", 404)
    return c.json({ comment, success: true })
})

app.put('/:id', createCommentValidator, authMiddleware, async (c) => {
    const { id } = c.req.param()
    const { text } = await c.req.json();
    await db.update(comments).set({ text, updatedAt: new Date(Date.now()) }).where(and(
        eq(comments.userId, c.get('user').id),
        eq(comments.id, Number(id))
    ))
    return c.json({ success: true })
})

app.delete('/:id', authMiddleware, async (c) => {
    const { id } = c.req.param()
    await db.delete(comments)
        .where(
            and(
                eq(comments.userId, c.get('user').id),
                eq(comments.id, Number(id))
            )
        )
    return c.json({ success: true })
})

export default app;