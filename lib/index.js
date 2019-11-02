var _        = require('lodash');
var chokidar = require('chokidar');
var path     = require('path');
const fs          = require('fs-extra');
var apidocOpenapi = require('apidoc-openapi');
const widdershins = require('widdershins');
var defaults = {
    dest    : path.join(__dirname, '../doc/'),
    template: path.join(__dirname, '../template/'),
    debug     : false,
    silent    : false,
    verbose   : false,
    simulate  : false,
    parse     : false, // Only parse and return the data, no file creation.
    colorize  : true,
    markdown  : true,
    config    : './',
    apiprivate: false,
    encoding  : 'utf8'
};



var app = {
    log     : {},
    options : {}
};


// Display uncaught Exception.
process.on('uncaughtException', function(err) {
    console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});


function watch(options){
    options = _.defaults({}, options, defaults);
    app.options=options;
    chokidar.watch(app.options.src).on('all', (event, path) => {
        console.log(event, path);
        const openapiData=apidocOpenapi.createApidocOpenapi(options);
        const destFile=app.options.dest + 'openapi.json';
        fs.outputFileSync(destFile,openapiData,'utf8');
        // convert openapi to shins markdown file
        openapiToShinsMarkdown(openapiData);
        
      });
}

function openapiToShinsMarkdown(openapiData){
    const options = {
        language_tabs: [{ javascript: "Javascript" },{ php: "PHP" }, { go: "GO" }, { java: "Java" }]
      };
      widdershins.convert(openapiData, options, function(err, markdownOutput) {
        // markdownOutput contains the converted markdown
        const destFile=app.options.dest + 'shins.md';
        fs.outputFileSync(destFile,markdownOutput,'utf8');
      });
      
}

module.exports = {
    watch: watch
};

