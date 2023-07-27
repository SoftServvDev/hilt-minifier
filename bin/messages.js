const chalk = require('chalk')
const log = console.log

const sorryMessage = chalk.white("\n\n-----------------------------------------------------------\n")+chalk.white("----")+chalk.redBright("|||||||||")+chalk.white("-")+chalk.redBright("|||||||||")+chalk.white("-")+chalk.redBright("|||||||")+chalk.white("--")+chalk.redBright("|||||||")+chalk.white("--")+chalk.redBright("||")+chalk.white("----")+chalk.redBright("||")+chalk.white("---------\n")+chalk.white("----")+chalk.redBright("||")+chalk.white("--------")+chalk.redBright("||")+chalk.white("-----")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||")+chalk.white("----")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||")+chalk.white("----")+chalk.redBright("||")+chalk.white("--")+chalk.redBright("||")+chalk.white("--")+chalk.redBright("||")+chalk.white("----------\n")+chalk.white("----")+chalk.redBright("|||||||||")+chalk.white("-")+chalk.redBright("||")+chalk.white("-----")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||||")+chalk.white("--")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||||")+chalk.white("----")+chalk.redBright("||||")+chalk.white("-----------\n")+chalk.white("-----------")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||")+chalk.white("-----")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||")+chalk.white("---")+chalk.redBright("||")+chalk.white("--")+chalk.redBright("||")+chalk.white("---")+chalk.redBright("||")+chalk.white("-----")+chalk.redBright("||")+chalk.white("------------\n")+chalk.white("----")+chalk.redBright("|||||||||")+chalk.white("-")+chalk.redBright("|||||||||")+chalk.white("-")+chalk.redBright("||")+chalk.white("----")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("||")+chalk.white("----")+chalk.redBright("||")+chalk.white("----")+chalk.redBright("||")+chalk.white("-")+chalk.redBright("[]")+chalk.white("-")+chalk.redBright("[]")+chalk.white("-")+chalk.redBright("[]")+chalk.white("---\n")+chalk.white("---------------------------------------------Hilt-Minifier-\n\n")
const logoMessage = chalk.white("\n\n-----------------------------------------------------------\n")+chalk.greenBright("||    || |||||||| ||      |||||||| ")+chalk.blueBright("************************\n")+chalk.greenBright("||    ||    ||    ||         ||    ")+chalk.blueBright("*****")+chalk.bgGreen(chalk.white("   HILT   "))+chalk.blueBright("*********\n")+  chalk.greenBright("||||||||    ||    ||         ||    ")+chalk.blueBright("*****")+chalk.bgGreen(chalk.white(" MINIFIER "))+chalk.blueBright("*********\n")+chalk.greenBright("||    ||    ||    ||         ||    ")+chalk.blueBright("*****")+chalk.bgGreen(chalk.white("   TOOL   "))+chalk.blueBright("*********\n")+chalk.greenBright("||    || |||||||| ||||||||   ||    ")+chalk.blueBright("************************\n")+chalk.white("----------------------------------------------")+chalk.greenBright("By")+chalk.white("-")+chalk.greenBright("SoftServv")+chalk.white("-\n\n")

class Messages {
    static NotSupported() {
        return log(sorryMessage + chalk.redBright("\nThis type of file is not currently supported...\n\n") + chalk.white("Closing Hilt..."))
    }
    static LogoMessage(){
        return log(logoMessage)
    }
    static StartMinify(file) {
        return log(chalk.greenBright("\nStarting minification of ") + chalk.blueBright(file) + chalk.greenBright("..."))
    }
    static SingleDirectoryError(){
        return log(chalk.redBright("You can not use both the single and directory flags together. Please try using a different set of options."))
    }
    static NoFileNameError(){
        return log(chalk.redBright("You have to add a file name when using the single flag. Please enter the name of the file and try again."))
    }
    static CommentsFlagError(){
        return log(chalk.redBright("You can not use both the \"Keep Comments\" flag and the \"Remove Comments\" flag. Please try using a different set of options."))
    }
    static FileDontExist(file){
        return log(chalk.redBright(file + " doesn't exist in this directory. Please check your spelling and try again."))
    }
    static keepComments(){
        return log(chalk.blueBright("You chose to keep the comments and minify the file(s)."))
    }
    static removeComments(){
        return log(chalk.blueBright("You chose to only remove the comments from the file(s)."))
    }
    static RemovingWhitespace(file){
        return log("Removing whitespace from " + chalk.blueBright(file) + ".")
    }
    static RemovingComments(file){
        return log("Removing Comments from " + chalk.blueBright(file) + ".")
    }
    static FileComplete(file, newFile){
        return log("" + chalk.blueBright(file) + " has been minified, created " + chalk.blueBright(newFile) + ".")
    }
}

module.exports = Messages