import styled from "styled-components";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";


import Logo from "./../assets/trackit-logo.png";

function LoginPage () {

    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});
    const [dataLoading, setDataLoading] = useState({loading: false, classNameLoading:""});
    const { user, setUser } = useContext(UserContext);



    function signIn(e) {
        e.preventDefault();
        
        setDataLoading({...dataLoading, loading:true, classNameLoading: "input-disabled"});

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

        const promise = axios.post(URL, {
            email: data.email,
            password: data.password
        });
        promise.then((response) => {
            localStorage.setItem("userdata", JSON.stringify({
                name: response.data.name, 
                email: response.data.email,
                image: response.data.image, 
                token: response.data.token 
            }));
            const {data} = response;
            setUser({...user, name: data.name, image: data.image, email: data.email, token: data.token});
            navigate("/hoje")
        })
        promise.catch((error) => {
            console.log(error.response);
            alert("Login error! Check your credentials and try again");
            setDataLoading({...dataLoading, loading:false, classNameLoading: ""});
        })
    }

    return ( 
        <HomePage>
            <Img src={Logo} alt="TrackIt"/>
            <p className="app-name">TrackIt</p>
            <Form onSubmit={signIn}>
                <input 
                    type="email" 
                    disabled={dataLoading.loading} 
                    className={dataLoading.classNameLoading}  
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                    placeholder="Email" 
                    required 
                    value={data.email} 
                    onChange={(e) => setData({...data, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    disabled={dataLoading.loading} 
                    className={dataLoading.classNameLoading}  
                    placeholder="Password" 
                    required 
                    value={data.password} 
                    onChange={(e) => setData({...data, password: e.target.value})}
                />
                {dataLoading.loading === false ? 
                    <button type="submit">Entrar</button> :
                    <button disabled>
                        <ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} />
                    </button>
                }
                <Link to="/cadastro">
                    <Cadastro>Não tem uma conta? Cadastre-se!</Cadastro>
                </Link>
            </Form>
        </HomePage>
    ) 
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

    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1)
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
        display: flex;
        align-items: center;
        justify-content: center;
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