import {Router} from "express";
import path from "path"

import {authorizeUserController} from "./use-cases/authorize-user/index";
import {createTokenController} from "./use-cases/create-token/index";
import {getUserInfoController} from "./use-cases/get-user-info/index";

const loginFilePath = path.join(__dirname, '../public/oauthAuthenticate.html')

const router = Router()


// Register routes from controllers declared on use-cases
router.get('/', (_, res) => res.status(200).json({success: true}))
router.get('/authorize', (_, res) => res.sendFile(loginFilePath))
router.post('/login', (req, res) => authorizeUserController.handle(req, res))
router.post('/token', (req, res) => createTokenController.handle(req, res))
router.get('/userinfo', (req, res) => getUserInfoController.handle(req, res))

export {router}
