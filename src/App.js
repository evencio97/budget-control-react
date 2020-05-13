import React, { Fragment, useState, useEffect } from 'react';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
//Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Alerts from './components/alerts/Alerts';
// import Dates from './components/dates/Dates';
import BudgetForm from './components/budgetForm/BudgetForm';

//FontAwesome library
library.add(fab, faTimesCircle, faTrashAlt, faCheck);
//Number of active alerts
sessionStorage.setItem("numAlerts", 0);

function App() {
    // Budget State
    const [budget, setBudget] = useState(0);
    // Alerts State
    const [alerts, setAlerts] = useState([]);
    const addAlert = newAlert => {
        let numAlerts = parseInt(sessionStorage.getItem("numAlerts")) + 1;
        sessionStorage.setItem("numAlerts", numAlerts);
        newAlert.id = numAlerts;
        setAlerts([...alerts, newAlert]);
    };

    return (
        <Fragment>
            <Header img="/logo.png" name="Weekly Expense" link="https://evenciohernandez.com.ve" />
            <div className="container main-content" id="content">
                <div className="row">
                    <BudgetForm setBudget={setBudget} addAlert={addAlert} />
                    {/* <Dates dates={dates} setDates={setDates} addAlert={addAlert} /> */}
                </div>
            </div>
            <Alerts alerts={alerts} setAlerts={setAlerts} />
            <Footer />
        </Fragment>
    );
}

export default App;
