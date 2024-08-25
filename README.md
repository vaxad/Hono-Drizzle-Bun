To install dependencies:
```sh
bun install
```
_Set environment variable for [neonDB postgres databas](https://neon.tech/)_ as `DATABASE_URL` along with `JWT_SECRET`

For syncing database:
```sh
bun run db:generate
bun run db:migrate
bun run db:push
```

For dropping database:
```sh
bun run db:drop
```

To run:
```sh
bun run dev
```

open http://localhost:5000

### Documentation regarding the API can be found in the [bruno](https://www.usebruno.com/) collection given
