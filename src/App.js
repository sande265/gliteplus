import { Router } from "react-router-dom";
import Header from "./components/Header";
import "./styles/App.css";
import "./styles/custom.css"
import { history } from './helper/history'
import Routes from "./components/Routes";

function App(props) {
    return (
        <Router history={history}>
            <Header />
            <Routes {...props} />
        </Router>
    );
}

export default App;
