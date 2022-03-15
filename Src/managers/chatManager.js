import options from "./options/mysqlite3config.js";
import knex from 'knex';
const database = knex(options);


const getTime =()=>{
    let getTime = new Date()
    let date = getTime.getDate()+"/"+(getTime.getMonth()+1)+"/"+getTime.getFullYear()
    let time = getTime.getHours()+":"+getTime.getMinutes()+":"+getTime.getSeconds()
    let dateTime = date+" "+time
    return dateTime

}

class chatManager{

    insert= async(data)=>{
        let tableExists = await database.schema.hasTable('chat');
    if(tableExists){
        let message = data
        let time = getTime()
        message.time = time
        database("chat").insert(message)
        .then(console.log)
        .catch(console.log)
    }else{
        await database.schema.createTable('chat',table=>{
            
            table.string('email',15).nullable(false);
            table.string('message',10).nullable(false);
            table.increments('id');
            table.timestamp("time")
        })
        let message = data
        let time = getTime()
        message.time = time
        await database("chat").insert(message)
        .then(console.log)
        .catch(console.log)
    }
    

    }
    select= async()=>{
        let products = await database.from("chat").select("email","time","message")
        .then(data=>{
            let products = JSON.parse(JSON.stringify(data));
           return products
            
        })
        .catch(console.log)
        return products
    }

}



export default chatManager