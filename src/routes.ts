import {Router} from "express";
import path from "path"

import {authorizeUserController} from "./use-cases/authorize-user";

const loginFilePath = path.join(__dirname, './public/oauthAuthenticate.html')

const router = Router()

router.get('/login', (_, res) => res.sendFile(loginFilePath))
router.post('/authorize', (req, res) => authorizeUserController.handle(req, res))

export {router}
