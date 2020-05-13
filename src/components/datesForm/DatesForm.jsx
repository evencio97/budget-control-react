import React from 'react';
import './DatesForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

function DatesForm({ title= "Add Date", columns= "col-6", dates, setDates, addAlert }) {

    var currentDate = {
        id:"", name: "", lastname: "", ciType: "V", CI: "",
        sex: "Male", date: "", time: "", symptoms: ""
    };

    const initForm = () => {
        currentDate = {
            id:"", name: "", lastname: "", ciType: "V", CI: "",
            sex: "Male", date: "", time: "", symptoms: ""
        };
        document.getElementById("dateForm").reset();
    }

    const valForm = () => {
        // console.log(currentDate);
        if (!currentDate.name.trim().length) return 'name';
        if (!currentDate.lastname.trim().length) return 'lastname'; 
        if (currentDate.ciType !== 'V' && currentDate.ciType !== 'E') return 'ciType';
        try {
            if (!currentDate.CI.trim().length || parseInt(currentDate.CI) < 0) return 'CI';
        } catch(err) { return 'CI'; }
        if (currentDate.sex !== 'Male' && currentDate.sex !== 'Female' && currentDate.sex !== 'Other') return 'sex';
        try {
            if (!currentDate.date.trim().length || (new Date(currentDate.date)) <= (new Date())) return 'date';
        } catch(err) { return 'date'; }
        if (!currentDate.time.trim().length) return 'time';
        if (!currentDate.symptoms.trim().length) return 'symptoms';
        return null;
    };

    const addDate = (event) => {
        event.preventDefault();
        
        let error = valForm();
        if (error !== null){
            document.getElementById('input-'+error).classList.add("input-error");
            return addAlert({ type: 'Error', message: 'The '+error+' is invalid.' });
        }
        currentDate.id = uuid();
        setDates([ ...dates, currentDate ]);
        addAlert({ class: 'alert-success',type: 'Success', message: 'The date have been added.' });
        initForm();
    };
    
    const updateState = e => {
        document.getElementById("input-"+e.target.name).classList.remove("input-error");
        currentDate[e.target.name]= e.target.value;
        // console.log(currentDate);
    }

    return (
        <div className={columns+" text-center"}>
            <h2 className="section-title">{title}</h2>
            <form className="text-left" id="dateForm" onSubmit={(e) => addDate(e)}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" className="form-control" id="input-name" name="name" 
                            placeholder="Name" onChange={updateState}/>
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text" className="form-control" id="input-lastname" name="lastname" 
                            placeholder="LastName" onChange={updateState}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="input-group">
                            <div className="prepend-input">
                                <select id="input-ciType" name="ciType" className="form-control" onChange={updateState}>
                                    <option value="V" defaultValue>V</option>
                                    <option value="E">E</option>
                                </select>
                            </div>
                            <input type="number" className="form-control" id="input-CI" name="CI"
                                placeholder="CI" onChange={updateState}/>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <select id="input-sex" name="sex" className="form-control" placeholder="Sex" onChange={updateState}>
                            <option value="Male" defaultValue>Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="date" className="form-control" id="input-date" 
                            name="date" onChange={updateState}/>
                    </div>
                    <div className="form-group col-md-6">
                        <input type="time" className="form-control" id="input-time" 
                            name="time" onChange={updateState}/>
                    </div>
                </div>
                <div className="form-group">
                    <textarea className="form-control" id="input-symptoms" name="symptoms" 
                        placeholder="Symptoms" onChange={updateState}></textarea>
                </div>
                <div className="text-center" style={{marginTop: '20px'}}>
                    <button type="submit" className="btn btn-success submit-button">
                        <FontAwesomeIcon icon="check" /> Create
                    </button>
                </div>
            </form>
        </div>
    );
}

DatesForm.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.string,
    dates: PropTypes.array.isRequired,
    setDates: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default DatesForm;