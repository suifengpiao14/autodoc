const express = require('express');
const path=require("path");
const app = express();



function start(options){
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
        const staticDir=path.join(__dirname,'/../documentation-starter');
        console.log(staticDir)
        app.use('/openapi.json', express.static(options.dest+'/openapi.json'));// redrect  openapi.json file
        app.use('/', express.static(staticDir));
      });
}


app.start=start;


module.exports ={
    app:app
}