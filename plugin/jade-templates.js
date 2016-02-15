var jade = Npm.require('jade');

var config = {};
//var jadeOpts = {pretty:true, compileDebug:false};
var jadeOpts = { compileDebug:false };

Plugin.registerCompiler({
    extensions: ['jade', '.ng.jade'],
    filenames:  []

}, function () {
    return {processFilesForTarget: processFiles};
});

function processFiles (files) {
    if (config.verbose)
        console.log('\nProcessing JADE templates:');

    files.forEach(compile);
};

// Big portions of the code below were borrowed from the excellent
// Aurelia-Meteor project's template-handler.js, see:
// https://github.com/ahmedshuhel/aurelia-meteor
function compile(file) {

    var content = file.getContentsAsString();
    var inputFile = file.getPathInPackage();

    var moduleName = inputFile.replace(/\\/g, '/').replace('.jade', '');
    var path = moduleName + '.jade.js';
    var output = content;

    try {
        output = jade.compile(content, jadeOpts)();
        output = buildTemplate(output, moduleName);

    } catch (er) {
        file.error({ message: er});
    }

    file.addJavaScript({
        path: path,
        data: output,
        sourcePath: inputFile
    });
}

function buildTemplate(src, moduleName) {

    return 'System.registerDynamic("' + moduleName + '.html", [], true, function(require, exports, module) {' +
        '         ; ' +
        '         var global = this, ' +
        '            __define = global.define; ' +
        '         global.define = undefined; ' +
        '         module.exports = "' + clean(src) +
        '         global.define = __define;' +
        '         return module.exports;' +
        '       });'
}

function compileJade(src) {

}

function clean(src) {
    return src
            .replace(/(["\\])/g, '\\$1')
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r")
            .replace(/[\u2028]/g, "\\u2028")
            .replace(/[\u2029]/g, "\\u2029")
        + '";';
}