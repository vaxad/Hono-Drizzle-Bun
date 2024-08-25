import { decode, sign, verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'


export const getToken = async (text: JWTPayload) => {
    const secret = process.env.JWT_SECRET as string
    const token = await sign(text, secret);
    return token;
}

export const getPayload = async (token: string) => {
    const secret = process.env.JWT_SECRET as string
    const payload = await verify(token, secret);
    return payload
}