/* global Granite */
(function (window, ns) {
    'use strict';

    // initialisation for sunlife auth hook
    window.sunAuth = window.sunAuth || {};
    window.sunAuth.core = window.sunAuth.core || {};
    window.sunAuth.core.component = window.sunAuth.core.component || {};

    var CONST = {
        SELECTORS: {
            component: '.component'
        },
        CLASS: {
            hide: 'd-none'
        },
        cardCompPath: '/apps/sunlife/core/components/content/core-card/v1/card',
    };

    /**
     * Adds a child component of a specified type to a parent editable component.
     * (event handler for clicking the 'add' button in the edit interface on the sections or questions component)
     *
     * @param {Granite.author.Editable}     parentEditable      The editable parent component
     * @param {string}                      componentName       Name of the child component to add e.g. 'sunlife/components/content/hello-world'
     * @param {boolean}                     componentTemplate   If true, call the low level interface directly. If false, call higher level Granite.author.edit methods. e.g. '/apps/sunlife/components/content/hello-world/cq:template'
     * @param {Function}                    cb                  The callback, if any, to be executed afterwards
     */
    var createChildComponent = function (
        parentEditable,
        componentName,
        componentTemplate,
        cb
    ) {
        return new ns.persistence.PostRequest()
            .prepareCreateParagraph({
                resourceType: componentName,
                parentPath: parentEditable.path,
                relativePosition: 'last',
                templatePath: componentTemplate
            })
            .send()
            .done(function () {
                parentEditable.refresh();
                if (cb) {
                    cb.call(this);
                }
            });
    };

    /**
     * Move a component before or after a neigbhour component path
     *
     * @param {Granite.author.Editable}     parentEditable      The editable parent component
     * @param {string}                      insertBehavior      before or after
     * @param {string}                      neighborPath        path of the neighbour component
     */
    var moveNode = function (editable, insertBehavior, neighborPath) {
        var editableNeighbor = ns.store.find(neighborPath)[0],
            historyStep = undefined,
            historyEnabled = ns.history.Manager.isEnabled();

        ns.history.util.Utils.getNeighborPath(editable, insertBehavior).done(
            function (data) {
                // Only create a history step if the editable has actually changed position.
                if (
                    historyEnabled &&
                    data.neighborPath != editableNeighbor.path
                ) {
                    historyStep = ns.history.util.Utils.beginStep();
                }

                ns.edit.actions
                    .doMove(editable, insertBehavior, editableNeighbor, {
                        step: historyStep
                    })
                    .done(function () {
                        if (historyStep) {
                            ns.history.util.Utils.finalizeStep(historyStep);
                        }
                    });
            }
        );
    };

    window.sunAuth.core.component = (function () {
        return {
            common: {
                toggle: function () {
                    this.dom
                        .children(CONST.SELECTORS.component)
                        .toggleClass(CONST.CLASS.hide);
                },
                refresh: function (editable) {
                    editable.refresh();
                },
                moveUp: function () {
                    var neighborPath,
                        previousSibling = this.dom.prev();

                    if (previousSibling.length) {
                        neighborPath = previousSibling
                            .children('cq')
                            .data('path');

                        if (neighborPath) {
                            moveNode(this, 'before', neighborPath);
                        }
                    }
                },
                moveDown: function () {
                    var neighborPath,
                        nextSibling = this.dom.next();

                    if (nextSibling.length) {
                        neighborPath = nextSibling.children('cq').data('path');

                        if (neighborPath) {
                            moveNode(this, 'after', neighborPath);
                        }
                    }
                }
            },
            cardContainer: {
                card: {
                    add: function (editable) {
                        createChildComponent(
                            editable,
                            CONST.cardCompPath,
                            false
                        );
                    }
                }
            }
        };
    })();
})(window, Granite.author);
