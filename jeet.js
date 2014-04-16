$(function() {

  // document.styleSheets[0].insertRule("html { font-size: 100px }", 0); // works in ff
  // document.styleSheets[0].addRule('html', 'font-size: 100px'); // works in ie8+

  // Jeet.js

  var settings = {
    gutter: 3,
    parentFirst: false,
    layoutDirection: 'LTR'
  };

  var getLayoutDirection = function() {
    settings.layoutDirection == 'RTL' ? result = 'right' : result = 'left';
    return result;
  };


  /*!
   * jquery.addrule.js 0.0.15 - https://gist.github.com/yckart/5563717/
   * Add css-rules to an existing stylesheet.
   *
   * @see http://stackoverflow.com/a/16507264/1250044
   *
   * Copyright (c) 2013 Yannick Albert (http://yckart.com)
   * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
   * 2013/05/12
   **/
  (function($) {
    window.addRule = function(selector, styles, sheet) {
      if(typeof styles !== 'string') {
        var clone = '';
        for(var style in styles) {
          var val = styles[style];
          style = style.replace(/([A-Z])/g, '-$1').toLowerCase();
          clone += style + ':' + (style === 'content' ? '"' + val + '"' : val) + '; ';
        }
        styles = clone;
      }
      sheet = sheet || document.styleSheets[0];
      if(sheet.insertRule) sheet.insertRule(selector + ' {' + styles + '}', sheet.cssRules.length);
      else if(sheet.addRule) sheet.addRule(selector, styles);
      sheet.addRule(selector, styles);
      return this;
    };
    if($) {
      $.fn.addRule = function(styles, sheet) {
        addRule(this.selector, styles, sheet);
        return this;
      };
    }
  }(window.jQuery));


  // clearfix (IE8+)
  var cfb = function() {
        return {
          content: '',
          display: 'table'
        }
      },
      cf = function() {
        return {
          '*zoom': 1
        }
      },
      cfa = function() {
        return {
          content: '',
          display: 'table',
          clear: 'both'
        }
      };


  // edit
  var editBackground = function() {
    return {
      background: '#eee',
      background: 'rgba(0, 0, 0, .05)'
    }
  };
  $('[jeet-edit]').find('*').addRule(editBackground());

  // center
  var centerMaxWidth = '1410px',
      centerPad = '0',
      center = function() {
        return {
          width: 'auto',
          maxWidth: centerMaxWidth,
          float: 'none',
          display: 'block',
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingLeft: centerPad,
          paddingRight: centerPad
        }
      };

  $('[jeet-center]:before').addRule(cfb());
  $('[jeet-center]').addRule(cf());
  $('[jeet-center]:after').addRule(cfa());
  $('[jeet-center]').addRule(center());
  $('[jeet-center]').each(function(i) {
    var child = i + 1,
        nthChild = $('[jeet-center]:nth-child('+ child +')');

    nthChild.addRule('max-width: ' + nthChild.attr('jeet-center'));

    if($(this).attr('jeet-center-pad')) {
      nthChild.addRule('padding-left: ' + nthChild.attr('jeet-center-pad'));
      nthChild.addRule('padding-right: ' + nthChild.attr('jeet-center-pad'));
    }
  });

  // span
  $('[jeet-span]:before').addRule(cfb());
  $('[jeet-span]').addRule(cf());
  $('[jeet-span]:after').addRule(cfa());
  $('[jeet-span]').addRule({
    paddingLeft: 0,
    paddingRight: 0,
    clear: 'none',
    textAlign: 'inherit'
  })
  $('[jeet-span]').each(function(i) {
    var span = eval($(this).attr('jeet-span')),
        side = getLayoutDirection(),
        child = i + 1,
        nthChild = $('[jeet-span]:nth-child('+ child +')');

    if($(this).attr('jeet-offset')) {
      var offset = eval($(this).attr('jeet-offset'));
      if(offset < 0) {
        offset *= -1;
        nthChild.addRule('margin-right: ' + offset * 100 + '%');
      } else {
        nthChild.addRule('margin-left: ' + offset * 100 + '%');
      }
    }
    nthChild.addRule('float: ' + side);
    nthChild.addRule('width: ' + eval($(this).attr('jeet-span')) * 100 + '%');
  });

});
