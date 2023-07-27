#!/usr/bin/env node

var fs = require('fs');
var path = require("path");
var formatter = require('./formatter')
const yargs = require("yargs");
const Messages = require('./messages');

const usage = "\nUsage: Use Hilt to minify single CSS files or a complete directory."

const options = yargs
    .usage(usage)
    .option("s", {
        alias: "single",
        describe: "Minify a single CSS file",
        type: "string",
        demandOption: false
    })
    .option(
        "d", {
        alias: "directory",
        describe: "Minify all CSS files in directory",
        type: "boolean",
        demandOption: false
    }
    )
    .option(
        "c", {
        alias: "comments",
        describe: "Keep comments while minifying",
        type: "boolean",
        demandOption: false
    }
    )
    .option(
        "r", {
        alias: "removecomments",
        describe: "Only remove comments",
        type: "boolean",
        demandOption: false
    }
    )
    .help(true)
    .argv;

function readFile(options) {
    var file = path.join(process.cwd(), options.s)
    if (fs.existsSync(file)) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                process.exit(1)
            }
            var check = formatter.checkExtension(options.s)
            if (check.res === true) {
                check.message
                formatter.formatFile(options.s, data, options.c, options.r)
            }
            if (check.res === false) {
                check.message
                process.exit(1)
            }
        })
    }
    else {
        Messages.FileDontExist(options.s)
        process.exit(1)
    }
}

function findFiles(options) {
    fs.readdir(process.cwd(), (err, files) => {
        if (err) {
            console.log(err)
        }
        if (files) {
            files.forEach(f => {
                var file = path.join(process.cwd(), f)
                if (fs.lstatSync(file).isFile()) {
                    if (fs.existsSync(file)) {
                        fs.readFile(file, 'utf8', function (err, data) {
                            if (err) {
                                console.log(err);
                                process.exit(1)
                            }
                            var check = formatter.checkDirectoryExtensions(f)
                            if (check.res === true) {
                                check.message
                                formatter.formatFile(f, data, options.c, options.r)
                            }
                            if (check.res === false) {
                                console.log(check.message)
                            }
                        })
                    }
                    else {
                        Messages.FileDontExist(options.s)
                        process.exit(1)
                    }
                }
            })
        }
    })
}

if (options.s != undefined) {
    if (options.d != undefined) {
        Messages.SingleDirectoryError()
        process.exit(1)
    }
    if (options.c == true && options.r == true) {
        Messages.CommentsFlagError()
        process.exit(1)
    }
    if (options.c == true && options.r == undefined) {
        Messages.LogoMessage()
        readFile(options)
    }
    if (options.c == undefined && options.r == true) {
        Messages.LogoMessage()
        readFile(options)
    }
    if (options.s == "") {
        Messages.NoFileNameError()
        process.exit(1)
    }
    if (options.s != "" && options.c == undefined && options.rc == undefined) {
        Messages.LogoMessage()
        readFile(options)
    }
}
if (options.d != undefined) {
    if (options.s != undefined) {
        Messages.SingleDirectoryError()
        process.exit(1)
    }
    if (options.c == true && options.r == true) {
        Messages.CommentsFlagError()
        process.exit(1)
    }
    if (options.c == true && options.r == undefined) {
        Messages.LogoMessage()
        findFiles(options)
    }
    if (options.c == undefined && options.r == true) {
        Messages.LogoMessage()
        findFiles(options)
    }
    if (options.s != "" && options.c == undefined && options.rc == undefined) {
        Messages.LogoMessage()
        findFiles(options)
    }
}