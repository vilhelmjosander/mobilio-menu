var mobilioMenu = (function() {
    "use strict";

    var isInit, options, holder, header, shader, triggerButton, clonedMenu, origElem, body, button;

    var defaults = {
        childrenTag:        'LI',
        childMenuClass:     '.child-menu',
        direction:          'left',
        theme:              'dark',
        allowedTags:        ['DIV', 'UL', 'OL', 'LI', 'A', 'SPAN'],
        hideOriginal:       true,
        breakpoint:         null,
        stripClasses:       true,
        stripAttrs:         true
    };

    var isTouch = !!('ontouchstart' in document.documentElement) || !!('onmsgesturestart' in document.documentElement);

    var events = {
        click: 'click',
        fastClick: isTouch ? 'touchend' : 'click'
    };

    function create(elem, opts) {

        if(!helpers.utils.browserHasTransformSupport) {
            throw "Your browser not supported by Mobilio Menu";
            return;
        } else if(!elem) {
            throw "You must provide an element to turn into a mobile menu";
            return;
        }

        origElem = elem;
        opts = opts || {};
        opts.allowedTags = defaults.allowedTags.concat(opts.allowedTags);
        options = helpers.utils.extendObj(defaults, opts);

        window.addEventListener('DOMContentLoaded', function() {

            if(options.breakpoint) {
                window.addEventListener('resize', resizeHandler);
                resizeHandler();
            } else {
                initAll();
            }
        });

    }

    function initAll() {
        setElems();
        setClasses();

        createHolder();
        createHeader();

        addEvents();

        isInit = true;
    }

    function resetAll() {
        if( options.hideOriginal ) {
            helpers.DOM.toggleVisibility(origElem);
        }
        helpers.DOM.toggleVisibility(header);
        helpers.DOM.removeClass(body, 'off-canvas');

        isInit = false;
    }

    function resizeHandler() {
        if(window.innerWidth <= options.breakpoint && !isInit) {
            initAll();
        } else if( window.innerWidth > options.breakpoint && isInit ) {
            resetAll();
        }
    }

    function setElems() {
        body = document.querySelector('BODY');
        header = document.createElement('HEADER');
        holder = document.createElement('SECTION');
        button = document.createElement('DIV');
    }

    function setClasses() {
        helpers.DOM.addClass(body, 'off-canvas');
        helpers.DOM.addClass(header, 'off-canvas-header');
        helpers.DOM.addClass(button, 'off-canvas-toggle');
        helpers.DOM.addClass(holder, 'off-canvas-holder');

        if( options.direction === 'right' ) {
            helpers.DOM.addClass(body, 'direction-right');
        }
        if(options.theme === 'light') {
            helpers.DOM.addClass(body, 'light-theme');
        }
    }

    function createHeader() {
        helpers.DOM.prependChild(body, header);
        addToggleButton();
    };

    function addToggleButton() {
        header.appendChild(button);
    };

    function createHolder() {
        helpers.DOM.prependChild(body, holder);
        cloneMenu();
    };

    function cloneMenu() {
        clonedMenu = origElem.cloneNode(true);
        helpers.DOM.appendChild(holder, clonedMenu);

        removeClassesAndAttrs();
        setChildMenus();

        if( options.hideOriginal ) {
            helpers.DOM.toggleVisibility(origElem);
        }
    };

    function setChildMenus() {
        var children = helpers.utils.toArray( clonedMenu.querySelectorAll( options.childMenuClass ) ) || [];
        for(var i in children) {
            helpers.DOM.addClass(children[i], 'off-canvas-child');
        }

        setChildMenuToggles();
    };

    function setChildMenuToggles() {
        var listItems = helpers.utils.toArray( clonedMenu.querySelectorAll(options.childrenTag) ) || [];
        for(var i in listItems) {
            if( helpers.DOM.findClass(listItems[i], 'off-canvas-child').length !== 0 ) {
                helpers.DOM.addClass(listItems[i], 'off-canvas-has-children');
            }
        }
    };

    function removeClassesAndAttrs() {
        var items = helpers.utils.toArray( holder.querySelectorAll('*') ) || [];
        var tags = options.allowedTags;
        var childClass = options.childMenuClass.substr(1);

        //Remove not allowed tags
        for(var i in items) {
            if( tags.indexOf(items[i].nodeName) === -1 ) {
                items[i].remove();
            } else {
                var resetChildMenuClass = false;

                if( helpers.DOM.hasClass(items[i], childClass ) ) {
                    resetChildMenuClass = true;
                }

                if(options.stripClasses) {
                    items[i].removeAttribute('class');
                }
                
                if(options.stripClasses) {
                    items[i].removeAttribute('id');
                }

                if(resetChildMenuClass) {
                    helpers.DOM.addClass(items[i], childClass);
                }
            }
        }
    };

    function addEvents() {
        button.addEventListener(events.fastClick, function() {
            helpers.DOM.toggleClass(body, 'off-canvas-in');
        });

        var listItems = helpers.utils.toArray( clonedMenu.querySelectorAll('.off-canvas-has-children') ) || [];
        for(var i in listItems) {
            listItems[i].addEventListener(events.click, function(e) {
                e.stopPropagation();
                if( helpers.DOM.hasClass(e.target, 'off-canvas-has-children') ) {
                    helpers.DOM.toggleClass(e.target, 'off-canvas-child-open');
                }
            });
        }
    };

    var helpers = {

        utils: {
            extendObj: function(orig, ext) {
                if(typeof orig !== 'object' || typeof ext !== 'object')
                    throw 'Can only extend objects';

                for(var key in ext) {
                    orig[key] = ext[key];
                }
                return orig;
            },

            toArray: Function.prototype.call.bind(Array.prototype.slice),

            browserHasTransformSupport: function() {
                var style = document.documentElement.style;

                return (
                    typeof (style.webkitTransform) !== 'undefined' ||
                    typeof (style.MozTransform) !== 'undefined' ||
                    typeof (style.OTransform) !== 'undefined' ||
                    typeof (style.MsTransform) !== 'undefined' ||
                    typeof (style.transform) !== 'undefined'
                );
            }
        },

        DOM: {

            appendChild: function(referenceNode, newNode) {
                referenceNode.appendChild(newNode);
            },

            prependChild: function(referenceNode, newNode) {
                referenceNode.insertBefore( newNode, referenceNode.firstChild);
            },

            addClass: function(node, name) {
                var pre = node.className.length > 0 ? ' ' : '';
                node.className += pre + name;
            },

            removeClass: function(node, name) {
                node.className = node.className.replace(name, '');
            },

            hasClass: function(node, name) {
                return node.className.indexOf(name) !== -1;
            },

            findClass: function(node, name) {
                return node.querySelectorAll('.' + name);
            },

            toggleClass: function(node, name) {
                if( !this.hasClass(node, name) ) {
                    this.addClass(node, name);
                } else {
                    this.removeClass(node, name);
                }
            },

            toggleVisibility: function(node) {
                node.style.display = node.style.display == 'none' ? '' : 'none';
            }
        }
    };

    // PUBLIC
    return {
        version: 0.1,
        create: create,
        toggle: function() {
            helpers.DOM.toggleClass(body, 'off-canvas-in');
        }
    };

})();