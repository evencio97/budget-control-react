import React from 'react';
import './Expense.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Expense({ id, name, amount, currency="$", iconName="trash-alt", remove }) {  
    return (
        <li className="expense text-left animated fadeIn">
            <p>
                {name}
                <span>{currency+amount}</span>
                <button type="button" className="btn btn-danger" onClick={() => remove(id)}>
                    <FontAwesomeIcon icon={iconName} />
                </button>
            </p>
        </li>
    );
}

Expense.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string,
    iconName: PropTypes.string,
    remove: PropTypes.func.isRequired,
}

export default Expense;