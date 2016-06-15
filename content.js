function compareRight(s1, s2) {
  var ln = Math.min(s1.length, s2.length);
  return s1.slice(-(ln)) === s2.slice(-(ln));
}

var isWikiwand = compareRight(document.location.hostname, 'wikiwand.com');

function replaceUnbalancedBraces(text) {
  var stack = [];
  var ret = text.split('');

  for (var i = 0; i < text.length; ++i) {
    if (text[i] == '\\') {
      // handle special cases such as \left( or \right)
      if (text.substring(i, Math.min(text.length, i + 5)) == '\\left') {
        i += 5;
        continue;
      }
      if (text.substring(i, Math.min(text.length, i + 6)) == '\\right') {
        i += 6;
        continue;
      }
    } else if (text[i] == '(') {
      stack.push(i);
    } else if (text[i] == ')') {
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

// Load local texvc config
var texvc_config = chrome.extension.getURL('texvc.js');

$.get(texvc_config, function (data) {
  $('script').first().after('<script type="text/x-mathjax-config">' + data + '</script>');
});

// Common configuration for MathJax, different rendering mode will modify this before inject
var commonConfig = {
	tex2jax : {
		inlineMath : [],
		displayMath : [],
		processRefs : false,
		processEnvironments : false
	},
	displayAlign : "left",
	TeX : {
		extensions : ["color.js"],
	},
	menuSettings : {
		zoom : "Click",
		zscale : "200%"
	},
	MathZoom : {
		styles : {
			"#MathJax_Zoom" : {
				"background-color" : "#FFFFFF"
			}
		}
	}
};

function setConfig (config) {
  var configScript = document.createElement("script");
  configScript.type = "text/x-mathjax-config";
  $(configScript).text(config);
  $("script").append(configScript);
}

function wikipediaPNG(images) {
  images.each(function() {
    var tex = this.alt;
    var script = document.createElement("script");
    if ($(this).hasClass("mwe-math-fallback-image-display")) {
      script.type = "math/tex; mode=display";
    } else {
      script.type = "math/tex";
    }
    tex = (isWikiwand) ? replaceUnbalancedBraces(tex) : tex;
    $(script).text("\\displaystyle " + tex);
    $(this).after(script);
    var span = document.createElement("span");
    span.className = "MathJax_Preview";
    $(this).wrap(span);
  });
  var config = commonConfig;
  // Disable fast Common-HTML preview (we already have PNG previews...)
  config.preview = "none";
  config["CHTML-preview"] = {
    disabled: true
  };
  setConfig("MathJax.Hub.Config(" + JSON.stringify(config) + ");");
}

function wikipediaTextual(spans) {
  spans.each(function(){
    var tex = $(this).text();
    tex = tex.substring(1, tex.length - 2);
    tex = (isWikiwand) ? replaceUnbalancedBraces(tex) : tex;
    script = document.createElement("script");
    if ($(this).hasClass("mwe-math-fallback-source-display")) {
      script.type = "math/tex; mode=display";
    } else {
      script.type = "math/tex";
    }
    this.className = "MathJax_Preview";
    $(script).text("\\displaystyle " + tex);
    $(this).after(script);
  });
  setConfig("MathJax.Hub.Config(" + JSON.stringify(commonConfig) + ");");
}

function wikipediaMathML(mathML) {
  // get LaTeX source annotated inside MathML
  mathML.each(function(){
    var img = $(this).parent().parent().find("img,meta");
    var span = document.createElement("span");
    span.className = "MathJax_Preview";
    $(img).wrap(span);
    var tex = $(this).find("annotation").text();
    tex = (isWikiwand) ? replaceUnbalancedBraces(tex) : tex;
    script = document.createElement("script");
    if ($(this).parent().hasClass("mwe-math-fallback-source-display")) {
      script.type = "math/tex; mode=display";
    } else {
      script.type = "math/tex";
    }
    $(script).text(tex);
    $(this).parent().parent().append(script);
  });
  var config = commonConfig;
  // Disable fast Common-HTML preview (now there are SVG/PNG previews...)
  config.preview = "none";
  config["CHTML-preview"] = {
    disabled: true
  };
  setConfig("MathJax.Hub.Config(" + JSON.stringify(config) + ");");
}

// Load MathJax only if no one else (the webpage, another browser extension...) has already loaded it
if (window.MathJax === undefined && (window.unsafeWindow === undefined || window.unsafeWindow.MathJax === undefined)) {
  var images = $("img.tex");
  if (images.length > 0) {
    wikipediaPNG(images);
  } else {
    var mathML = $("math");
    if (mathML.length > 0) {
      wikipediaMathML(mathML);
    } else {
      var spans = $("span.tex");
      if (spans.length > 0) {
        wikipediaTextual(spans);
      }
    }
  }
}

setTimeout(injectMathJax, isWikiwand ? 1500 : 0);

function injectMathJax() {
  $('head').first().after('<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,Safe"></script>');
}