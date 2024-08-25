import { Context } from 'hono';
import { validator } from 'hono/validator'

export const createUserValidator = validator('json', (value, c) => {
    const { name, email, password } = value;
    return createUserCheck({ name, email, password }, c);
})

export const loginUserValidator = validator('json', (value, c) => {
    const { email, password } = value;
    return loginUserCheck({ email, password }, c);
})


export const createUserCheck = ({ name, email, password }: { name: any, email: any, password: any }, c: Context) => {
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return c.json({ error: 'Field `name` is required with minimum length of 2 characters' }, 400)
    }
    loginUserCheck({ email, password }, c);
}

export const loginUserCheck = ({ email, password }: { email: any, password: any }, c: Context) => {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return c.json({ error: 'Field `email` is required and must be a valid email' }, 400)
    }
    if (!password || typeof password !== 'string' || password.trim().length < 8) {
        return c.json({ error: 'Field `password` is required with minimum length of 8 characters' }, 400)
    }
}