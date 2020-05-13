import React from 'react';
import './BudgetControl.css';
import { checkRemaining } from '../../helpers'
import PropTypes from 'prop-types';

function BudgetControl({ currency="$", budget, remaining }) {
    
    return (
        <div className="row animated fadeIn" style={{paddingTop: "2em"}}>
            <div className="col-6">
                <div className="alert alert-primary" id="budget-display">Budget: {currency+budget}.</div>
            </div>
            <div className="col-6">
                <div className={"alert "+(checkRemaining(budget, remaining))} id="remaining-display">Remaining budget: {currency+remaining}</div>
            </div>
        </div>
    );
}

BudgetControl.propTypes = {
    currency: PropTypes.string,
    budget: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
}

export default BudgetControl;