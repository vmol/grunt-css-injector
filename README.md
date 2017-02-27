# grunt-css-styler

> Injects the css code from the selected files into the first style tag of the destination file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-styler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-styler');
```

## The "cssstyler" task

### Overview
In your project's Gruntfile, add a section named `cssstyler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cssstyler: {
    options:{
      startTag  : '<style type="text/css">',
      endTag    : '</style>',
    },
    files:{
      'index.html':[ 'css/style-a.css','css/style-b.css']
    }
  },
});
```

### Options

#### options.startTag
Type: `String`
Default value: `'<style type="text/css">'`

A string value that is used to finds the start tag of the style in the destination file.

#### options.punctuation
Type: `String`
Default value: `'</style>'`

A string value that is used to finds the end tag of the style in the destination file.

#### options.test
Type: `Boolean`
Default value: `false`

For testing purposes, it will save the final file into `tmp/`.

### Usage Examples

#### Default Options
In this example, the default options are used injects the code from the css files into the style tag on index.html.

```js
grunt.initConfig({
  cssstyler: {
    options: {},
    files: {
      'index.html':[ 'css/style-a.css','css/style-b.css']
    },
  },
});
```

#### Custom Options
In this example, custom options are used to injects the css code into custom tag. 

```js
grunt.initConfig({
  cssstyler: {
    options:{
      startTag  : '@section("style")',
      endTag    : '@stop',
    },
    files:{
      'index.blade.php':[ 'css/style-a.css','css/style-b.css']
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2017-02-27 v0.1.0
