import React from 'react'

const SpinnerWidget = (props) => {
    let { color } = props

    return (
        <div className={`d-flex justify-content-center ${color ? `text-${color}` : `text-success`}`}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden" aria-hidden="true"></span>
            </div>
        </div >
    )
}

export default SpinnerWidget;