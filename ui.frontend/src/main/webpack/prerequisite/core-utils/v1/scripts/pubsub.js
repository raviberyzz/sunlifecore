// Source : https://gist.github.com/addyosmani/1321768
(function (d) {
    // the topic/subscription hash
    const o = d({});

    // Publish a topic
    d.publish = function () {
        // eslint-disable-next-line prefer-rest-params,prefer-spread
        o.trigger.apply(o, arguments);
    };

    // Subscribe to a topic. Works just like on, except the passed handler
    // is wrapped in a function so that the event object can be stripped out.
    // Even though the event object might be useful, it is unnecessary and
    // will only complicate things in the future should the user decide to move
    // to a non-d.event-based pub/sub implementation.
    d.subscribe = function (topic, fn) {
        // Call fn, stripping out the 1st argument (the event object).
        function wrapper() {
            // eslint-disable-next-line prefer-rest-params
            return fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }

        // Add .guid property to function to allow it to be easily unbound. Note
        // that d.guid is new in jQuery 1.4+, and d.event.guid was used before.
        // eslint-disable-next-line no-multi-assign
        wrapper.guid = fn.guid = fn.guid || (d.guid ? d.guid++ : d.event.guid++);

        // Bind the handler.
        o.on(topic, wrapper);
        return [topic, wrapper];
    };

    // Unsubscribe from a topic.
    d.unsubscribe = function () {
        // eslint-disable-next-line prefer-rest-params,prefer-spread
        o.off.apply(o, arguments);
    };
})(window.sunCore.$);
