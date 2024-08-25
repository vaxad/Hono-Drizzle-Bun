import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

export const sendError = (c: Context, msg: string = "Some Error Occurred", status: StatusCode = 500) => {
    return c.json({ error: msg }, status)
}