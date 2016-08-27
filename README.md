Wikipedia with MathJax (Chrome extesion)
========================================

Extension replaces Wikipedia bitmap equations with HTML-CSS ones by re-rendering them with an open source [MathJax](http://mathjax.org/) library. In effect, this allows to scale Wikipedia pages without loosing in equation quality.

Left-Click on equation to instantly zoom it to 200% (can be changed via MathJax menu).

Right-Click on equation to show MathJax's context menu with additional options, e.g. "Scale All Math..." to instantly scale all equations on a page, "TeX commands" to see the source TeX equation etc.

Extension is now published under [New BSD License](https://github.com/bgromov/wiki-mathjax/blob/master/LICENSE.md) with the source code available [here](https://github.com/bgromov/wiki-mathjax).

For bug reports and feature requests, please use [Issue tracker](https://github.com/bgromov/wiki-mathjax/issues).

### INSTALLATION:

Official release available at [Chrome Web Store](https://chrome.google.com/webstore/detail/wikipedia-with-mathjax/fhomhkjcommffnlajeemenejemmegcmi).

### UPDATES:

**v.0.0.12:**

 - Add support for chemical equations (Thanks to Jordan Wade).
 
**v.0.0.11:**

 Improvements and bug fixes (Thanks to Lorenzo Cameroni):

 - Adapt to recent Wikimedia math engine changes.

 - Improve work-around for unbalanced braces bug on Wikiwand.

 - Add missed symbols to MathJax config.

**v.0.0.10:**

 - Finally fix the problem with descriptive annotations for equations (some equations have textual descriptions instead of TeX code, perhaps for accessibility reasons). Now the math is loaded from corresponding source pages (edit pages).

 - Update jQuery to v1.12.3. Extension seems to work a bit better with Wikiwand now.

**v.0.0.9:**

 - Add support for Wikiwand (wikiwand.com). Quick and hackish implementation, that tries to fix broken equations on Wikiwand pages.

**v.0.0.8:**

 - Add support for WikiBooks (wikibooks.org).

**v.0.0.7:**

 - Extension now uses official [Wikimedia MathJax config](https://git.wikimedia.org/blob/mediawiki%2Fextensions%2FMath.git/09aafb299242293272fecc64aeeeed16a00c2a0b/modules%2Fmediawiki-extensions%2Ftexvc.js). Still, there are some glitches, so the local copy is used for now.

**v.0.0.6:**

 - Fix MathJax CDN URL (Thanks to Thomas Kriechbaumer).

**v.0.0.5:**

 - Add MathJax *Preview* feature. For smoother user experience original images replaced only after MathJax typesetting is ready (Thanks to Peter Krautzberger).

 - Fix: by default MathJax using different from LaTeX `\color` macro. That makes certain equations unable to render (for example, see [Extended Kalman Filter](http://en.wikipedia.org/wiki/Extended_Kalman_filter#Discrete-time_predict_and_update_equations)). The problem is solved by MathJax' `color` extension.

**v.0.0.4:**

 - Fix the fix: extension now works on secured (https) version of Wikipedia.

**v.0.0.3:**

 - Fix: extension now works on secured (https) version of Wikipedia.

**v.0.0.2:**

 - Now supports some non-standard LaTeX commands specific to Wikipedia markup language.
 
 - Inline equations are scaled down to 100% (previously were same as display equations, i.e. 125%).

### KNOWN ISSUES:

 - Symbols which are not a part of display equation, i.e. not typed in between <math>...</math>, but right after it, will be displayed from the next line. This is along with LaTeX markup rules and won't be fixed.
 
 - **(Fixed)** Fraction bar is oversized on scaled pages in recent versions of Chrome (e.g. 21.0.1180.75), this is a bug in MathJax/Chrome and not related to extension. See [this](https://groups.google.com/forum/?fromgroups#!topic/mathjax-users/TWNUoKIaF4I%5B1-25%5D).
