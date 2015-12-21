Package.describe({
    name: 'pbastowski:angular2',
    version: '0.0.1',
    summary: 'A simple implementation of Angular2',
    git: '',
    documentation: 'README.md'
});

Npm.depends({
    'angular2': '2.0.0-beta.0',
    //'rxjs': '5.0.0-beta.0',
    //'reflect-metadata': '0.1.2',
    //'zone.js': '0.5.10',
});

Package.registerBuildPlugin({
  name: 'typescript',
  sources : [
    'plugin/html-templates.js'
  ],
  npmDependencies : {
    'typescript' : '1.7.5'
  }
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('isobuild:compiler-plugin@1.0.0');
    //api.use('ecmascript');
    api.use('pbastowski:systemjs', {weak:true});
    api.addFiles([
            '.npm/package/node_modules/es6-shim/es6-shim.min.js',
            '.npm/package/node_modules/angular2/bundles/angular2-polyfills.min.js',
            '.npm/package/node_modules/reflect-metadata/Reflect.js',
            '.npm/package/node_modules/rxjs/bundles/Rx.js',
            '.npm/package/node_modules/angular2/bundles/angular2.dev.js',
            '.npm/package/node_modules/angular2/bundles/router.dev.js'
        ]
        ,'client',
        {transpile: false}
    );
});
