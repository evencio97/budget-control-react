import React from 'react';
import './Input.css';
import PropTypes from 'prop-types';
import $ from 'jquery';

function Input({ label=null, prepend=null, type="text", id, name="", placeholder="", className="",
                 errorMsg="Please check the info introduce.", autoComplete="on", 
                 setValue, valValue=((aux)=> false) }) {
    
    var inputMsgId = id+"-error";
    
    const initInput = id => {
        $("#"+id).removeClass("is-invalid");
        $("#"+id).removeClass("is-valid");
    }

    const changeValue = e => {
        let temp = e.target.value;

        if (valValue(temp)){
            $("#"+inputMsgId).fadeIn();
            return $('#'+id).addClass("is-invalid");
        }
        $("#"+inputMsgId).fadeOut();
        $("#"+id).removeClass("is-invalid");
        if( (type !== "text" && temp) || (type==="text" && temp.trim().length) ) $('#'+id).addClass("is-valid");
        else $('#'+id).removeClass("is-valid");
        setValue(temp);
    }

    return (
        <div className={"text-left"+(className.length? " "+className:"")} style={{width: "inherit"}}>
            {label? <label htmlFor={id}>{label}</label>:null}
            { prepend?
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{prepend}</span>
                    </div>
                    <input type={type} className="form-control" id={id} name={name} 
                        placeholder={placeholder} onChange={changeValue} 
                        onReset={initInput(id)} autoComplete={autoComplete}/>
                </div>
            :
                <input type={type} className="form-control" id={id} name={name} 
                    placeholder={placeholder} onChange={changeValue} 
                    onReset={initInput(id)} autoComplete={autoComplete}/>
            }
            <small className="input-error-msg" id={inputMsgId}>{errorMsg}</small>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    prepend: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    errorMsg: PropTypes.string,
    autoComplete: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    valValue: PropTypes.func,
}

export default Input;