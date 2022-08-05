import { app, postgresDatabase } from "./index"
const port = process.env.PORT || 3000

let server = null
postgresDatabase.open().then(() => {
  postgresDatabase.migrate().then(() => {
    server = app.listen(port, () => console.info("app listening on port", port))
  })
})

// graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal, close all connections');
  server.close().then(() => {
    postgresDatabase.close().then(() => {
      console.info("Closed all connections, shutting down.")
      process.exit(0)
    })
  })
});


