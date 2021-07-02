import { Router } from "react-router-dom";
import "./styles/App.css";
import "./styles/custom.css"
import { history } from './helper/history'
import Routes from "./routes/Routes";

function App(props) {
    return (
        <Router history={history}>
            <Routes {...props} />
        </Router>
    );
}

export default App;
