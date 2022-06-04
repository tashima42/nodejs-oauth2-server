import {app, sqliteDatabase} from "./index"
const port = process.env.PORT || 3890

sqliteDatabase.open().then(() => {
    app.listen(port, () => console.info("app listening on port", port))
})

