import { Hono } from 'hono'
import { logger } from 'hono/logger'

import users from './user'
import posts from './posts'
import comments from './comments'

export const routes = (app: Hono) => {
    app.use('*', logger())
    app.route('/user', users)
    app.route('/post', posts)
    app.route('/comment', comments)
}