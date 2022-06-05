import {Router} from "express";
import path from "path"

import {loginUserController} from "./use-cases/login-user/index";
import {createTokenController} from "./use-cases/create-token/index";
import {getUserInfoController} from "./use-cases/get-user-info/index";
import {refreshTokenController} from "./use-cases/refresh-token/index";
import {authorizeUserMiddleware} from "./use-cases/authorize-user/index"

const loginFilePath = path.join(__dirname, '../public/oauth-authenticate.html')

const router = Router()

// Register routes from controllers declared on use-cases
router.get('/', (_, res) => res.status(200).json({success: true}))

router.post('/auth/login', (req, res) => loginUserController.handle(req, res))
router.get('/auth/authorize', (_, res) => res.sendFile(loginFilePath))
router.post('/auth/token', (req, res) => createTokenController.handle(req, res))
router.post('/auth/refresh-token', (req, res) => refreshTokenController.handle(req, res))

router.use((req, res, next) => authorizeUserMiddleware.handle(req, res, next))

router.get('/userinfo', (req, res) => getUserInfoController.handle(req, res))

export {router}
