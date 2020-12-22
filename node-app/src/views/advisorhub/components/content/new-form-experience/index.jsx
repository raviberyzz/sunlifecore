class NewFormExperience extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          data : ""
      }
    }
    render(){
        return(<div>{this.props.text}</div>)
    }
}
reactComponents["new-form-experience"] = NewFormExperience;