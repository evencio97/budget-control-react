import React from 'react';
import './Alerts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import $ from 'jquery';

function Alerts({ alerts, setAlerts }) {
    // { id: , class: '', type: '', message: '' }
    
    const closeAlert = id => {
        let aleId = "#ale-"+id;
        let newAlerts = alerts.filter(alert => alert.id !== id);
        $(aleId).removeClass("fadeInRight");
        $(aleId).slideUp(500);
        $(aleId).addClass("fadeOutRight");
        $(aleId).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
            (() => setAlerts(newAlerts)));
    };

    if (!alerts.length) return (null);
    
    return (
        <div className="alertsColumn">
            {alerts.map(alert => (
                <div key={"ale-"+alert.id} id={"ale-"+alert.id} className={"alert alert-dismissible faster animated fadeInRight " + (alert.class ? alert.class : 'alert-danger')} 
                    role="alert" onClick={() => closeAlert(alert.id)}>
                    <strong>{alert.type ? alert.type + '! ' : ''}</strong>{alert.message}
                    <button type="button" className="close">
                        <FontAwesomeIcon icon="times-circle" />
                    </button>
                </div>    
            ))}
        </div>
    );
};

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired,
    setAlerts: PropTypes.func.isRequired,
}

export default Alerts;
