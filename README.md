Mobilio-menu
============

Transforms your menu to an off-canvas mobile menu with 2 lines of javascript, no dependencies or external libraries. <strong>Only 1kb JS and 3kb CSS when gzipped.</strong>

##Example:

	var elem = document.querySelector('#myList');
    mobilioMenu.init(elem, { breakpoint:768 });
    
    
##Options

##### breakpoint(Int)
At what width should we initialize/reset the mobilio menu. Null for always.

<strong> Defaults: null </strong>

##### direction(String)
Should the menu slide in from left or right

<strong> Defaults: 'left' </strong>

##### theme(String)
Light/Dark theme

<strong> Defaults: 'dark' </strong>

##### hideOriginal(Boolean)
Whether you should hide the original menu when initializing

<strong> Defaults: true </strong>

##### allowedTags(Array)
An array containing nodenames of allowed elements. If the original menu contains an element which is not allowed, it will be removed along with all of it's children.

<strong> Defaults: ['DIV', 'UL', 'OL', 'LI', 'A', 'SPAN'] </strong>

##### childMenuClass(String)
Classname of the childmenus. Needed for hierarchical menus with toggle-functionality.

<strong> Defaults: '.child-menu' </strong>


##Caveats

* Only works on browsers with support for CSS3-transforms (Chrome, Safari, Firefox, IE10+)

