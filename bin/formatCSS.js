var util = require('util')
var fs = require('fs')

class CSSMinifier {
    static formatCSS(dataRaw, filename) {
        var data = util.format(dataRaw)
        var dataArray = data.replace((/  |\r\n|\n|\r/gm),"").split("")
        var splitName = filename.split("")
        for(let i=0; i<4; i++){
            splitName.pop()
        }
        fs.writeFile("./" + splitName.join("") + ".minified.css", dataArray.join(""), err => {
            console.log(err)
        })
    }
}

module.exports = CSSMinifier