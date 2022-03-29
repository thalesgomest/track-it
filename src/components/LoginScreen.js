import Logo from "./../assets/trackit-logo.png";
import styled from "styled-components"



function LoginScreen () {
    return (
        <HomePage>
            <Img src={Logo} alt="TrackIt"/>
            <p className="app-name">TrackIt</p>
            <Form>
                <input type="email" placeholder="email" required />
                <input type="password" placeholder="password" required />
                <button type="submit">Entrar</button>
                <Cadastro>Não tem uma conta? Cadastre-se!</Cadastro>
            </Form>
        </HomePage>
    );
}

export default LoginScreen;

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
    }

    input:focus {
        outline: none;
    }

    input:placeholder {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        color: #DBDBDB;
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
    text-decoration-line: underline;
`;