import { Context } from 'hono';
import { validator } from 'hono/validator'

export const createCommentValidator = validator('json', (value, c) => {
    const { text } = value;
    return createCommentCheck({ text }, c);
})

export const createCommentCheck = ({ text }: { text: any }, c: Context) => {
    if (!text || typeof text !== 'string' || text.trim().length < 1) {
        return c.json({ error: 'Field `title` is required with minimum length of 1 characters' }, 400)
    }
}