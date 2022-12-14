const express = require("express");
const{randomUUID} =require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());
let products = [];

fs.readFile("products.json","utf-8", (err,data)=>{
    if(err){
        console.log(err);
    }else{
        products = JSON.parse(data);
    }
});

// app.get("/first-route", (request, response)=>{
//     return response.json({
//         message: "Accessed first route with nodemon, hello Alan",
//     });
// });

/**
 * POST => inserir um dado
 * GET => Buscar um/mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para minha aplicação
 * Params => /products/3232323266565&value=23223265
 * Query => /products?id=3232323266565&value=23223265
 */
app.post("/products", (request, response)=>{
    const {name, price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);

    productFile();

    return response.json(product);

});

app.get("/products", (request,response)=>{
    return response.json(products)
});

app.get("/products/:id",(request,response)=>{
    const{id} = request.params;
    const product = products.find((product)=>product.id === id);
    return response.json(product);
});

app.put("/products/:id",(request,response)=>{
    const {id} =request.params;
    const{name,price} = request.body;

    const productIndex = products.findIndex((product)=> product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };
    productFile();
    return response.json({message: "Product changed successfully"})
});

app.delete("/products/:id",(request,response)=>{
    const{id} = request.params;
    const productIndex = products.findIndex((product)=> product.id === id);

    products.splice(productIndex, 1);

    productFile();

    return response.json({message: "Product removed successfully"});
});

function productFile(){
    fs.writeFile("products.json",JSON.stringify(products),(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Product inserted successfully");
        }
    });
}

app.listen(4002, () => console.log("Server is running on port 4002"))