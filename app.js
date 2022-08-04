const { request, response } = require("express");
const express = require("express");
const{randomUUID} =require("crypto")

const app = express();

app.use(express.json());
const products = [];

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

app.listen(4002, () => console.log("Server is running on port 4002"))