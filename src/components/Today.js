import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components"
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 


console.log(typeof(dayjs().locale('pt-br').format('Dddd, DD/MM')));

function Today() {

    return (
        <TodayContainer>
            <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
            <p>Nenhum hábito concluído ainda</p>
        </TodayContainer>
    );
}

export default Today;


const TodayContainer = styled.div`
    margin-top: 98px;
    

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        color: #126BA5;
        text-transform: capitalize;
    }

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
    }


`;