import React from 'react'
import PropTypes from 'prop-types'

function Alert({alert}) {
    return (
        alert !== null && <div className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle" /> {alert.msg}
        </div>
    )
}

Alert.propTypes = {
    alert: PropTypes.object.isRequired
}

export default Alert
