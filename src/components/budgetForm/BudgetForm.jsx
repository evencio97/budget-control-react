import React from 'react';
import './BudgetForm.css';
import Input from '../input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import $ from 'jquery';

function BudgetForm({ title= "Enter Your Budget", columns= "col-12", currency="$", setBudget, addAlert }) {
    var tempBudget = null;

    const initForm = () => {
        tempBudget = null;
        $('#budgetForm').trigger("reset");
    }

    const initBudget = (event) => {
        event.preventDefault();
        
        // console.log(tempBudget);
        if (!tempBudget){
            return addAlert({ type: 'Error', message: 'The budget is invalid.' });
        }
        setBudget( Math.round(tempBudget*100)/100 );
        addAlert({ class: 'alert-success',type: 'Success', message: 'The budget have been added.' });
        initForm();
    };

    const setBudgetInput = value => { tempBudget = parseFloat(value); };
    const valBudgetInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        let temp = parseFloat(value);
        if (!temp || temp <= 0) return true;
        
        return false;
    }

    return (
        <div className={columns+" text-center animated fadeIn"}>
            <h2>{title}</h2>
            <form className="text-left" id="budgetForm" onSubmit={(e) => initBudget(e)}>
                <div className="form-row">
                    <div className="form-group col-8 budget-form-group">
                        <Input type="text" id="input-budget" name="budget" placeholder="Budget for the week"
                            className="left-input" autoComplete="off" prepend={currency}
                            setValue={setBudgetInput} valValue={valBudgetInput} />
                        <button type="submit" className="btn btn-success submit-button">
                            <FontAwesomeIcon icon="check" /> Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

BudgetForm.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.string,
    currency: PropTypes.string,
    setBudget: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default BudgetForm;