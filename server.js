//server implementation

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const mimeTypes = {
  "html" : "text/html",
  "jpeg" : "image/jpeg",
  "jpg" : "image/jpg",
  "js" : "text/javascript",
  "css" : "text/css"
};


//create server functions
http.createServer(function(req, res){

  //handle post request and create a new JSON file/ update existing
  if (req.method == 'POST') {
     console.log("POST");
     var body = '';
     req.on('data', function (data) {
         body += data;
         console.log("Partial body: " + body);
     });
     req.on('end', function () {
         console.log("Body: " + body);
         //create a json file in same directory
         fs.writeFile("receivedData.json", body, (err) => {
           if (err) throw err;
           console.log('The receivedData.json file has been saved!');
         });
     });
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end('post received');
  }

  let uri = url.parse(req.url).pathname;
  let fileName = path.join(process.cwd(), decodeURI(uri));

  console.log("Loading " + uri);

  let status;

  try{
    //check if the file exists
    stats = fs.lstatSync(fileName);

  } catch(e) {
    res.writeHead(404, {"content-type" : "text/plain"});
    res.write('404 Not found Sorry!!!');
    res.end();
    return;
  }

  //check if file/directory
  if(stats.isFile()){

     //extract the html part from /fullpath/inde.html, or any other type

     let mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
     res.writeHead(200, {"content-type" : mimeType});

     let fileStream = fs.createReadStream(fileName);
     fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    res.writeHead(302, {
      "Location" : "index.html"
    });
  } else{
    res.writeHead(500, {"content-type" : "text/plain"});
    res.write('Error 500, Internal Error\n');
    res.end();
  }
}).listen(3000, function(){
  console.log("Listening on port:3000, in your browser go to http://localhost:3000");
});
