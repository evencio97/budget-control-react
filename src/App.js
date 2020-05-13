import React, { Fragment, useState } from 'react';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle, faTrashAlt, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
//Components
import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
import Alerts from './components/alerts/Alerts';
import BudgetForm from './components/budgetForm/BudgetForm';
import ExpensesForm from './components/expensesForm/ExpensesForm';
import ExpensesList from './components/expensesList/ExpensesList';
import BudgetControl from './components/budgetControl/BudgetControl';

//FontAwesome library
library.add(fab, faTimesCircle, faTrashAlt, faCheck, faPlus);
//Number of active alerts
sessionStorage.setItem("numAlerts", 0);

function App() {
    // Budget State
    const [budget, setBudget] = useState(0);
    // Total Expense State
    const [totalExpense, setTotalExpenses] = useState(0);
    // Expenses List State
    const [expensesList, setExpensesList] = useState([]);
    // Alerts State
    const [alerts, setAlerts] = useState([]);
    const addAlert = newAlert => {
        let numAlerts = parseInt(sessionStorage.getItem("numAlerts")) + 1;
        sessionStorage.setItem("numAlerts", numAlerts);
        newAlert.id = numAlerts;
        setAlerts([...alerts, newAlert]);
    };
    // Currency symbol
    var currency = "$";

    return (
        <Fragment>
            <Header img="/logo.png" name="Weekly Expense" link="https://evenciohernandez.com.ve" />
            <div className="container main-content" id="content">
                <div className="row">
                    { budget < 1? 
                        <BudgetForm currency={currency} setBudget={setBudget} addAlert={addAlert} />
                    :
                        <Fragment>
                            <div className="col-md-6">
                                <ExpensesForm currency={currency} budget={budget} totalExpense={totalExpense}
                                    setTotalExpenses={setTotalExpenses} expensesList={expensesList} 
                                    setExpensesList={setExpensesList} addAlert={addAlert} />
                                <BudgetControl budget={budget} remaining={budget-totalExpense} currency={currency} />
                            </div>
                            <ExpensesList currency={currency} totalExpense={totalExpense} setTotalExpenses={setTotalExpenses}
                                expensesList={expensesList} setExpensesList={setExpensesList} addAlert={addAlert} />
                        </Fragment>
                    }
                </div>
            </div>
            <Alerts alerts={alerts} setAlerts={setAlerts} />
            {/* <Footer /> */}
        </Fragment>
    );
}

export default App;
