import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import { subYears } from "date-fns";
var notReq = [];

//Text Component
const Text = ({ name, placeholder, handleChange, required, maxlength, disabled, dataParsleyPattern, dataParsleyRequiredMessage,
    dataParsleyPatternMessage, dataParsleyMinlength, dataParsleyMinlengthMessage }) => {
    return (
        <>
            <input className="form-control" type="text" name={name} id={name} placeholder={placeholder} onChange={handleChange}
                disabled={disabled} maxlength={maxlength} data-parsley-pattern={dataParsleyPattern} required={required}
                data-parsley-required-message={dataParsleyRequiredMessage} data-parsley-pattern-message={dataParsleyPatternMessage}
                data-parsley-minlength={dataParsleyMinlength} data-parsley-minlength-message={dataParsleyMinlengthMessage} />
        </>
    );
};

//Email Component
const Email = ({ name, placeholder, handleChange, required, maxlength, disabled, dataParsleyPattern, dataParsleyRequiredMessage,
    dataParsleyPatternMessage, dataParsleyMinlength, dataParsleyMinlengthMessage }) => {
    return (
        <>
            <input className="form-control" type="email" name={name} id={name} placeholder={placeholder} onChange={handleChange}
                maxlength={maxlength} data-parsley-pattern={dataParsleyPattern} required={required} disabled={disabled}
                data-parsley-required-message={dataParsleyRequiredMessage} data-parsley-pattern-message={dataParsleyPatternMessage}
                data-parsley-minlength={dataParsleyMinlength} data-parsley-minlength-message={dataParsleyMinlengthMessage} />
        </>
    );
};

//Textarea Component
const Textarea = ({ name, placeholder, handleChange, required, maxlength, disabled, dataParsleyPattern, dataParsleyRequiredMessage,
    dataParsleyPatternMessage, dataParsleyMinlength, dataParsleyMinlengthMessage }) => {
    return (
        <>
            <input className="form-control" type="textarea" name={name} id={name} placeholder={placeholder} onChange={handleChange}
                maxlength={maxlength} data-parsley-pattern={dataParsleyPattern} required={required} disabled={disabled}
                data-parsley-required-message={dataParsleyRequiredMessage} data-parsley-pattern-message={dataParsleyPatternMessage}
                data-parsley-minlength={dataParsleyMinlength} data-parsley-minlength-message={dataParsleyMinlengthMessage} />
        </>
    );
};

//Dropdown Component
const Dropdown = ({ name, val, handleChange, disabled, dataParsleyRequiredMessage, required }) => {
    return (
        <select className="form-dropdown form-control" name={name} id={name} onChange={handleChange} required={required}
            data-parsley-required-message={dataParsleyRequiredMessage} disabled={disabled}>
            <option></option>{val.map(values => <option value={values.value} data-attr={values.dataAttr}
                key={values.value}>{values.display}</option>)}
        </select>
    );
};

//Datalist Component
const Datalist = ({ name, val, handleChange, disabled, dataParsleyRequiredMessage, required }) => {
    return (
        <div>
            <input type="text" required={required} id={name} name={name} data-parsley-required-message={dataParsleyRequiredMessage}
                list="city_select" class="form-dropdown form-control" onChange={handleChange} disabled={disabled} />
            <datalist id="city_select">
                <option></option>{val.map(values => <option value={values.value} data-attr={values.dataAttr}
                    key={values.value}>{values.display}</option>)}
            </datalist>
        </div>
    );
};

//Radio Component
const Radio = ({ name1, value1, value2, name2, id1, id2, group, required, disabled, handleChange, dataParsleyRequiredMessage }) => {
    return (
        <div className="row radio-div">
            <input type="radio" name={group} value={value1} id={id1} onChange={handleChange} disabled={disabled} required={required}
                data-parsley-required-message={dataParsleyRequiredMessage} />
            <label className="radioLabel">{name1}</label>
            <input type="radio" name={group} value={value2} id={id2} onChange={handleChange} disabled={disabled} />
            <label className="radioLabel">{name2}</label>
        </div>
    );
};

//Checkbox Component
const Checkbox = ({ name, label, label_div_id, handleChange, html }) => {
    return (
        <>
            <input type="checkbox" name={name} id={name} onChange={handleChange} />
            <label for={name}>{label}
                <div id={label_div_id} ></div>
            </label>

            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </>
    );
}

//Button Component
const Button = ({ id, label, css, onClick }) => {
    return (
        <>
            <button type="button" id={id} className={css} onClick={onClick}>{label}</button>
        </>
    );
}

//Hidden Component
const Hidden = ({ name, handleChange, value, target }) => {
    return (
        <>
            <input className="form-control" type="hidden" id={name} name={name} value={value} target={target} onInput={handleChange} />
        </>
    );
};

//PopUp Modal Component
const Modal = ({ errorMsg }) => {
    return (
        <div>
            <div className="modal slf-modal" id="modal_popup" role="dialog" aria-describedby="form-body"
                aria-labelledby="modalHeader" aria-modal="true" tabindex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body" dangerouslySetInnerHTML={{ __html: errorMsg }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            d2N_provience2: "",
            primaryArr: {},
            secondaryArr: {},
            dataArr: {},
            uniquecount: 0,
            reactDatepickValue: ""
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.actionOnButton = this.actionOnButton.bind(this);
        this.getJson = this.getJson.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.d2N_provience2 !== nextState.d2N_provience2 || this.state.dataArr !== nextState.dataArr
            || this.state.reactDatepickValue !== nextState.reactDatepickValue) {
            return true;
        } else if (this.state.formPrimaryJson !== nextState.formPrimaryJson && nextState.formPrimaryJson === "self") {
            this.setState({ dataArr: this.state.secondaryArr })
        }
        else if (this.state.formPrimaryJson !== nextState.formPrimaryJson && nextState.formPrimaryJson != "self") {
            this.setState({ dataArr: this.state.primaryArr })
        }
        else
            return false;
    }

    getJson() {
        if (this.props.primaryPath != "") {
            fetch(this.props.primaryPath)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            primaryArr: result,
                            dataArr: result
                        })
                    },
                    (error) => {
                        console.log("err" + JSON.stringify(error));
                       }
                )
        }

        if (this.props.secondaryPath != "") {
            fetch(this.props.secondaryPath)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            secondaryArr: result
                        })
                    },
                    (error) => {
                        console.log("err" + JSON.stringify(error));
                      
                    }
                )
        }

    }

    componentDidMount() {
        this.getJson();
    }

    todayDate() {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var today = new Date(utc + (3600000 * 8));
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        today = today.concat('T00:00:00');
        return today;
    }

    convertDate(dob) {
        var datepick = new Date(dob);
        var dd = String(datepick.getDate()).padStart(2, '0');
        var mm = String(datepick.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = datepick.getFullYear();
        var date = yyyy + '-' + mm + '-' + dd;
        var jsonDate = date.concat('T00:00:00');
        return jsonDate;

    }

    checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    dokuDate() {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var today = new Date(utc + (3600000 * 8));
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        h = this.checkTime(h);
        m = this.checkTime(m);
        s = this.checkTime(s);
        return yyyy + mm + dd + h + m + s;
    }

    dateAndTime() {
        var finalDate
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var today = new Date(utc + (3600000 * 8));
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        h = this.checkTime(h);
        m = this.checkTime(m);
        s = this.checkTime(s);
        finalDate = yyyy + '-' + mm + '-' + dd + 'T' + h + ':' + m + ':' + s;
        return finalDate;
    }

    makeNumRandom16() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16).substring(1);
        }
        return "CIMB-" + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }

    makeNumRandom8() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(8).substring(2);
        }
        return s4() + s4();
    }

    utagLink(ev_type, ev_action, ev_title, ev_data_one, ev_data_two) {
        if (typeof utag !== 'undefined') {
            return (
                utag.link({
                    ev_type: ev_type, ev_action: ev_action, ev_title: ev_title, ev_data_one: ev_data_one, ev_data_two: ev_data_two
                })
            );
        }
    }

    createApiRequest(strReq, arr, headers) {
        const funcDetail = ["func_todayDate()", "func_dokuDate()", "func_dateAndTime()", "func_makeNumRandom(10)", "func_makeNumRandom(8)"]
        for (let idx in arr) {
            const item = arr[idx].name;
            const val = arr[idx].value;
            if (item != val) {
                if (item.indexOf('birthdb') > -1) {
                    val = this.convertDate(val);
                }
                if (strReq.search(item) != -1) {
                    strReq = strReq.replace(item, val)
                }
            }
            else {
                strReq = strReq.replace(item, "")
            }
        }
        for (let id in notReq) {
            if (strReq.search(notReq[id]) != -1) {
                strReq = strReq.replace(notReq[id], "")
            }
        }
        if (strReq.search("func_todayDate()") != -1) {
            var tdate = this.todayDate();
            strReq = strReq.replaceAll("func_todayDate()", tdate)
        }
        if (strReq.search("func_dokuDate()") != -1) {
            var tdate = this.dokuDate();
            strReq = strReq.replaceAll("func_dokuDate()", tdate)
        }
        if (strReq.search("func_dateAndTime()") != -1) {
            var tdate = this.dateAndTime();
            strReq = strReq.replaceAll("func_dateAndTime()", tdate)
        }
        if (strReq.indexOf("func_makeNumRandom(16)") > -1 || headers.indexOf("func_makeNumRandom(16)") > -1) {
            var tdate = this.makeNumRandom16();
            strReq = strReq.replaceAll("func_makeNumRandom(16)", tdate)
            headers = headers.replaceAll("func_makeNumRandom(16)", tdate)
        }
        if (strReq.indexOf("func_makeNumRandom(8)") > -1) {
            var tdate = this.makeNumRandom8();
            strReq = strReq.replaceAll("func_makeNumRandom(8)", tdate);
        }
        return { "strRequestApi": strReq, "headers": headers }
    }

    responseFunc(output, dataFromJson) {
        const responseType = dataFromJson.apiSignature.responseType;
        if (responseType.search('EDIST') != -1) {
            if (output != undefined && output.httpCode == 200) {
                if (output.encryptedData != undefined)
                    localStorage.setItem(output.response[0].correlationId, output.encryptedData);
                if (output.access_token != undefined)
                    createCookie('auth_token', output.access_token, true);
                const raw = output.response[0].raw;
                $('<form action="#" id="payment_form" name="payment_form" method="post"></form>').appendTo('body');
                $.each(raw, function (i, val) {
                    if (i === 'submitUrl') {
                        $('#payment_form').attr('action', val)
                    }
                    else if (i === 'sesionid') {
                        $('#payment_form').append('<input name="SESSIONID" type="hidden" id="SESSIONID" value="' + val + '" />');
                    }
                    else { $('#payment_form').append('<input name="' + i.toUpperCase() + '" type="hidden" id="' + i.toUpperCase() + '" value="' + val + '" />'); }
                });
                $('#payment_form').submit();
            }
        }
    }

    submitForm(e) {
        // e.preventDefault();
        const data = this.state;
        const formData = []
        Object.keys(data).forEach(key => formData.push({ name: key, value: data[key] }))
        var dataFromJson = this.state.dataArr;
        const apiRequest = dataFromJson.apiSignature.request;
        var strApiRequest = JSON.stringify(apiRequest);
        var headers = dataFromJson.apiSignature.headers;
        headers = JSON.stringify(headers);
        var reqObject = this.createApiRequest(strApiRequest, formData, headers);
        strApiRequest = reqObject.strRequestApi
        headers = reqObject.headers
        var output;

        $.ajax({
            url: this.props.apiURL,
            type: dataFromJson.apiSignature.type,
            headers: JSON.parse(headers),
            data: strApiRequest,
            success: (resp) => {
                output = resp;
              	this.createutag('ajaxSuccess','button');
                this.responseFunc(output, dataFromJson);
                
            },
            error: (resp) => {
                //popup 
                if (dataFromJson.apiSignature.error.popup != undefined && dataFromJson.apiSignature.error.errorMsg != undefined) {
                    $('#loading-image').addClass('hidden');
                    $("#modal_popup").modal('show');
                }
                //utag error
                if (dataFromJson.apiSignature.error.utag != undefined) {
                    this.createutag('ajaxError','button');
                }
            }
        });
    }

    // OnClick Events 
    // validate form data using parsley
    validate_form(data) {
        var form = $(data).parsley({
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden], input:hidden, select:hidden"
        });
        form.validate();
        if (form.isValid()) {
            return true;
        }
        return false;
    }

    // this function will add the disabled attribute
    disabledFunc(data) {
        $(data).attr("disabled", "disabled");
    }

    // this function will remove the disabled attribute
    enabledFunc(data) {
        $(data).removeAttr("disabled");
    }

    // this function will hide the class
    hideFunc(data) {
        $(data).addClass('hide');
    }

    // this function will show the hidden class 
    showFunc(data) {
        $(data).removeClass('hide');
    }

    // this function will provide animation  
    animateFunc(data) {
        $(data.target).animate(data.prop, data.duration);
    }

    actionOnButton(bt) {
        this.createutag(bt.name, 'button')
        if (bt.action != undefined) {
            var act = bt.action;
            const arr = []
            Object.keys(act).forEach(key => arr.push({ name: key, value: act[key] }))
            for (let idx in arr) {
                const key = arr[idx].name;
                const data = arr[idx].value;
                if (key === "validate_form") {
                    var val = this.validate_form(data);
                    if (val == false) {
                        break;
                    }
                }
                else if (key === "utag") {
                    this.createutag(data, 'button')
                }
                else if (key === "disabled") {
                    data.forEach(value => {
                        this.disabledFunc(value);
                    });
                }
                else if (key === "hide") {
                    data.forEach(value => {
                        this.hideFunc(value);
                    });
                }
                else if (key === "show") {
                    data.forEach(value => {
                        this.showFunc(value);
                    });
                }
                else if (key === "animate") {
                    this.animateFunc(data);
                }
                else if (key === "enabled") {
                    data.forEach(value => {
                        this.enabledFunc(value);
                    });
                }
                else if (key === "api") {
                    this.submitForm(bt);
                }
            }
        }
    }

    dateChanged(d, name) {
        if (d != null) d = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
        this.setState({
            [name]: d,
            reactDatepickValue: d
        });
        this.createutag(name, 'datepicker', d);
    }

    handleChange(event) {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        });
        if (event.target.list !== undefined && event.target.list !== null) {
            var arr = event.target.list.options;
            for (let att in arr) {
                if (arr[att].value === event.currentTarget.value && event.currentTarget.value !== '') {
                    this.setState({ d2N_provience2: arr[att].getAttribute('data-attr') })
                    this.createutag('d2N_provience2', 'dynamictext', arr[att].getAttribute('data-attr'));
                    this.createutag(event.currentTarget.name, 'datalist', event.currentTarget.value);
                    break;
                }
            }            
        }
        if (event.target[event.target.selectedIndex] != undefined && event.target[event.target.selectedIndex].getAttribute('data-attr') != ''
            && event.target[event.target.selectedIndex].getAttribute('data-attr') != null) {
            this.setState({ d2N_provience2: event.target[event.target.selectedIndex].getAttribute('data-attr') })
            this.createutag('d2N_provience2', 'dynamictext', event.target[event.target.selectedIndex].getAttribute('data-attr'));
        }
        if (event.target.type === 'checkbox' && $('#checkboxCount') != undefined && $('#checkboxCount').val() > 0) {
            this.checkBoxValidation(event.target.checked, $('#checkboxCount').attr('target'), $('#checkboxCount').val());
        }
        if (event.target.type === 'checkbox' || event.target.type === 'radio' || event.target.type === 'select-one') {
            this.createutag(event.currentTarget.name, event.target.type);
        }
    }

    checkBoxValidation(status, id, val) {
        if (status) {
            this.setState({ uniquecount: this.state.uniquecount + 1 });
            if (this.state.uniquecount === val || this.state.uniquecount === val - 1) {
                $('#' + id).removeClass("disabled");
            }
        }
        else {
            this.setState({ uniquecount: this.state.uniquecount - 1 });
            $('#' + id).addClass("disabled");
        }
    }

    createutag(event, type, text) {
        var utag = this.state.dataArr.utag;
        utag.map(key => {
            if (key.name === event) {
                if (key.ev_data_two != undefined) {
                    var data2Value = key.ev_data_two;
                    const array = data2Value.split(":");
                    for (let idx in array) {
                        const val = array[idx]
                        if (val === "ev_data_two_breadcrum") {
                              var productName = $(".titlebar .cmp-title__text").text().replace(/ /g, " ");
                            data2Value = data2Value.replace('ev_data_two_breadcrum', productName);
                        }
                        else {
                            const subVal = val.split(".");
                            if (type === 'radio') {
                                var radioLabel = $("input[name=" + subVal[0] + "]:checked + label").text();
                                data2Value = data2Value.replace(val, radioLabel);
                            }
                            else if (type === 'datepicker') {
                                var dateValue = this.convertDate(text);
                                dateValue = dateValue.substring(0, dateValue.indexOf('T'))
                                data2Value = data2Value.replace(val, dateValue);
                            }
                            else if (type === "dynamictext") {
                                data2Value = data2Value.replace(val, text);
                            }
                            else if(type === "datalist"){
                                data2Value = data2Value.replace(val, text);
                            }else if(type === "button"){
                                data2Value = data2Value.replace(val, $("#"+subVal[0]).val());
                            }
                            else {
                                data2Value = data2Value.replace(val, $('select[name=' + subVal[0] + '] option:selected').html());
                            }
                        }
                    }
                    this.utagLink(key.ev_type, key.ev_action, key.ev_title, key.ev_data_one, data2Value);
                }
                else {
                    if (key.ev_data_one == undefined) {
                        this.utagLink(key.ev_type, key.ev_action, key.ev_title);
                    }
                    else {
                        this.utagLink(key.ev_type, key.ev_action, key.ev_title, key.ev_data_one);
                    }
                }
            }
        })
    }

    render() {
        var data = this.state.dataArr
        var section = data.form != undefined ? data.form.section : undefined;
        var buttonDt = data.form != undefined ? data.form.buttons : undefined;
        var display = data.form != undefined ? data.form.display : undefined;
        var errorMsg = data.apiSignature != undefined ? data.apiSignature.error.errorMsg : undefined;
        return (
            <>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 dynamic-form">
                    {this.props.form == "true" &&
                        <form className={display} id="dynamic-form-display">
                            <fieldset>
                                {section != undefined && section.map(sec => {
                                    if (sec.headingTitle != null && sec.input_type != null) {
                                        return (
                                            <div>
                                                <div key={sec.headingTitle}><h2 className={sec.headingCss}>{sec.headingTitle}</h2></div>
                                                { sec.input_type.map(inputTypeArr => {
                                                    return (<>
                                                        { inputTypeArr.rows.map(rowsArr => {
                                                            return (
                                                                <div className="row">
                                                                    { rowsArr.values.map(values => {
                                                                        if (values.required === undefined && values.name != undefined && !notReq.includes(values.name)) {
                                                                            notReq.push(values.name)
                                                                        }
                                                                        if (values.type === "radio") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <Radio group={values.group} key={values.group} disabled={values.disabled} id1={values.firstId} id2={values.secondId} value1={values.firstv} value2={values.secondv}
                                                                                        dataParsleyRequiredMessage={values.dataParsleyRequiredMessage} required={values.required}
                                                                                        name1={values.firstn} name2={values.secondn} handleChange={this.handleChange} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "text") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <Text name={values.name} placeholder={values.placeholder} value={values.value} disabled={values.disabled}
                                                                                        key={values.name} maxlength={values.maxlength} required={values.required} handleChange={this.handleChange}
                                                                                        dataParsleyRequiredMessage={values.dataParsleyRequiredMessage} dataParsleyPattern={values.dataParsleyPattern}
                                                                                        dataParsleyPatternMessage={values.dataParsleyPatternMessage} dataParsleyMinlength={values.dataParsleyMinlength}
                                                                                        dataParsleyMinlengthMessage={values.dataParsleyMinlengthMessage} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "textarea") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <Textarea name={values.name} placeholder={values.placeholder} value={values.value} disabled={values.disabled}
                                                                                        key={values.name} maxlength={values.maxlength} required={values.required} handleChange={this.handleChange}
                                                                                        dataParsleyRequiredMessage={values.dataParsleyRequiredMessage} dataParsleyPattern={values.dataParsleyPattern}
                                                                                        dataParsleyPatternMessage={values.dataParsleyPatternMessage} dataParsleyMinlength={values.dataParsleyMinlength}
                                                                                        dataParsleyMinlengthMessage={values.dataParsleyMinlengthMessage} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "email") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <Email name={values.name} placeholder={values.placeholder} key={values.name} disabled={values.disabled} maxlength={values.maxlength}
                                                                                        required={values.required} handleChange={this.handleChange} dataParsleyRequiredMessage={values.dataParsleyRequiredMessage}
                                                                                        dataParsleyPattern={values.dataParsleyPattern} dataParsleyPatternMessage={values.dataParsleyPatternMessage}
                                                                                        dataParsleyMinlength={values.dataParsleyMinlength} dataParsleyMinlengthMessage={values.dataParsleyMinlengthMessage} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "textdynamic") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <input className="form-control" type="text" id={values.name} name={values.name} disabled={values.disabled}
                                                                                        value={this.state.d2N_provience2} placeholder={values.placeholder} onChange={this.handleChange} maxlength={values.maxlength}
                                                                                        data-parsley-pattern={values.dataParsleyPattern} data-parsley-pattern-message={values.dataParsleyPatternMessage}
                                                                                        data-parsley-required-message={values.dataParsleyRequiredMessage} required={values.required}
                                                                                        data-parsley-minlength={values.dataParsleyMinlength} data-parsley-minlength-message={values.dataParsleyMinlengthMessage} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "dropdown") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <Dropdown name={values.name} val={values.values} required={values.required} disabled={values.disabled} key={values.name}
                                                                                        dataParsleyRequiredMessage={values.dataParsleyRequiredMessage} handleChange={this.handleChange} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "datalist") {
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <Datalist name={values.name} val={values.values} required={values.required} disabled={values.disabled} key={values.name}
                                                                                        dataParsleyRequiredMessage={values.dataParsleyRequiredMessage} handleChange={this.handleChange} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "datepicker") {
                                                                            var dateID = values.id;
                                                                            var maxDateFunc
                                                                            if (values.dateRange === "inYears") maxDateFunc = subYears(new Date(), values.endDate)
                                                                            else maxDateFunc = subDays(new Date(), values.endDate);
                                                                            return (
                                                                                <div className={values.css}>
                                                                                    <label for={values.name}>{values.label}</label>
                                                                                    <DatePicker selected={this.state[dateID]} required={values.required} id={dateID} className="form-control" showYearDropdown
                                                                                        showMonthDropdown popperPlacement="bottom-left" disabled={values.disabled}
                                                                                        dateFormat="dd/MM/yyyy" minDate={subYears(new Date(), values.startDate)} maxDate={maxDateFunc}
                                                                                        dropdownMode="select" onCalendarClose={function () { $('#' + dateID).parsley().validate(); }}
                                                                                        customInput={<input type="text" data-parsley-required-message={values.dataParsleyRequiredMessage} />}
                                                                                        onChange={(date) => { this.dateChanged(date, values.id) }} />
                                                                                </div>
                                                                            );
                                                                        }

                                                                        else if (values.type === "checkbox") {
                                                                            return (
                                                                                <div className={values.css} id={values.id}>
                                                                                    <Checkbox key={values.name} label_div_id={values.label_div_id} name={values.name} handleChange={this.handleChange}
                                                                                        html={values.html} label={values.label} />
                                                                                </div>
                                                                            );
                                                                        }
                                                                        else if (values.type === "other") {
                                                                            return (
                                                                                <div className={values.css} dangerouslySetInnerHTML={{ __html: values.html }} />
                                                                            );
                                                                        }
                                                                        else if (values.type === "hidden") {
                                                                            return (
                                                                                <Hidden name={values.name} handleChange={this.handleChange} value={values.value} target={values.targets} />
                                                                            );
                                                                        }
                                                                    })
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                        }
                                                    </>);

                                                })}

                                            </div>
                                        );
                                    }

                                })
                                }
                            </fieldset>
                            <div className="col-xs-12 col-sm-12 mar-top-24">
                                {
                                    buttonDt != undefined && buttonDt.map(bt => {
                                        return (<Button id={bt.id} label={bt.label} css={bt.css} onClick={() => { this.actionOnButton(bt) }} />);
                                    })
                                }
                            </div>
                        </form>
                    }
                </div>
                <Modal errorMsg={errorMsg} />
            </>
        )
    }
}
reactComponents["dynamic-form"] = DynamicForm;
