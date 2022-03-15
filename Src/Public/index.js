const socket = io()
let productForm = document.getElementById("productsForm")



productForm.addEventListener("submit",(evt) =>{
    evt.preventDefault()
    let data = new FormData(productForm)
    let sendObj = {}
    data.forEach((val,key)=>sendObj[key]=val)
    socket.emit("sendProduct",sendObj)
    productForm.reset()
})

let chatForm = document.getElementById("chatForm")

chatForm.addEventListener("submit",(evt) =>{
    evt.preventDefault()
    message = document.getElementById("message").value
    user = document.getElementById("email").value
    sendObj ={email:user,message:message}
    socket.emit("sendChat",sendObj)
    chatForm.reset()
})

socket.on('productLog',(data)=>{
    let products = data
    let productTemplate = document.getElementById("productTemplate")
    fetch('Template/newProduct.handlebars').then(response=>{
        return response.text()
    }).then(template=>{
        const processedTemplate = Handlebars.compile(template)
        const html = processedTemplate({products})
        productTemplate.innerHTML = html

    })
})


socket.on('chatLog',(data)=>{
    if(data){
        console.log(data)
        let log = document.getElementById('log')
        let messages = ""
        for (let [key, message] of Object.entries(data)) {
            messages  = messages+ `<span class ="user">${message.email}</span> <span class ="time">[${message.time}]:</span><span class ="message">${message.message}</span></br>`
        }
        log.innerHTML = messages
}
})