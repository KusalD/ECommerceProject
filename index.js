const http = require('http');
const app = require("./src/config/express.config")


const server = http.createServer(app)

server.listen(3000, 'localhost', (err)=>{
    if (!err) {
        console.log("Server is running on port:: 3000")
        console.log("Browse http://localhost:3000")
        console.log("Press CTRL+C to edn/disconnect")
    }
})