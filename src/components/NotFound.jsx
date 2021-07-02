import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
    return <div className="center-container">
        <section className="content">
            <div className="container-fluid text-center" >
                <div className="error-page" >
                    <h2 className="headline text-warning"> 404</h2>

                    <div className="error-content">
                        <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

                        <p>
                            We could not find the page you were looking for.
                            Meanwhile, you may <Link to="/">return to dashboard</Link > or try using the search form.
                        </p>
                    </div>
                    <div className="btn-group">
                        <button onClick={() => props.history.push('/home')} className="btn" style={{ backgroundColor: '#00C48D', color: '#fff' }}>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default NotFound