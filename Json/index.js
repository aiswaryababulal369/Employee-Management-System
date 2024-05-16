// Importing the http module 
const http = require("http") 


// Creating server 
const server = http.createServer(function(req, res)  { 

    var users =[{"id":1,name:"jimmy"}]
    res.end(JSON.stringify(users));


	// Sending the response 
	// res.write("This is the response from the server") 
	// res.end(); 
}) 

// Server listening to port 3000 
server.listen((3000), () => { 
	console.log("Server is Running"); 
})
