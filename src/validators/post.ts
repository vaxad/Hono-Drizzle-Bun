import { Context } from 'hono';
import { validator } from 'hono/validator'

export const createPostValidator = validator('json', (value, c) => {
    const { title, content } = value;
    return createPostCheck({ title, content }, c);
})

export const createPostCheck = ({ content, title }: { title: any, content: any }, c: Context) => {
    if (!title || typeof title !== 'string' || title.trim().length < 1) {
        return c.json({ error: 'Field `title` is required with minimum length of 1 characters' }, 400)
    }
    if (!content || typeof content !== 'string' || content.trim().length < 1) {
        return c.json({ error: 'Field `password` is required with minimum length of 1 characters' }, 400)
    }
}