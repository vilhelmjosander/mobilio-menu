Mobilio-menu
============

Transforms your menu to an off-canvas mobile menu with 2 lines of javascript, no dependencies or external libraries. <strong>Only 1kb JS and 3kb CSS when gzipped.</strong>

##Example:

	var elem = document.querySelector('#myList');
    mobilioMenu.init(elem, { breakpoint:768 });
    
    
##Options

###### breakpoint(Int)
At what width should we initialize/reset the mobilio menu. Null for always.

Defaults: null

<hr>

###### direction(String)
Should the menu slide in from left or right

Defaults: 'left' 

<hr>

###### theme(String)
Light/Dark theme

Defaults: 'dark'

<hr>

###### hideOriginal(Boolean)
Whether you should hide the original menu when initializing

Defaults: true 

<hr>

###### allowedTags(Array)
An array containing nodenames of allowed elements. If the original menu contains an element which is not allowed, it will be removed along with all of it's children.

Defaults: ['DIV', 'UL', 'OL', 'LI', 'A', 'SPAN']

<hr>

###### childMenuClass(String)
Classname of the childmenus. Needed for hierarchical menus with toggle-functionality.

Defaults: '.child-menu'

<hr>

##Caveats

* Only works on browsers with support for CSS3-transforms (Chrome, Safari, Firefox, IE10+)

