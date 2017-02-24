/*
 * grunt-css-injector
 * https://github.com/vmol/grunt-css-injector
 *
 * Copyright (c) 2017 Víctor Molero (adMark)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Returns the tag index relate to the string
  var getTagIndex = function(tag,string){
    var index = string.indexOf(tag);
    if (index === -1){
      grunt.fail.warn('The selected string "'+tag+'" can\'t be found.');
    }else{
      grunt.log.write('The index for '+tag+' is: '+index+'\n');
      return index;
    }
  };

  grunt.registerMultiTask('css_injector', 'Injects css from files in the selected tag', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      openTag  : '<style type="text/css">',
      closeTag : '</style>',
      test     : false
    });

    this.files.forEach(function(file){

      var cssSource = file.src.filter(function(filepath){
        if(grunt.file.exists(filepath) && filepath.match('.css$')){
            return true;
        }else{
            grunt.log.warn(filepath+' is not a CSS file\n');
            return false;
        }
      }).map(function(filepath){
        return grunt.file.read(filepath);
      }).join('');

      var htmlSource = grunt.file.read(file.dest);
      var openTagIndex = getTagIndex(options.openTag, htmlSource);
      var closeTagIndex = getTagIndex(options.closeTag, htmlSource);

      var htmlHead = htmlSource.substr(0,openTagIndex + options.openTag.length);
      var htmlFooter = htmlSource.substr(closeTagIndex);

      var destHtmlSource = htmlHead+cssSource+htmlFooter;

    });

    // Iterate over all specified file groups.
    /*this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  });

};
