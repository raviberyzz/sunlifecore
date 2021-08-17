const validate = (value,  rules) => {
	let isValid = true;
	for (let rule in rules) {
		switch (rule) {			
			case "minLength"      : isValid = isValid && minLengthValidator(value, rules[rule]);break;
			case "maxLength"      : isValid = isValid && maxLengthValidator(value, rules[rule]);break;
			case "isRequired"     :isValid = isValid && requiredValidator(value);break;	
      case "isAlphanumeric" :isValid = isValid && alphanumericValidator(value);	break;
			default:isValid = true;
		}
	}
	return isValid;
};

const alphanumericValidator = (value) =>{
  return  /^[a-zA-Z0-9]+$/.test(value);
}

const minLengthValidator = (value, minLength) => {
	return value.length >= minLength;
};

const maxLengthValidator = (value, maxLength) => {
	return value.length <= maxLength;
};

const requiredValidator = (value) => {
	return value.trim() !== "";
};

const LoadingSpinner = () => (
  <div id="loadingmessageDiv" className="loadingmessage" role="alert" >
      <div className="white-container">			
          <div className="loading-container">
              <i className="fa fa-spinner fa-pulse"></i>
              <p>Loading</p>
          </div>
      </div>
  </div>
);

const TextInput = props => {
  let formControl = "input-box";
  let labelError = "";
  let validationError = null;  
  if (props.touched && !props.valid) {
      formControl = 'input-box parsley-error'
      labelError="label-error"
      validationError = (props.value =='')? props.req: props.inValid;
  }   
  else validationError = null;
  return (
    <div className="col-xs-12 mar-top-10">         
        <label className={labelError} htmlFor={props.id}>{props.label}</label>            
        <input 
            type="text" 
            className={formControl}
            aria-required="true"
            aria-describedby={'error-'+ props.id}
            autoComplete= "off"
            {...props} 
        />                      
        { (validationError != null)            
          ?<div id={'error-'+props.id} tabindex="-1">
              <ul class="parsley-errors-list list-unstyled filled">
                <li class="parsley-required">{validationError}</li>
              </ul>
            </div>
          :null
        }
    </div>    
  );
}

const SubmissionResult = props => { 
  let text = props.message[props.result].text;
  let textSplit = text.split("&&");
  return( 
    <div class="row">    
          <div class="col-sm-12 col-lg-2 col-lg-offset-5 ">
            <img class="img-wrapper" src = {props.message[props.result].icon} alt=""/>
          </div>
        <div class="col-sm-10 col-sm-offset-1 info">                
            <h2>{props.message[props.result].heading}</h2>
            <p>{textSplit[0]}</p>   
            <p>{textSplit[1]}</p>    
            {props.showButton
              && <div class="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                    <a href = {props.message[props.result].url}  role= "button" class="btn btn-blue">{props.message[props.result].button}</a>
                </div>}                        
     
      </div>
    </div>
  )
}

class resetPassword extends React.Component {
  constructor(props){
    super(props);   
    this.state = {
      isLoading: true,
      formIsValid: false,
      successSubmission: null,
      submissionResponse:null,
      onPageError:null,    
      access_strong:"",
      access_text:"",
      password_strong:"",
      password_text:"",      
      formControls: {
        accessID: { 
          value: "",
          valid: false,
          validationRules: {
            isRequired: true,            
            minLength:4,
            maxLength: 12,
            isAlphanumeric:true,
          },
          touched: false,
        },
        birthDate: {
          value: "",
          valid: false,
          validationRules: {
            isRequired: true,
            maxLength:10,
          },
          touched: false,
        },       
      },
      message:{
        success:{
          heading:this.props.successHeading,
          text:this.props.successText,
          icon:this.props.successIcon,
          button:this.props.homeText,          
          url:this.props.homeURL
        },
        serverError:{
          heading: this.props.serverErrorHeading,
          text: this.props.serverErrorText,
          icon:this.props.errorIcon,
          button:this.props.homeText,          
          url:this.props.homeURL
        },
        misMatchInfo:{
          heading: this.props.misMatchInfoHeading,
          text:this.props.misMatchInfoText,
          icon:this.props.errorIcon,
          button:this.props.homeText,          
          url:this.props.homeURL
        },
        accLocked:{
          heading: this.props.accLockedHeading,
          text:this.props.accLockedText,
          icon:this.props.errorIcon,
          button:this.props.homeText,          
          url:this.props.homeURL
        },
        missingInfo:{
          heading:this.props.missingInfoHeading,
          text:this.props.missingInfoText,
          icon:this.props.errorIcon,
          button:this.props.homeText,          
          url:this.props.homeURL
        }
      }
    }
  }
  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedControls    = {...this.state.formControls};
    const updatedFormElement = {...updatedControls[name]};
    updatedFormElement.value = value;
    updatedFormElement.touched = false;
    updatedControls[name] = updatedFormElement;
    this.setState({formControls: updatedControls});
  };

  blurHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedControls = {...this.state.formControls};
    const updatedFormElement = {...updatedControls[name]};    
    updatedFormElement.value = value;
    updatedFormElement.touched = true;    
    updatedFormElement.valid = validate(value,  updatedFormElement.validationRules);
    updatedControls[name] = updatedFormElement;   
    this.setState({formControls: updatedControls});
  };

  stateSet(){
    this.setState({ 
      successSubmission: true, isLoading: false, submissionResponse: "success", onPageError:false
   });
   
  }
  formSubmitHandler = () => {   
    this.setState({ isLoading: true });
    let formIsValid = true;
    let success = false;
    let errorCount = 0;
    const updatedControls = { ...this.state.formControls };
    for (let inputIdentifier in updatedControls) {
      updatedControls[inputIdentifier].valid = validate(updatedControls[inputIdentifier].value,  updatedControls[inputIdentifier].validationRules);
      errorCount = !updatedControls[inputIdentifier].valid ? errorCount + 1 : errorCount;
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      updatedControls[inputIdentifier].touched = true;
    }
   
    this.setState({ formIsValid: formIsValid, errorCount: errorCount });
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    if (formIsValid ) {
        // call API wait for 8 sec for response
     console.log("Form is valid");

    setTimeout(() => this.stateSet(),8000 );
    }
    else{
      console.log("Form is in valid");
      this.setState({ successSubmission: false , isLoading:false, submissionResponse:"serverError" , onPageError:true });
    } 
  };
  
  componentDidMount() {
    let access =  this.props.getAccessIdText.split(',');
    let pswd = this.props.getPasswordText.split(',');
    this.setState({ isLoading: false,
      access_strong:access[0],
      access_text:access[1],
      password_strong: pswd[0],
      password_text:pswd[1]
     });
  }

  render() { 
    return (
      <>
        <div class="reset-password-wrapper">
            {this.state.isLoading ? <LoadingSpinner /> :null}
            {this.state.formIsValid && this.state.successSubmission && ! this.state.onPageError
                ? <SubmissionResult 
                    result = {this.state.submissionResponse} 
                    message ={this.state.message}
                    showButton = {!this.props.onPageError}
                />
                :<div class="row">
                    { this.state.successSubmission == false && this.state.formIsValid && this.state.onPageError 
                    ?<SubmissionResult  
                        result = {this.state.submissionResponse} 
                        message ={this.state.message}
                        showButton = {this.props.onPageError} /> 
                    : <div class="col-sm-10 col-sm-offset-1 info">
                          <p><strong>{this.state.access_strong}</strong>,{this.state.access_text}</p> 
                          <p><strong>{this.state.password_strong}</strong>,{this.state.password_text}</p>                         
                      </div>}                   
                    <div class="col-sm-6 col-sm-offset-3 mar-top-20">                  
                        <TextInput
                            name="accessID"
                            id="accessID"
                            label={this.props.accessIDLabel}
                            value={this.state.formControls.accessID.value}
                            onChange={this.changeHandler}
                            touched={this.state.formControls.accessID.touched}
                            valid={this.state.formControls.accessID.valid}                                  
                            onBlur={this.blurHandler}
                            req = {this.props.accessIDReq}
                            inValid = {this.props.accessIDInValid}
                        />
                        <TextInput
                            name="birthDate"
                            id="birthDate"
                            label={this.props.birthDateLabel}
                            value={this.state.formControls.birthDate.value}
                            onChange={this.changeHandler}
                            touched={this.state.formControls.birthDate.touched}
                            valid={this.state.formControls.birthDate.valid}               
                            maxLength="10"
                            onBlur={this.blurHandler}
                            req={this.props.birthDateReq}
                            inValid={this.props.birthDateInValid}
                            placeholder={this.props.birthDatePlaceholder}
                        />
                        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                            <button type="submit" class="btn btn-blue" onClick={this.formSubmitHandler} >{this.props.submitText}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
      </>
    );
  }
}
reactComponents["reset-password"] = resetPassword;