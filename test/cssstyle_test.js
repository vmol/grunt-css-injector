'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cssstyle = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  testWithDefaultOptions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test/fixtures/default.html');
    var expected = grunt.file.read('test/expected/default.html');
    test.equal(actual, expected, 'Should inject the css code from the files in the style tag.');

    test.done();
  },
  testWithCustomOptions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test/fixtures/custom.blade.php');
    var expected = grunt.file.read('test/expected/custom.blade.php');
    test.equal(actual, expected, 'Should inject the css code from the files into the custom tag.');

    test.done();
  },
  testWithMultipleCuston:function(test) {

    test.expect(1);
    var actual = grunt.file.read('tmp/test/fixtures/custom-multiple.blade.php');    
    var expected = grunt.file.read('test/expected/custom-multiple.blade.php');
    test.equal(actual, expected, 'Should inject the css code from the files into the custom tag.');

    test.done();
  }
};
