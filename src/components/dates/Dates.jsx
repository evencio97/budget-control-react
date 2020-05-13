import React from 'react';
import './Dates.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Dates({ title= 'Dates List', columns= 'col-6', titles= ['Date', 'Time', 'CI', 'Name', 'Delete']
                , dates, setDates, addAlert }) {

    const removeDate = id => {
        if (!dates.length) return addAlert({ type: 'Error', message: 'The dates list is empty.' });
        let datesList = dates.filter(date => date.id !== id);
        if (dates.length === datesList.length) return addAlert({ type: 'Error', message: "Can't find the selected date." });

        setDates(datesList);
        addAlert({ class: 'alert-success', type: 'Success', message: 'The date have been removed.' });
    };

    const datesList = dates.map(date => (
        <tr key={'date-' + date.id}>
            <td>{date.date}</td>
            <td>{date.time}</td>
            <td>{date.ciType+'-'+date.CI}</td>
            <td>{date.name+' '+date.lastname}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => removeDate(date.id)}>
                    <FontAwesomeIcon icon="trash-alt" />
                </button>
            </td>
        </tr>
    ));

    return (
        <div className={columns+" text-center"}>
            <h2 className="section-title">{title}</h2>
            { dates.length?
                <div className="table-responsive text-nowrap">
                    <table className="table table-hover table-striped text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">{titles[0]}</th>
                                <th scope="col">{titles[1]}</th>
                                <th scope="col">{titles[2]}</th>
                                <th scope="col">{titles[3]}</th>
                                <th scope="col">{titles[4]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datesList}
                        </tbody>
                    </table>
                </div>
            :
                <div className="alert alert-warning" role="alert">The dates list is empty, please add a new date!</div>
            }
        </div>
    );
}

Dates.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.string,
    titles: PropTypes.array,
    dates: PropTypes.array.isRequired,
    setDates: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired
}

export default Dates;