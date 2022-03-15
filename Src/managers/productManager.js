import options from "./options/mysqloptions.js";
import knex from 'knex';
const database = knex(options);




class productManager{

    insert= async(data)=>{
        let tableExists = await database.schema.hasTable('products');
    if(tableExists){
        database("products").insert(data)
        .then(console.log)
        .catch(console.log)
    }else{
        await database.schema.createTable('products',table=>{
            
            table.string('title',15).nullable(false);
            table.float('price').nullable(false);
            table.string("thumbnail",150)
            table.increments("id")
        })
        await database("products").insert(data)
        .then(console.log)
        .catch(console.log)
    }
    }
    select= async()=>{
        let products = await database.from("products").select("title","price","thumbnail").orderBy('price','asc')
        .then(data=>{
            let products = JSON.parse(JSON.stringify(data));
           return products
            
        })
        .catch(console.log)
        return products
    }

}






export default productManager