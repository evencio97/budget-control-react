import React from 'react';
import './Input.css';
import PropTypes from 'prop-types';
import $ from 'jquery';

function Input({ type="text", id, name="", placeholder="", className="",
                 errorMsg="Please check the info introduce.", setValue, valValue=((aux)=> false) }) {
    // var tempBudget = 0;
    var inputMsgId = id+"-error";
    
    const changeValue = e => {
        let temp = e.target.value;
        let error = valValue(temp);

        if (temp.length && (temp.trim().length === 0 || error)){
            $("#"+inputMsgId).fadeIn();
            return $('#'+id).addClass("input-error");
        }
        // console.log(temp);
        $("#"+inputMsgId).fadeOut();
        $("#"+id).removeClass("input-error");
        setValue(temp);
    }

    return (
        <div className={"text-left"+(className.length? " "+className:"")} style={{width: "inherit"}}>
            <input type={type} className="form-control" id={id} name={name} 
                placeholder={placeholder} onChange={changeValue} />
            <small className="input-error-msg" id={inputMsgId}>{errorMsg}</small>
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    errorMsg: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    valValue: PropTypes.func,
}

export default Input;