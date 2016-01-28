# A simple implementation of Angular2 for Meteor

This package implements Angular2 beta without any additional trimmings.

The modules below are already imported into your app, so, don't include them again through `<script>` tags.

    es6-shim/es6-shim.min.js
    angular2/bundles/angular2-polyfills.min.js
    reflect-metadata/Reflect.js
    rxjs/bundles/Rx.js
    angular2/bundles/angular2.dev.js
    angular2/bundles/router.dev.j

> Breaking change in 0.0.7: Do NOT install `pbastowski:typescript`. Remove it, if you already have it installed.

**Notes:**

1. This is an early version of this package, so, please tread carefully!
2. This is not the excellent `angular-meteor` package. You can find it [here](https://github.com/Urigo/angular-meteor).


## Installation

    meteor add pbastowski:systemjs
    meteor add pbastowski:angular2

SystemJS is required in addition to Angular2.

## TypeScript

TypeScript is included with this package. With TypeScript injecting dependencies is very easy, as shown below

```javascript
class MyComponent {
    constructor (myService: MyService) {
    }
}
```

The `: MyService` type annotation, above, is all you will need to inject the `MyService` service into your component's constructor.

TypeScript can, for the most part, be used as a drop-in replacement for Babel. You will have to rename your `.js` files to `.ts`. Other than that, all ES6 and some ES7 features will be available to you - for what works see the official [TypeScript Handbook](http://www.typescriptlang.org/Handbook) page.


## Templates

Inline templates, both HTML and JADE, are supported out of the box as shown below. The JADE inline-templates depend on the built-in TypeScript package, so, if you override it you loose them.

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
import tplWelcome from 'client/app.html';

import { Component } from 'angular2/core';

@Component({
    selector: 'welcome',
    template: tplWelcome
})
export class Welcome {
}
```

## Bootstrapping your Angular2 app

Starting your app is a two step process

1. Import your main file from **index.html** using `System.import()`

2. Bootstrap Angular2 with your main component

**index.html**

```html
<body>

<welcome></welcome>

<script>
    System.import('client/index');
</script>

</body>
```

The bootstrap process must be done from a "main" module, such as `index.ts`, below.

**client/index.ts**

```javascript
import { bootstrap } from 'angular2/platform/browser';

import { Welcome } from 'client/app';

bootstrap( Welcome );
```

## Prior Art

Portions of the template compiler code were adapted from the excellent [Aurelia-Meteor](https://github.com/ahmedshuhel/aurelia-meteor/blob/master/plugin/template-handler.js) repo.