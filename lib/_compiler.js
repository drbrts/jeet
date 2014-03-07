var inFile = fs.readFileSync('./in.scss'),
    css = postcss.parse(inFile);

var compiler = postcss(function (css) {
  css.eachRule(function (rule) {
    if (rule.selector.match(/.foo/) ) {

      // Columns
      span();

    }
  });
});

var output = compiler.process(css).css;

fs.writeFileSync('out.css', output);

