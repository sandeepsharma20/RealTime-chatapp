 import express from 'express'

import authrouter from './controllers/authController.js'
import userrouter from './controllers/userController.js'

 const app=express();
 app.use(express.json())
  app.use('/api/auth',authrouter)
  app.use('/api/user',userrouter)
  export default app