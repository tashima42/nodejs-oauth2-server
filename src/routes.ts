import {Router} from "express";
import path from "path"

import {authorizeUserController} from "./use-cases/authorize-user";
import {createTokenController} from "./use-cases/create-token";

const loginFilePath = path.join(__dirname, '../public/oauthAuthenticate.html')

const router = Router()

router.get('/login', (_, res) => res.sendFile(loginFilePath))
router.post('/authorize', (req, res) => authorizeUserController.handle(req, res))
router.post('/token', (req, res) => createTokenController.handle(req, res))

export {router}
