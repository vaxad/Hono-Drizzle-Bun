import { Hono } from 'hono'
import { logger } from 'hono/logger'

import users from './user'

export const routes = (app: Hono) => {
    app.use('*', logger())
    app.route('/user', users)
}