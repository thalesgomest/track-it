import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

import Habit from "./Habit";


function Habits() {
    return(
        <Container>
            <HabitsHeader>
                <h1>My Habits</h1>
                <button>
                    <ion-icon name="add-outline"></ion-icon>
                </button>
            </HabitsHeader>
            <HabitsContainer>
                <Habit />
                <Habit />
                <Habit />
                <Habit />
            </HabitsContainer>
        </Container>
    );
}

export default Habits;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E5E5E5;
    min-width: 100vw;
    min-height: 100vh;
`;

const HabitsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 375px;
    padding: 92px 18px 20px 18px;
    

    h1 {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
    }

    ion-icon {
        color: rgba(255, 255, 255, 1);
        font-size: 26.976px;
    }
`;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;