wiki-mathjax
============

Extension replaces Wikipedia bitmap equations with HTML-CSS ones by re-rendering them with an open source [MathJax](http://mathjax.org/) library. In effect, this allows to scale Wikipedia pages without loosing in equation quality.

Left-Click on equation to instantly zoom it to 200% (can be changed via MathJax menu).

Right-Click on equation to show MathJax's context menu with additional options, e.g. "Scale All Math..." to instantly scale all equations on a page, "TeX commands" to see the source TeX equation etc.

### UPDATES:

**v.0.0.4:**

 - Fix: extension now works on secured (https) version of Wikipedia

**v.0.0.3:**

 - Fix: extension now works on secured (https) version of Wikipedia

**v.0.0.2:**

 - Now supports some non-standart LaTeX commands specific to Wikipedia markup language.
 
 - Inline equations are scaled down to 100% (previously were same as display equations, i.e. 125%)

### KNOWN ISSUES:

 - Symbols which are not a part of display equation, i.e. not typed in between <math>...</math>, but right after it, will be displayed from the next line. This is along with LaTeX markup rules and won't be fixed.
 
 - **(Fixed)** Fraction bar is oversized on scaled pages in recent versions of Chrome (e.g. 21.0.1180.75), this is a bug in MathJax/Chrome and not related to extension. See [this](https://groups.google.com/forum/?fromgroups#!topic/mathjax-users/TWNUoKIaF4I%5B1-25%5D).
