$(function() {

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
   * jquery.addrule.js 0.0.1 - https://gist.github.com/yckart/5563717/
   * Add css-rules to an existing stylesheet.
   *
   * @see http://stackoverflow.com/a/16507264/1250044
   *
   * Copyright (c) 2013 Yannick Albert (http://yckart.com)
   * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
   * 2013/05/12
   **/

  (function ($) {
    window.addRule = function (selector, styles, sheet) {
      if (typeof styles !== "string") {
        var clone = "";
        for (var style in styles) {
          var val = styles[style];
          style = style.replace(/([A-Z])/g, "-$1").toLowerCase(); // convert to dash-case
          clone += style + ":" + (style === "content" ? '"' + val + '"' : val) + "; ";
        }
        styles = clone;
      }
      sheet = sheet || document.styleSheets[0];
      sheet.addRule(selector, styles);
      return this;
    };
    if ($) {
      $.fn.addRule = function (styles, sheet) {
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
  $('[jeet-edit="on"]').find('*').css({
    background: '#eee',
    background: 'rgba(0, 0, 0, .05)'
  });

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
  $('[jeet-center]').each(function() {
    if($(this).attr('jeet-center')) {
      $(this).css({
        maxWidth: $(this).attr('jeet-center')
      });
    }
    if($(this).attr('jeet-center-pad')) {
      $(this).css({
        paddingLeft: $(this).attr('jeet-center-pad'),
        paddingRight: $(this).attr('jeet-center-pad')
      });
    }
  });

  // span
  $('[jeet-span]:before').addRule(cfb());
  $('[jeet-span]').addRule(cf());
  $('[jeet-span]:after').addRule(cfa());
  $('[jeet-span]').css({
    paddingLeft: 0,
    paddingRight: 0,
    clear: 'none',
    textAlign: 'inherit'
  })
  $('[jeet-span]').each(function() {
    var span = eval($(this).attr('jeet-span')),
        side = getLayoutDirection();
    if($(this).attr('jeet-offset')) {
      var offset = eval($(this).attr('jeet-offset'));
      if(offset < 0) {
        offset *= -1;
        $(this).css({
          marginRight: offset * 100 + '%'
        });
      } else {
        $(this).css({
          marginLeft: offset * 100 + '%'
        });
      }
    }
    $(this).css({
      float: side,
      width: eval($(this).attr('jeet-span')) * 100 + '%'
    });
  });

});
