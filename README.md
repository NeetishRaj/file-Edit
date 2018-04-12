# file-Edit
To read and edit files on client side and send a copy to server

## Usage
1. download both those server.js and index.html file in a same directory

2. on the same directory run the server code

  node server.js
  
3. in your browser goto https://localhost:3000/index.html

4. load the text file, by selecting any text file from your storage.

5. If there are any changes to be made then perform the changes in the editor.

6. When changes arefinalized then convert files to json.

7. send file to server which will create a separate json file for the received JSON in post request from client.


## Supported files currently
  .txt (text files)
  
## Expected features
  adding few other editor options for text files and html files
  support images
  
## Server side Notes

1. Add any files/ assets or directories with content that u wish to serve to client during testing, check the supported MIME types in the server.js currently 

  const mimeTypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpg",
    "js" : "text/javascript",
    "css" : "text/css" 
  };
