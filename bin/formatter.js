var path = require("path");
var CSSMinifier = require("./formatCSS");
var Messages = require('./messages')

// Handles all the formatting and validation of the files
class Formatter {
    static checkExtension(file) {
        switch (path.extname(file)) {
            case ".css":
                return { res: true, message: Messages.StartMinify(file) }
            default:
                return { res: false, message: Messages.NotSupported() }
        }
    }

    static checkDirectoryExtensions(file){
        switch (path.extname(file)) {
            case ".css":
                return { res: true, message: Messages.StartMinify(file) }
            default:
                return { res: false, message: "\nBypassing: " + file }
        }
    }

    static formatFile(file, data, c, r) {
        switch (path.extname(file)) {
            case ".css":
                CSSMinifier.formatCSS(data, file, c, r)
                break;
            default:
                break;
        }
    }
}

module.exports = Formatter