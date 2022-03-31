import styled from "styled-components";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';


import Logo from "./../assets/trackit-logo.png";

import imgCheckURL from "../utils/imgCheckURL";



function SignUpPage() {
    
    const [data, setData] = useState({email: "", password: "", name: "", image: ""});
    const [preview, setPreview] = useState("https://i.imgur.com/B83hy2z.png");
    const [dataLoading, setDataLoading] = useState({loading: false, classNameLoading:""});
    const navigate = useNavigate();

    function previewImage() {

        if(!imgCheckURL(data.image)) {
            alert ("Invalid Image URL");
            setPreview("https://i.imgur.com/B83hy2z.png");
        } else {
            setPreview(data.image)
        }
    }

    function signUp(e) {
        e.preventDefault();

        setDataLoading({...dataLoading, loading:true, classNameLoading: "input-disabled"});

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

        const promise = axios.post(URL, {
            email: data.email,
            name: data.name,
            image: data.image,
            password: data.password
        });
        promise.then((response) => {
            console.log(response);
            navigate("/");
        })
        promise.catch((error) => {
            console.log(error.response)
            alert("Sign Up error! Check your credentials and try again");
        })
    }


    return (
        <>
            <HomePage>
                <Img src={Logo} alt="TrackIt"/>
                <p className="app-name">TrackIt</p>
                <ProfileImage style={{ 
                    backgroundImage: `url(${preview})` 
                    }}>
                </ProfileImage>
                <Form onSubmit={signUp}>
                    <input 
                        type="email" 
                        disabled={dataLoading.loading} 
                        className={dataLoading.classNameLoading} 
                        placeholder="Email" 
                        required 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
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
                    <input 
                        type="text" 
                        disabled={dataLoading.loading} 
                        className={dataLoading.classNameLoading} 
                        placeholder="Nome" 
                        required 
                        value={data.name} 
                        onChange={(e) => setData({...data, name: e.target.value})}
                    />
                    <input 
                        type="text" 
                        disabled={dataLoading.loading} 
                        className={dataLoading.classNameLoading} 
                        placeholder="URL Imagem de Perfil" 
                        required 
                        value={data.image} 
                        onChange={(e) => setData({...data, image: e.target.value})} 
                    />
                    <button type="button" onClick={previewImage}>Preview Imagem</button>
                    {dataLoading.loading === false ? 
                        <button type="submit">Entrar</button> :
                        <button disabled>
                            <ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} />
                        </button>
                    }
                    <Link to="/">
                        <Cadastro>Já tem uma conta? Faça login!</Cadastro>
                    </Link>
                </Form>
            </HomePage>
        </>
    )
    // ) : (
    //     <>
    //         <HomePage>
    //             <Img src={Logo} alt="TrackIt"/>
    //             <p className="app-name">TrackIt</p>
    //             <ProfileImage style={{ 
    //                 backgroundImage: `url(${preview})` 
    //                 }}>
    //             </ProfileImage>
    //             <Form onSubmit={signUp}>
    //                 <input type="email" className="input-disabled" disabled placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
    //                 <input type="password" className="input-disabled" disabled placeholder="Password" required value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
    //                 <input type="text" className="input-disabled" disabled placeholder="Name" required value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
    //                 <input type="text" className="input-disabled" disabled placeholder="Profile Image URL" required value={data.image} onChange={(e) => setData({...data, image: e.target.value})} />
    //                 <button type="button" disabled onClick={previewImage}>Click for preview image profile</button>
    //                 <button disabled>
    //                     <ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} />
    //                 </button>
    //                 <Link to="/">
    //                     <Cadastro>Have a Account? Sign In</Cadastro>
    //                 </Link>
    //             </Form>
    //         </HomePage>
    //     </>
    // )
}

export default SignUpPage;

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
        margin-bottom: 35px;
    }
`;

const Img = styled.img`
    width: 155.21px;
    height: 92.16px;
`;

const ProfileImage = styled.div`
    display: inline-block;
    width: 100px;
    height: 100px;
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 50%;
    margin-bottom:35px;
    border: 1px solid #ffffff;
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

        &:focus::placeholder {
        color: transparent;
        }
    }

    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1)
    }

    button:nth-of-type(1) {
        margin-bottom: 6px;
        font-size: 20.976px;
    }
    

    button:nth-of-type(2) {
        margin-bottom: 30px;
    }

    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
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
    margin-bottom: 97px;
`;