import styled from "styled-components";

function History() {
    return (
        <HistoryPage>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </HistoryPage>

    )
}

export default History;


const HistoryPage = styled.div`
    margin-top: 98px;

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        color: #126BA5;
        margin: 0 0 17px 17px;
    }

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        color: #666666;
        margin-left: 17px;
    }
`