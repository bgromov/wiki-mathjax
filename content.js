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
  return '<script type="math/tex' + $disp + '">' + tex + '</script>';
});

// Inject config code for MathJax
$('script').append('<script type="text/x-mathjax-config">\
  MathJax.Hub.Config({\
    displayAlign: "left",\
    TeX: {\
      extensions: ["color.js"],\
      Macros: {\
        C:            "\\\\mathbb{C}",\
        cnums:        "\\\\mathbb{C}",\
        Complex:      "\\\\mathbb{C}",\
        N:            "\\\\mathbb{N}",\
        natnums:      "\\\\mathbb{N}",\
        Q:            "\\\\mathbb{Q}",\
        R:            "\\\\mathbb{R}",\
        reals:        "\\\\mathbb{R}",\
        Reals:        "\\\\mathbb{R}",\
        Z:            "\\\\mathbb{Z}",\
        sect:         "\\\\mathbb{S}",\
        P:            "\\\\mathbb{P}",\
        sgn:          "\\\\operatorname{sgn}",\
        part:         "\\\\partial",\
\
        empty:        "\\\\emptyset",\
        O:            "\\\\emptyset",\
\
	or:	      "\\\\lor",\
	and:	      "\\\\land",\
\
        Alpha:        "\\\\mathrm{A}",\
        Beta:         "\\\\mathrm{B}",\
        Epsilon:      "\\\\mathrm{E}",\
        Zeta:         "\\\\mathrm{Z}",\
        Eta:          "\\\\mathrm{H}",\
        Iota:         "\\\\mathrm{I}",\
        Kappa:        "\\\\mathrm{K}",\
        Mu:           "\\\\mathrm{M}",\
        Nu:           "\\\\mathrm{N}",\
        Omicron:      "\\\\mathrm{O}",\
        Rho:          "\\\\mathrm{R}",\
        Tau:          "\\\\mathrm{T}",\
        Chi:          "\\\\mathrm{X}",\
\
	bold:         ["{\\\\boldsymbol #1}",1],\
      }\
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
// TODO: follow Wikipedia's configuration https://git.wikimedia.org/blob/mediawiki%2Fextensions%2FMath/0476fd66d5ed73103349ca8c376601656bb2bec9/modules%2FMathJax%2Fconfig%2FTeX-AMS-texvc_HTML.js
$('script').append('<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>');
