import { Routes, Route, useLocation} from "react-router-dom";
import { useState, useEffect} from "react";


import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import SignUpPage from "./SignUpPage";
import Habits from "./Habits";
import LoginPage from "./LoginPage";
import Today from "./Today";
import Header from "./Header";
import Menu from "./Menu";

import "./../css/reset.css"
import "./../css/style.css"


function App() {

    const [tokenContext, setTokenContext] = useState({token: ""});
    const [userContext, setUserContext] = useState({name: "", email: "", image: ""})
    const [completedTasks, setCompletedTasks] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('userdata')) {
            setUserContext({
                name: JSON.parse(localStorage.getItem('userdata')).name,
                email: JSON.parse(localStorage.getItem('userdata')).email,
                image: JSON.parse(localStorage.getItem('userdata')).image
            });
            setTokenContext({token: JSON.parse(localStorage.getItem('userdata')).token});
        }
    }, []);

    return (
        <TokenContext.Provider value={{tokenContext, setTokenContext}}>
            <UserContext.Provider value={{userContext, setUserContext, completedTasks, setCompletedTasks}}>
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
        </TokenContext.Provider>
    );
}

export default App;
