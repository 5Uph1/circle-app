import express from "express"
import { loginUser, registerUser } from "../controllers/user"

export const user = express.Router()

user.post('/register', registerUser)
user.post('/login', loginUser)