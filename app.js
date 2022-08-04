const { request, response } = require("express");
const express = require("express");

const app = express();

app.get("/first-route", (request, response)=>{
    return response.json({
        message: "Accessed first route with nodemon",
    });
});

app.listen(4002, () => console.log("Server is running on port 4002"))