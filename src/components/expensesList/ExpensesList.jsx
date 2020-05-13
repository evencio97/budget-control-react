import React from 'react';
import './ExpensesList.css';
import Expense from '../expense/Expense';
import PropTypes from 'prop-types';

function ExpensesList({ title= "Your Expenses", columns= "col-md-6", currency="$",
                        totalExpense, setTotalExpenses, expensesList, setExpensesList, addAlert }) {
    
    const removeExpense = id => {
        if (!expensesList.length) return addAlert({ type: 'Error', message: 'The expenses list is empty.' });
        let tempExpense = expensesList.find(expense => expense.id === id);
        let tempExpensesList = expensesList.filter(expense => expense.id !== id);
        if (tempExpense && tempExpense.amount && expensesList.length === tempExpensesList.length) return addAlert({ type: 'Error', message: "Can't find the selected expense." });
        setExpensesList(tempExpensesList);
        setTotalExpenses( totalExpense-tempExpense.amount );
        addAlert({ class: 'alert-success', type: 'Success', message: 'The expense have been removed.' });
    };
    
    return (
        <div className={columns+" text-center expenses-make animated fadeIn"}>
            <h2>{title}</h2>
            { expensesList.length?
                expensesList.map(expense => (
                    <Expense key={expense.id} id={expense.id} name={expense.name} currency={currency}
                        amount={expense.amount} remove={removeExpense} />
                ))
            :
                <div className="alert alert-warning" role="alert">The expense list is empty, please add a new expense!</div>
            }
        </div>
    );
}

ExpensesList.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.string,
    currency: PropTypes.string,
    totalExpense: PropTypes.number.isRequired,
    setTotalExpenses: PropTypes.func.isRequired,
    expensesList: PropTypes.array.isRequired,
    setExpensesList: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default ExpensesList;