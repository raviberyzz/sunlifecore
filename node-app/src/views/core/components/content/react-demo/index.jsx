class ReactDemo extends React.Component {
    render() {
      return <this.props.headingLevel style={{color:'red'}}>Hello, {this.props.headingText}</this.props.headingLevel>;
    }
}
reactComponents["react-demo"] = ReactDemo;