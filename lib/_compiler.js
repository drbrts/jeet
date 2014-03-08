var fs = require('fs'),
    postcss = require('postcss'),
    columns = require('./_columns'),
    inFile = fs.readFileSync('./src/in.css'),
    css = postcss.parse(inFile);

var compiler = postcss(function (css) {
  css.eachRule(function (rule) {
    if (rule.selector.match(/.foo/) ) {

      // Columns
      console.log(columns.span());

    }
  });
});

var output = compiler.process(css).css;

fs.writeFileSync('out.css', output);

