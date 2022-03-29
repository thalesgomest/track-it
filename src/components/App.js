import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginScreen from "./LoginScreen";

import "./../css/reset.css"
import "./../css/style.css"

function App() {
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<LoginScreen />}></Route>
                {/* <Route path="/cadastro" element={<RegistrationScreen />}></Route> */}
                {/* <Route path="/habitos" element={<Habits />}></Route> */}
                {/* <Route path="/hoje" element={<Today />}></Route> */}
                {/* <Route path="/historico" element={<DataHistory />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;