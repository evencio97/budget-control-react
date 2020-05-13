import React from 'react';
import './BudgetForm.css';
import Input from '../input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function BudgetForm({ title= "Put Your Budget", columns= "col-12", setBudget, addAlert }) {
    var tempBudget = null;

    const initBudget = (event) => {
        event.preventDefault();
        
        // console.log(tempBudget);
        if (!tempBudget){
            return addAlert({ type: 'Error', message: 'The budget is invalid.' });
        }
        setBudget( tempBudget );
        addAlert({ class: 'alert-success',type: 'Success', message: 'The date have been added.' });
    };

    const setBudgetInput = value => { tempBudget = value; };
    const valBudgetInput = value => {
        let error = false;
        let temp = 0;
        try {
            temp = parseInt(value);
            if (!temp || temp <= 0) error = true;
        } catch(err) { error = true; }
        
        return error;
    }

    return (
        <div className={columns+" text-center"}>
            <h2>{title}</h2>
            <form className="text-left" id="budgetForm" onSubmit={(e) => initBudget(e)}>
                <div className="form-row">
                    <div className="form-group col-8 budget-form-group">
                        <Input type="text" id="input-budget" name="budget" placeholder="Budget for the week"
                            className="left-input" setValue={setBudgetInput} valValue={valBudgetInput} />
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
    setBudget: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default BudgetForm;