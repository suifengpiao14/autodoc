var _        = require('lodash');
var chokidar = require('chokidar');
var path     = require('path');
var apidocOpenapi = require('apidoc-openapi');
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
        apidocOpenapi.createApidocOpenapi(options) 
      });
}

module.exports = {
    watch: watch
};

