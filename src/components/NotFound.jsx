import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return <section className="content">
        <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>

            <div className="error-content">
                <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

                <p>
                    We could not find the page you were looking for.
                    Meanwhile, you may <Link to="/">return to dashboard</Link > or try using the search form.
                </p>
            </div>
        </div>
    </section>
}

export default NotFound