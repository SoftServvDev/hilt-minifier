var util = require('util')
var fs = require('fs')

class CSSMinifier {
    static formatCSS(dataRaw, filename) {
        var data = util.format(dataRaw)
        var dataArray = data.replace((/  |\r\n|\n|\r/gm),"").split("")
        var splitName = filename.split("")
        function removeSpaceBeforeRule(){
            for(var i = 0; i < dataArray.length - 1; i++){
                var x = i - 1
                if(dataArray[i] == "{"){
                    if(i > 1){
                        if(dataArray[x] == " "){
                            dataArray.splice(x, 1)
                        }
                    }
                }
            }
        }
        removeSpaceBeforeRule()
        for(let i=0; i<4; i++){
            splitName.pop()
        }
        fs.writeFile("./" + splitName.join("") + ".minified.css", dataArray.join(""), err => {
            if(err){
                console.log(err)
            }
        })
    }
}

module.exports = CSSMinifier