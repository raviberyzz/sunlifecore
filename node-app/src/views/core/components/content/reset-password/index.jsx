const validate = (value,  rules) => {
	let isValid = true;
	for (let rule in rules) {
		switch (rule) {			
			case "minLength":
				isValid = isValid && minLengthValidator(value, rules[rule]);
				break;
			case "maxLength":
				isValid = isValid && maxLengthValidator(value, rules[rule]);
				break;
			case "isRequired":
				isValid = isValid && requiredValidator(value);
				break;	
      case "isAlphanumeric":
        isValid = isValid && alphanumericValidator(value);	break;
			default:
				isValid = true;
		}
	}
	return isValid;
};


const alphanumericValidator = (value) =>{
  return  /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value, minLength) => {
	return value.length >= minLength;
};

/**
 * maxLength Val
 * @param  value
 * @param  manLength
 * @return
 */
const maxLengthValidator = (value, maxLength) => {
	return value.length <= maxLength;
};

/**
 * Check to confirm that feild is required
 * @param  value
 * @return
 */
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
              {...props} />
             
         
          {(validationError != null)            
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

const SuccessSubmission = props => { 
  return( 
    <div class="reset-password-wrapper  mar-top-50 ">
      <div class="row">
          <div class=" img-wrapper col-lg-2 col-lg-offset-5">
            <img src = {props.icon}/>
          </div>
      </div>
        <div class="row ">
              <div class="col-sm-10 col-sm-offset-1 info">                
                  <h2>{props.heading}</h2>
                  <p>{props.line1}</p>
                  <p>{props.line2}</p>
                  <div class="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                    <button type="submit" class="btn btn-blue"  >{props.home}</button>
                  </div>
              </div>
        </div>
    </div>
  )
}
const ErrorSubmission = props => { 
  return(       
        <div class="row ">          
              <div class="col-sm-10 col-sm-offset-1 info">
                  <h2>Something went wrong</h2>
                  <p>Sorry, there was a problem on our end and we couldn’t reset your password. </p>
                  <p>Try again in a few minutes or call 1-800-800-4786 and select Option 6. We’re available Monday to Friday, 8 a.m. – 8 p.m. ET.</p>                 
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
      errorCount: 0,
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
        language: {
          value: lang,
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
    // let formIsValid = true;
    // for (let inputIdentifier in updatedControls) {
    //   formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    // }
    this.setState(() => {
      return { formControls: updatedControls};
    });
  };

  stateSet(){
    this.setState({
      successSubmission: true, isLoading: false 
   });
  }
  formSubmitHandler = () => {
    console.log("Clicked");
     this.setState((state) => {
      return { isLoading: true };
    });

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
   
    this.setState((state) => {
      return { formIsValid: formIsValid, errorCount: errorCount };
    });

    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    if (formIsValid ) {
     console.log("Form is valid");
     setInterval(
      () => this.stateSet(),
      8000
    );
    }
    else{
      console.log("Form is in valid");
      this.setState((state) => {
        return { successSubmission: false , isLoading:false};
      });
    } 
  };
  
  componentDidMount() {
    this.setState((state) => {
      return { isLoading: false };
    });
  }

  render() { 
    return (
      <>
        {this.state.isLoading
        ? (<LoadingSpinner />)
        : this.state.formIsValid && this.state.successSubmission
          ? (<SuccessSubmission heading={this.props.successHeading} 
            line1={this.props.successText1} 
            line2={this.props.successText2} 
            home={this.props.homeText}
            icon={this.props.successIcon}
            />)
          : (<div class="reset-password-wrapper mar-top-50">
            <div class="row ">
            {this.state.successSubmission == false && this.state.formIsValid
            ? <ErrorSubmission/>
            :null}
              <div class="col-sm-10 col-sm-offset-1 info">
                  <p>{this.props.getAccessIdText}</p>
                  <p>{this.props.getPasswordText}</p>            
              </div>
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
          </div>
        )} 
      </>
    );
  }
}
reactComponents["reset-password"] = resetPassword;