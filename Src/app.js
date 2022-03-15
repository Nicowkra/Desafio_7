import express  from "express"
import {Server}  from'socket.io'
import handlenbars from "express-handlebars"
import productManager from './managers/productManager.js'
import chatManager from "./managers/chatManager.js";
import path from 'path';
import options from "./managers/options/mysqloptions.js"
import knex from 'knex'




const __dirname = path.resolve();
const app = express()
const PORT = process.env.PORT||8080
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`))
const io = new Server(server)
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



let productService = new productManager
let chatService = new chatManager


io.on('connection',async socket=>{
    console.log("Cliente conectado")
    let products = await productService.select()
    io.emit("productLog", products)

    let chat = await chatService.select()
    console.log(chat)
    io.emit("chatLog", chat)
  
    socket.on('sendProduct',async data=>{
      await productService.insert(data)
      let products = await productService.select()
      io.emit('productLog',products)
   })

   socket.on('sendChat',async data=>{
      await chatService.insert(data)
      let chat = await chatService.select()
      io.emit('chatLog',chat)
   })



})

