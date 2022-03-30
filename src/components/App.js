import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

import "./../css/reset.css"
import "./../css/style.css"

function App() {
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/cadastro" element={<SignUpPage />}></Route>
                {/* <Route path="/habitos" element={<Habits />}></Route> */}
                {/* <Route path="/hoje" element={<Today />}></Route> */}
                {/* <Route path="/historico" element={<DataHistory />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;