//Criando o server
const http = require("http");

http.createServer((request, response)=>{
    response.writeHead(200,{"Content-Type":"application/json"});

    response.end(
        JSON.stringify({
            message:"my first application with node js",
        })
    );
})
.listen(4001,()=> console.log("Server is running on port 4001"));