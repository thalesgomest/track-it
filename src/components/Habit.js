import styled from "styled-components"


function Habit() {
    return(
        <HabitContainer>
            <p>Ler 1 capítulo de livro</p>
            <DaysContainer>
                <Day>D</Day>
                <Day>S</Day>
                <Day>T</Day>
                <Day>Q</Day>
                <Day>Q</Day>
                <Day>S</Day>
                <Day>S</Day>
            </DaysContainer>
            <ion-icon name="trash-outline"></ion-icon>
        </HabitContainer>

    );
}

export default Habit;

const HabitContainer = styled.div`
    width: 340px;
    height: 91px;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: relative;
    margin-bottom: 10px;

    ion-icon {
        position: absolute;
        top: 0;
        right: 0;
        margin: 11px 10px 0 0;
        color: rgba(102, 102, 102, 1);
        font-size:15px;

    }

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        color: #666666;
        padding-top: 13px;
        padding-left: 15px;
    }
`;

const DaysContainer = styled.div`
    display: flex;
    margin: 8px 0 0 14px;
`;

const Day = styled.div`

    &:nth-child(-n+6) {
        margin-right: 4px;
    }

    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: #DBDBDB;
`;