var reactDemo = createReactClass({
  displayName: "reactDemo",
  render: function () {
    return React.createElement(this.props.headingLevel, null, "Hello, ", this.props.headingText);
  }
});
reactComponents["react-demo"] = reactDemo;