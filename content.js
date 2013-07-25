// Replace image tags with MathJax math scripts
$('img.tex').replaceWith(function() {
  var $otag, $ctag, $disp, $scale;
  if($(this).parent().is('dd')) {
    $otag = '[mjax]'; $ctag = '[/mjax]';
    $disp = '; mode=display';
    $scale = '125%';
  }else{
    $otag = '[mjax-inline]'; $ctag = '[/mjax-inline]';
    $disp = '';
    $scale = '100%';
  }
  return '<span style="font-size: ' + $scale + '"><script type="math/tex' + $disp + '">' + $(this).attr('alt') + '</script></span>';
});

// Inject config code for MathJax
$('script').append('<script type="text/x-mathjax-config">\
  MathJax.Hub.Config({\
    displayAlign: "left",\
    TeX: {\
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
$('script').append(
'<script type="text/javascript" \
src="https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">\
</script>');
