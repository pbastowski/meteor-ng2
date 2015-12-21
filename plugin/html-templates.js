var config = {};

Plugin.registerCompiler({
    extensions: ['ng.html'],
    filenames:  []

}, function () {
    return {processFilesForTarget: processFiles};
});

function processFiles (files) {
    if (config.verbose)
        console.log('\nProcessing HTML templates:');

    files.forEach(compile);
};

// Big portions of the code below were borrowed from the excellent
// Aurelia-Meteor project's template-handler.js, see:
// https://github.com/ahmedshuhel/aurelia-meteor
function compile(file) {

    var content = file.getContentsAsString();
    var inputFile = file.getPathInPackage();

    var moduleName = inputFile.replace(/\\/g, '/').replace('.ng.html', '');
    var path = moduleName + '.html.js';
    var output = content;

    output = buildTemplate(content, moduleName);

    //console.log('file: ', inputFile);
    //console.log('module: ', moduleName);
    //console.log('output: ', output);
    //console.log('path: ', path);

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