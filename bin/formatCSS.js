var util = require('util')
var fs = require('fs');
const Messages = require('./messages');

class CSSMinifier {
    static formatCSS(dataRaw, filename, c, r) {
        var dataArray = util.format(dataRaw).split("");
        var splitName = filename.split("");
        function removeExcessWhitespace(data) {
            var dataString = data.join("")
            var dataArray = dataString.replace((/  |\r\n|\n|\r/gm), "").split("");
            return dataArray
        }
        function removeSpaceBeforeRule() {
            for (var i = 0; i < dataArray.length; i++) {
                var x = i - 1;
                if (dataArray[i] == "{") {
                    if (i > 1) {
                        if (dataArray[x] == " ") {
                            dataArray.splice(x, 1);
                        }
                    }
                };
            }
        };
        function removeComments() {
            var commentFinished = false;
            var comment = false
            var comments = []
            for (var i = 0; i < dataArray.length; i++) {
                var commentStart, commentEnd;
                var x = i - 1
                var y = i + 1
                if (dataArray[i] == "/") {
                    if (dataArray[y] == "*") {
                        commentStart = i
                        comment = true
                    }
                    if (dataArray[x] == "*") {
                        commentEnd = i + 1
                        comment = false
                        commentFinished = true
                    }
                    if (comment == false && commentFinished == true) {
                        comments.push({ start: commentStart, end: commentEnd })
                        commentFinished = false
                    }
                }
            }
            if (comments) {
                var commentIndexes = [];
                var currentIndex;
                for (var i = 0; i < comments.length; i++) {
                    for (var x = comments[i].start; x < comments[i].end; x++) {
                        commentIndexes.push(x)
                    }
                }
                for (var i = 0; i < commentIndexes.length; i++) {
                    currentIndex = commentIndexes[i] - i
                    dataArray.splice(currentIndex, 1)
                }
            }
        }
        var ext;
        if (c == true) {
            Messages.RemovingWhitespace(filename)
            dataArray=removeExcessWhitespace(dataArray)
            removeSpaceBeforeRule()
            ext = ".c-minified.css"
        }
        if (r == true) {
            Messages.RemovingComments(filename)
            removeComments()
            ext = ".r-minified.css"
        }
        if (c == undefined && r == undefined) {
            Messages.RemovingWhitespace(filename)
            dataArray=removeExcessWhitespace(dataArray)
            removeSpaceBeforeRule()
            Messages.RemovingComments(filename)
            removeComments()
            ext = ".minified.css"
        }
        for (let i = 0; i < 4; i++) {
            splitName.pop()
        }
        var newFile = splitName.join("") + ext
        fs.writeFile(process.cwd() + "/" + newFile, "/* Minified by Hilt */\n" + dataArray.join(""), err => {
            if (err) {
                console.log(err)
            }
        })
        Messages.FileComplete(filename, newFile)
    }
}

module.exports = CSSMinifier