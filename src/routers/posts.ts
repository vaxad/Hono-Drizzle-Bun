import { Hono } from "hono";
import { createPostValidator } from "../validators/post";
import { db } from "../db";
import { comments, posts } from "../db/schema";
import { authMiddleware } from "../middlewares/auth";
import { and, eq } from "drizzle-orm";
import { sendError } from "../utils/error";
import { createCommentValidator } from "../validators/comment";

const app = new Hono()

app.post('/', authMiddleware, createPostValidator, async (c) => {
    const { title, content } = await c.req.json();
    await db.insert(posts).values({ title, content, userId: c.get('user').id })
    return c.json({ success: true });
})

app.get('/', authMiddleware, async (c) => {
    const postList = await db.query.posts.findMany({
        where: eq(posts.userId, c.get('user').id)
    })
    return c.json({ posts: postList, success: true })
})

app.get('/all', authMiddleware, async (c) => {
    const post = await db.query.posts.findMany()
    return c.json({ post, success: true })
})

app.get('/:id', authMiddleware, async (c) => {
    const { id } = c.req.param()
    const post = await db.query.posts.findFirst({
        where: and(
            eq(posts.userId, c.get('user').id),
            eq(posts.id, Number(id))
        )
    })
    if (!post) return sendError(c, "Post not found!", 404)
    return c.json({ post, success: true })
})


app.put('/:id', createPostValidator, authMiddleware, async (c) => {
    const { id } = c.req.param()
    const { title, content } = await c.req.json();
    await db.update(posts)
        .set({ title, content, updatedAt: new Date(Date.now()) })
        .where(
            and(
                eq(posts.userId, c.get('user').id),
                eq(posts.id, Number(id))
            )
        );
    return c.json({ success: true })
})

app.delete('/:id', authMiddleware, async (c) => {
    const { id } = c.req.param()
    await db.delete(posts)
        .where(
            and(
                eq(posts.userId, c.get('user').id),
                eq(posts.id, Number(id))
            )
        )
    return c.json({ success: true })
})

app.get('/:id/comment', authMiddleware, async (c) => {
    const { id } = c.req.param()
    const commentsList = await db.query.comments.findMany({
        where: and(
            eq(comments.postId, Number(id))
        )
    })
    return c.json({ comments: commentsList, success: true })
})

app.post('/:id/comment', authMiddleware, createCommentValidator, async (c) => {
    const { id } = c.req.param()
    const { text } = await c.req.json();
    await db.insert(comments).values({ text, userId: c.get('user').id, postId: Number(id) })
    return c.json({ success: true });
})

export default app;