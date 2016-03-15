# A simple implementation of Angular2 for Meteor

This package implements Angular2 beta and also includes SystemJS and TypeScript on both client and server side.

The Angular 2 modules listed below are already imported into your app. So, there is no need to include them again through `<script>` tags.

    es6-shim/es6-shim.min.js
    angular2/bundles/angular2-polyfills.min.js
    rxjs/bundles/Rx.js
    angular2/bundles/angular2.js
    angular2/bundles/router.js

> Breaking change in 0.1.0: Do NOT install `pbastowski:systemjs` or `pbastowski:typescript`. Remove them from the project, if you already have them there.

**Notes:**

1. This is an early version of this package, so, please tread carefully!
2. Are you looking for `angular-meteor`? You can find it [here](https://github.com/Urigo/angular-meteor).


## Installation

    meteor add pbastowski:angular2

SystemJS and TypeScript support is also included in this package, on both client and server sides.

## TypeScript

### Dependency Injection
TypeScript is included with this package. With TypeScript, injecting dependencies is very easy, as shown below

```javascript
class MyComponent {
    constructor (myService: MyService) {
    }
}
```

The `: MyService` type annotation, above, is all you will need to inject the `MyService` service into your component's constructor.

### SystemJS integration

TypeScript, as configured in this package, generates SystemJS modules on both the client and the server sides. Hence the need for SystemJS, so, it's bundled.

Modules names are registered with SystemJS based on their physical location in the project. Below are some examples.

 file | how to import
 -----| -------------
 abc.ts| import "abc"
 client/app.ts| import "client/app"
 server/get_mail.ts| import "server/get_mail"

 *Please note that relative imports, those with "../" or "./" in the path, are not supported!*


### TS used as Babel replacement

TypeScript can, for the most part, be used as a drop-in replacement for Babel. Especially so, if you are happy to ignore type checking. You will have to rename your `.js` files to `.ts`. Other than that, all ES6 and some ES7 features will be available to you - for what works see the official [TypeScript Handbook](http://www.typescriptlang.org/Handbook) page.


## Templates

Inline templates, both HTML and JADE, are supported out of the box, as shown below. JADE inline-templates are implemented in the TypeScript compiler Meteor plugin.

```javascript
@Component({
    selector: 'my-app',
    template: `<h2>This is my app</h2>`,    // HTML inline template

    template: jade`h2 This is my app`       // JADE inline template
})
```

### Template files

HTML files with the `.ng.html` extension and JADE files with the `.jade` extension will be "templetized". This means that they will be wrapped in a SystemJS module, which you will be able to `import`` into your app as required.

So, if you have an HTML file like this:

**client/app.ng.html**

```html
<h1>Welcome to Angular2 Meteor!</h1>
```

or a JADE file like this:

**client/app.jade**

```jade
h1 Welcome to Angular2 Meteor!
```

It will be converted to a SystemJS module with the name `client/app.html`. You can then import the HTML text directly into your app and use it like this:

**client/app.ts**

```javascript
import tplApp from 'client/app.html';

import { Component } from 'angular2/core';

@Component({
    selector: 'app',
    template: tplApp
})
export class App {
}
```

## Bootstrapping your Angular2 app

Starting your app is a two step process

1. In **index.html** Import your main JS file using `System.import()`

2. Bootstrap Angular2 with your main component

**index.html**

```html
<body>

<app></app>

<script>
    System.import('client/index');
</script>

</body>
```

The bootstrap process must be done from a "main" module, such as `index.ts`, below.

**client/index.ts**

```javascript
import { bootstrap } from 'angular2/platform/browser';

import { App } from 'client/app';

bootstrap( App );
```

## Server Side

On the server side you can also write your modules with TypeScript and import/export as per the client side. Each file (module) will be registered with SystemJS in the same fashion as described above.

To kick off your server-side JS, you need to first create a `server/main.js` file. It must have the `.js` extension, otherwise the following process won't work.

Next, Add the code below to `server/main.ts`

```js
System.import('server/your_main_file')
```

And finally, change `your_main_file`, in the example above, to whatever TS file imports all your other modules. This is synonymous to the `index.ts` file for the client side. You could even call it `index.ts`.

## Prior Art

Portions of the template compiler code were adapted from the excellent [Aurelia-Meteor](https://github.com/ahmedshuhel/aurelia-meteor/blob/master/plugin/template-handler.js) repo.

## Changelog

### v0.1.1

- update: updated angular2 to beta9
- update: updated systemjs to 0.19.24
- update: updated typescript to 1.9.0-dev.20160313

### v0.1.0

- new: added server-side SystemJS support
- new: files with the extension `.ng.jade` are now also recognised as JADE templates (in addition to `.jade`)
- update: updated angular2 to beta6
- update: updated systemjs to 0.19.20
- update: updated typescript to 1.9.0-dev.20160214
- breaking change: SystemJS is now bundled with this package, so, remove it from your project if it's already there

