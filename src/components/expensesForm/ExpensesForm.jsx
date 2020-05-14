import React from 'react';
import './ExpensesForm.css';
import Input from '../input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import $ from 'jquery';

function ExpensesForm({ title= "Enter Your Expense", currency="$", budget,
                        totalExpense, setTotalExpenses, expensesList, setExpensesList, addAlert }) {
    var tempExpense = {name: null, amount: 0};
    
    const initForm = () => {
        tempExpense = {name: null, amount: 0};
        $('#expensesForm').trigger("reset");
    }

    const addExpense = (event) => {
        event.preventDefault();
        
        if (!tempExpense.name || !tempExpense.amount) return addAlert({ type: 'Error', message: 'The expense is invalid.' });
        // if ((tempExpense.amount+totalExpense) > budget) return addAlert({ type: 'Error', message: "Don't have enough budget." });
        tempExpense.id = uuid();
        tempExpense.amount = Math.round(tempExpense.amount*100)/100;
        setExpensesList([ ...expensesList, tempExpense ]);
        setTotalExpenses( totalExpense+tempExpense.amount );
        addAlert({ class: 'alert-success',type: 'Success', message: 'The expense have been added.' });
        initForm();
    };

    const setExpenseNameInput = value => { tempExpense.name = value; };
    const valExpenseNameInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        return false;
    }

    const setExpenseAmountInput = value => { tempExpense.amount = parseFloat(value); };
    const valExpenseAmountInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        let temp = parseFloat(value);
        if (!temp || temp <= 0) return true;
        if ((temp+totalExpense) > budget) return true;
        
        return false;
    }

    return (
        <div className={"text-center animated fadeIn"}>
            <h2>{title}</h2>
            { budget > totalExpense ?
                <form className="text-left" id="expensesForm" onSubmit={(e) => addExpense(e)}>
                    <div className="form-group">
                        <Input type="text" id="input-expense-name" name="expenseName" placeholder="Your expense name"
                            autoComplete="off" setValue={setExpenseNameInput} valValue={valExpenseNameInput} />
                    </div>
                    <div className="form-group">
                        <Input type="text" id="input-expense-amount" name="expenseAmount" placeholder="Your expense amount"
                            autoComplete="off" setValue={setExpenseAmountInput} valValue={valExpenseAmountInput} prepend={currency} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success submit-button">
                            <FontAwesomeIcon icon="plus" /> Add
                        </button>
                    </div>
                </form>
            :
                <div className="alert alert-warning" role="alert">You can't add more expenses!</div>
            }
        </div>
    );
}

ExpensesForm.propTypes = {
    title: PropTypes.string,
    currency: PropTypes.string,
    budget: PropTypes.number.isRequired,
    totalExpense: PropTypes.number.isRequired,
    setTotalExpenses: PropTypes.func.isRequired,
    expensesList: PropTypes.array.isRequired,
    setExpensesList: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default ExpensesForm;