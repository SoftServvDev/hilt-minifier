var fs = require('fs');
var path = require("path");
var util = require("util");
var formatter = require('./formatter')

var filename = "css.css";

fs.readFile(path.join(__dirname, filename), 'utf8', function(err, data) {
    if(err){
        console.log(err);
        process.exit(1);
    }

    // Checks file extension to make sure it is supported
    var check = formatter.checkExtension(filename)

    if(check.res === true){
        console.log(check.message)
        formatter.formatFile(filename, data)
    }
    else{
        console.log(check.message)
        process.exit(1)
    }
})