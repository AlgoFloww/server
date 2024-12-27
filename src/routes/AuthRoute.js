import express from 'express'
import * as authRouter from '../controllers/AuthController.js'

// import { Router } from 'express'

const route = express.Router()

// 클라이언트가 서버에 카카오 로그인 요청
route.post('/', authRouter.requestKakaoLogin)

export default route