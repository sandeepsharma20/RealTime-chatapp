import app from './app.js'

import dotenv from 'dotenv'
dotenv.config();
 const port=process.env.PORT_NUMBER ||3000
 app.listen(port,()=>{
    console.log('server is ready on :'+port)
 })
