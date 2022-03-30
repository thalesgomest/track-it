import styled from "styled-components";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Logo from "./../assets/trackit-logo.png";

function LoginPage () {

    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});


    function signIn(e) {
        e.preventDefault();

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

        const promise = axios.post(URL, data);
        promise.then((response) => {
            console.log(response);
            navigate("/login");
        })
        promise.catch((error) => error.response)
    }


    return (
        <HomePage>
            <Img src={Logo} alt="TrackIt"/>
            <p className="app-name">TrackIt</p>
            <Form onSubmit={signIn}>
                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email" required value={data.email}onChange={(e) => setData({...data, email: e.target.value})} />
                <input type="password" placeholder="Password" required value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                <button type="submit">Entrar</button>
                <Link to="/cadastro">
                    <Cadastro>Don't have an account? Sign Up now</Cadastro>
                </Link>
            </Form>
        </HomePage>
    );
}

export default LoginPage;

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 68px;

    .app-name {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        color: #126BA5;
        margin-bottom: 53px;
    }
`;

const Img = styled.img`
    width: 155.21px;
    height: 92.16px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 303px;
        height: 45px;
        border-radius: 5px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        padding-left: 11px;
        margin-bottom: 6px;
        font-size: 16px;
        font-family: 'Lexend Deca';

        &:focus {
            outline: none;
        }

        &::placeholder {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            color: #DBDBDB;
        }
    }

    input:focus::placeholder {
        color: transparent;
    }

    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        margin-bottom: 25px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        color: #FFFFFF;
    }
`;

const Cadastro = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    color: #52B6FF;
    text-decoration: underline;
    `