import { Routes, Route, useLocation} from "react-router-dom";
import { useState, useEffect} from "react";


import UserContext from "../contexts/UserContext";
import SignUpPage from "./SignUpPage";
import Habits from "./Habits";
import LoginPage from "./LoginPage";
import Today from "./Today";
import Header from "./Header";
import Menu from "./Menu";

import "./../css/reset.css"
import "./../css/style.css"


function App() {

    const [user, setUser] = useState(
        localStorage.getItem('userdata')
            ? JSON.parse(localStorage.getItem('userdata'))
            : null
    );

    const [completedHabits, setCompletedHabits] = useState(0);
    const location = useLocation();


    return (
            <UserContext.Provider value={{user, setUser, completedHabits, setCompletedHabits}}>
                {!(
                    location.pathname === '/' ||
                    location.pathname === '/cadastro'
                ) ? (
                    <>
                        <Header />
                        <Menu />
                    </>
                ) : (
                    <></>
                )}
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route path="/cadastro" element={<SignUpPage />}></Route>
                    <Route path="/habitos" element={<Habits />}></Route>
                    <Route path="/hoje" element={<Today />}></Route>
                    {/* <Route path="/historico" element={<DataHistory />}></Route> */}
                </Routes>
            </UserContext.Provider>
    );
}

export default App;
