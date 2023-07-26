var path = require("path");
var CSSMinifier = require("./formatCSS");

// Handles all the formatting and validation of the files
class Formatter {
    static checkExtension(file) {
        switch (path.extname(file)) {
            case ".css":
                return { res: true, message: "\nStarting minification of CSS file..." }
            default:
                return { res: false, message: "This type of file is not supported...\n\nClosing Hilt..." }
        }
    }

    static formatFile(file, data) {
        switch (path.extname(file)) {
            case ".css":
                CSSMinifier.formatCSS(data, file)
                break;
            default:
                break;
        }
    }
}

module.exports = Formatter