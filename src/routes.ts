import {Router} from "express";
import path from "path"

import {authorizeUserController} from "./use-cases/authorize-user";
import {createTokenController} from "./use-cases/create-token";

const loginFilePath = path.join(__dirname, '../public/oauthAuthenticate.html')

const router = Router()

function log(req, res, next) {
  console.log({
    body: req.body,
    url: req.url,
  })
  return next()
}

router.get('/login', log, (_, res) => res.sendFile(loginFilePath))
router.post('/authorize', log,  (req, res) => authorizeUserController.handle(req, res))
router.post('/token', log, (req, res) => createTokenController.handle(req, res))
router.get('/userinfo', log, (req, res) => res.status(200).json({subscriber_id: "123", country_code: "AR"}))

export {router}
