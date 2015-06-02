Mobilio-menu
============

Transforms your menu to an off-canvas mobile menu with 2 lines of javascript, no dependencies or external libraries. <strong>Only 1kb JS and 3kb CSS when gzipped.</strong>

##Example:

Include scripts and styles:

    <script src="path/to/mobilio-menu.js" type="text/javascript"></script>
    <link href="path/to/mobilio-menu.css" rel="stylesheet" />

Create menu:

    <script>
    	var elem = document.querySelector('#myList');
        mobilioMenu.create(elem, { breakpoint:768 });
    </script>

Look at the example index.html for and example of how to use mobilio-menu. This library expects your menu to be an UL-list.

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
An array containing nodenames of allowed elements. If the original menu contains an element which is not allowed, it will be removed along with all of it's children. Merges the user-specified array with the defaults.

Defaults: ['DIV', 'UL', 'OL', 'LI', 'A', 'SPAN']

<hr>

###### childMenuClass(String)
Classname of the childmenus. Needed for hierarchical menus with toggle-functionality.

Defaults: '.child-menu'

<hr>

###### stripClasses(Boolean)
Whether you want to strip the original classes of the elements in the menu. By default all classes will be stripped so that there is no interfering css.

Defaults: true

<hr>

###### stripIDs(Boolean)
Whether you want to strip the original attributes IDs of the elements in the menu. By default all IDs will be stripped so that there is no interfering css.

Defaults: true

<hr>

##Build

Install grunt using npm then just runt 'grunt' in the project directory.

<hr>

##Caveats

* Only works on browsers with support for CSS3-transforms (Chrome, Safari, Firefox, IE10+)

