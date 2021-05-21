import React from 'react';
import { Login, Header } from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {history} from './helper/history'

const App = () => {
    return <Router history={history}>
        <Header />
        <Switch>
            <Route exact path="/" component={Login} />
        </Switch>
    </Router>
}

export default App