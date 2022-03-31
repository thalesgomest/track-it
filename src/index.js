import reactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from 'react-router-dom';


reactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
document.querySelector(".root"))