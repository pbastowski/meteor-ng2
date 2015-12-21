# A simple implementation of Angular2 for Meteor

This package implements Angular2 beta without any additional trimmings.

The modules below are already imported into your app, so, don't include them again through `<script>` tags.

    es6-shim/es6-shim.min.js
    angular2/bundles/angular2-polyfills.min.js
    reflect-metadata/Reflect.js
    rxjs/bundles/Rx.js
    angular2/bundles/angular2.dev.js
    angular2/bundles/router.dev.j


**Note:** This is the first version of this repo, so, please tread carefully!

## TypeScript is required

This package only works with TypeScript, because with TypeScript injecting dependencies is very easy, as shown below

```javascript
class MyComponent {
    constructor (myService: MyService) {
    }
}
```

The `: MyService` type annotation, above, is all you will need to inject the `MyService` service into your component's constructor. So, make it easy for yourself and do this:

    meteor add pbastowski:typescript

TypeScript can, for the most part, be used as a drop-in replacement for Babel. You will have to rename your `.js` files to `.ts`. Other than that, most ES6 and some ES7 features will be available to you - for what works see the official [TypeScript](http://www.typescriptlang.org/Handbook) support page.

**Note**: If you know how to do this easily with Babel then I will add support for Babel also.


## Templates

Files with the `.ng.html` extension will be "templatized". This means that they will be wrapped in a SystemJS module, which you will be able to import into your app as required.

So, if you have an HTML file like this:

**client/app.ng.html**

```html
<h1>Welcome to Angular2 Meteor!</h1>
```

You can import the HTML into your app and use it like this:

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

1) Import your main file from **index.html** using `System.import()`

2) Bootstrap Angular2 with your main component

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

