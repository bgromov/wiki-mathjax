function compareRight(s1, s2) {
  var ln = Math.min(s1.length, s2.length);
  return s1.slice(-(ln)) === s2.slice(-(ln));
}

var isWikiwand = compareRight(document.location.hostname, 'wikiwand.com');

function replaceUnbalancedBraces(text) {
  var stack = [];
  var ret = text.split('');

  for (var i = 0; i < text.length; ++i) {
    if (text[i] == '(') {
      stack.push(i);
    }
    else if (text[i] == ')') {
      if (stack.length) {
        stack.pop();
      } else {
        ret[i] = '}';
       // console.log('Found unbalanced brace');
      }
    }
  }

  return ret.join('');
}

// Wrap the span for legacy zoom levels.
// Could it be an option within the Chrome extension?
$('img.tex').each(function() {
  if($(this).parent().is('dd')) {
    $(this).wrap('<span style="font-size: 125%">');
  }
});

// Wrap images in MathJax_Preview spans and attach the MathJax math script.
// MathJax will remove the preview when it's done typesetting.
$('img.tex').wrap('<span class="MathJax_Preview" />');
$('.MathJax_Preview').after(function () {
  var $disp, $scale;
  if($(this).parent().is('dd')) {
    $disp = '; mode=display';
  }else{
    $disp = '';
  }
  tex = $(this).find('img').attr("alt");

  if (isWikiwand) {
    tex = replaceUnbalancedBraces(tex);
  }

  return '<script type="math/tex' + $disp + '">' + tex + '</script>';
});

// Load local texvc config
var texvc_config = chrome.extension.getURL('texvc.js');

$.get(texvc_config, function (data) {
  $('script').first().after('<script type="text/x-mathjax-config">' + data + '</script>');
});

// Inject more settings
$('script').first().after('<script type="text/x-mathjax-config">\
  MathJax.Hub.Config({\
    displayAlign: "left",\
    TeX: {\
      extensions: ["color.js"],\
    },\
    menuSettings: {\
      zoom: "Click",\
      zscale: "200%"\
    },\
    MathZoom: {\
      styles: {\
        "#MathJax_Zoom": {\
          "background-color": "#FFFFFF"\
        }\
      }\
    }\
  });\
</script>');

// To ensure that we loading MathJax AFTER substituting images, we load it manualy

// NOTE: we can directly load texvc config from wikimedia, however it seems to be pretty slow.
//$('script').first().after('<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,https://bits.wikimedia.org/w/extensions/Math/modules/mediawiki-extensions/texvc.js"></script>');

setTimeout(injectMathJax, isWikiwand ? 1500 : 0);

function injectMathJax() {
  $('script').first().after('<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>');
}