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

      // Reads the destination file
      var htmlSource = grunt.file.read(file.dest);

      // Get the open tag index
      var openTagIndex = getTagIndex(options.openTag, htmlSource);
      var htmlHead = htmlSource.substr(0,openTagIndex + options.openTag.length);

      // The rest of the html code
      var htmlFooter = htmlSource.substr(openTagIndex + options.openTag.length);
      // Get de close tag index
      var closeTagIndex = getTagIndex(options.closeTag, htmlFooter);
      htmlFooter = htmlFooter.substr(closeTagIndex);
      
      // The final code      
      var destHtmlSource = htmlHead+cssSource+htmlFooter;

      // Only for testing purposes
      if(options.test){
        grunt.file.write('tmp/'+file.dest, destHtmlSource);
      }else{
        grunt.file.write(file.dest, destHtmlSource);
      }

    });

  });

};
