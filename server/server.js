// const express = require('express')
// const app = express()
// const port = 3000
// const path = require("path")

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/index.html")
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


let http   = require("http"),
	url    = require("url"),
	path   = require("path"),
	fs     = require("fs"),
  qs     = require("querystring");
  
  function HTTPListener(request, response) {
    // Woo, you did it!
    // This function receives a request object, and a response object.
  
    var host = request.headers.host; // Ignore this
    console.log (host)
  
    // Ignore this for now.
  
    if (host/* != '192.168.254.1'*/ == 0) {
      response.writeHead(200, {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
      }); // Prevents browsers from caching the content.
      // If the user visited a website other than http://192.168.254.1
      //ServeBlocked(response, request);
      console.log("servidor bloquead")
      // Call the function ServeBlocked, and pass along the response and request objects.
      // It serves a "blocked!" page
    } else {
      // Else (i.e. if they visited the website http://192.168.254.1)
      //ServeCaptive(response, request);
      console.log("servidor captivo")
      // Call the function ServeCaptive, and pass along the response and request objects.
      // It serves the appropriate page.
    }
  }
  
  // Here is the first "real code"!
  /* This creates an HTTP server on port 80 on the IP 192.168.254.1.
   * Note that it is equivalent to:
   *
   *     var something = http.createServer(HTTPListener);
   *     something.listen(80, "192.168.254.1");
   *
   * but since we don't need the variable "something", we just concatenate the two functions together: http.createServer().listen().
   */
  
  http.createServer(HTTPListener).listen(8081, function (){
    console.log("Captive portal running");
  });