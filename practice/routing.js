// routing means implementing differnt action for differnt endpoints
// http for server connection ans url to analyze the url
const http = require("http");
const url = require("url");

// create a server
const server = http.createServer((req, res) => {
  res.end("Hello from the server..");


  const pathName = req.url;

  if (pathName === '/overview' || pathName === '/') {
    res.end("this is overview");
  } else if (pathName === '/product') {
    res.end("this is product");
  }
  else {

     res.writeHead(404); // status code 
     res.end("page not found"); 



    res.writeHead(404 , {          //sent to client---in dev-tools
      'content-type' : 'text/html' ,
      'my-own-header' : 'hello-world'
    });

    res.end('<h1> page not found! <h1>');
  }
});

//server

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to port 8000");
});