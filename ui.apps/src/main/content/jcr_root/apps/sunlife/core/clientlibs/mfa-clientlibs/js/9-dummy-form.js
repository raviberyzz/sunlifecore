/**
 * Dummy form to invoke submission back to transmit so that we can make a reject node call
 * @param {String} formId Id of the invoke a form from transmit
 * @param {Object} payload data from transmit  
 */
function dummyForm(formId, payload) {
  this.formId = formId;
  this.payload = payload;
  this.showDebugInfo = true;
  this.submitBlock = null;

  this.startSession = function (clientContext, actionContext) {
    if(this.showDebugInfo){
      console.log('Form session started: ', this.formId);
    }
  };

  this.endSession = function () {
    if(this.showDebugInfo){
      console.log('Form session ended: ', this.formId);
    }
  };

  this.promiseFormInput = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.submitBlock = function (payload) {
        resolve(
          com.ts.mobile.sdk.FormInput.createFormInputSubmissionRequest(
            Object.assign(payload)
          )
        );
        self.submitBlock = null; // assign null to prevent using the same promise more then once
      };
      // immediately submit back to transmit
      self.submitBlock({
        action: 'submit',
      });
    });
  };

  this.onContinue = function (payload) {
    if(this.showDebugInfo){
      console.log('dummyForm on continue called, payload: ', payload);
    }
  };

  this.onError = function (payload) {
    if(this.showDebugInfo){
      console.error('dummyForm on error called, payload: ', payload);
    }
  };
}