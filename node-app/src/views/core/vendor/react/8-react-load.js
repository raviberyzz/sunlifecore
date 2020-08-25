var reactComponents = {};
//var createReactClass = require('create-react-class');
$(document).ready(function(){
    $('[data-component-render="react"]').each(function(){
        //console.log($(this).data('component-render-name'), reactComponents[$(this).data('component-render-name')]);
        if($(this).data('component-render-name') && reactComponents[$(this).data('component-render-name')]) {
            var props = $(this).data('component-render-props')?$(this).data('component-render-props'):null;
            ReactDOM.render(
                React.createElement(reactComponents[$(this).data('component-render-name')], props), $(this)[0]);
        }
    });
});