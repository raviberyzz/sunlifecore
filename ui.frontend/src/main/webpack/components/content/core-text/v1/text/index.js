const TextComp = {
	init: function () {
		TextComp.onDOMready();
		TextComp.eventHandlers();
	},
	onDOMready: function () {
		console.log('TextComp onDOMReady');
	},
	eventHandlers: function () {
		console.log('TextComp eventHandlers');
	},
};

$(function () {
	TextComp.init();
});