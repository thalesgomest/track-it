import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components"
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
import axios from "axios";

import UserContext from "../contexts/UserContext";
import TodayHabit from "./TodayHabit";

function Today() {

    const {user, completedHabits, setCompletedHabits} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState();

    function listTodayHabits() {
        const URL = 
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

            const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const promise = axios.get(URL, config);
        promise.then((response) => {
            setTodayHabits(response.data);
            setCompletedHabits(
                (response.data.filter((habit) => habit.done).length /
                    response.data.length) * 100
            );
        })
        promise.catch((error) => {console.log(error.response.data.message)});
    }

    function toggle(id) {
        todayHabits.find((habit) => habit.id === id).done
                    ? uncheckHabit(id)
                    : checkHabit(id);
    }

    const checkHabit = (id) => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const promise = axios.post(URL, null, config);
        promise.then(listTodayHabits);
        promise.catch((error) => (console.log(error.response)));
    };

    const uncheckHabit = (id) => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const promise = axios.post(URL, null, config);
        promise.then(listTodayHabits);
        promise.catch((error) => (console.log(error.response)));
    };

    useEffect(() => {
        if (localStorage.getItem('userdata')) {
            listTodayHabits();
        }
        // eslint-disable-next-line
    }, []);

    
    return (
        <TodayContainer>
            <div className="header">
                <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
                {todayHabits ? (
                    completedHabits> 0 ? (
                        <p className="habits-done">
                            {completedHabits.toFixed()}% dos hábitos concluídos
                        </p>
                    ) : (
                        <p className="habits-done habits-done--no-habits">
                            Nenhum hábito concluído ainda
                        </p>
                    )
                ) : (
                    <></>
                )}
            </div>
            <div className="today-habits">
                {todayHabits ? todayHabits.map((habit) => 
                    <TodayHabit key={habit.id} habit={habit} handleClick={() => toggle(habit.id)} />)
                : 
                <div className="text-no-habits">
                    <p>Você não tem habitos para hoje</p>
                </div>}
            </div>    
        </TodayContainer>
    );
}

export default Today;


const TodayContainer = styled.div`
    margin-top: 98px;
    

    .header {
        h1 {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 22.976px;
            color: #126BA5;
            text-transform: capitalize;
            margin: 0 0 5px 17px;
        }
    
        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            color: #BABABA;
            margin: 0 0 28px 17px;
        }
    }

    .today-habits {
        display: flex;
        flex-direction: column;
        align-items: center;
    
    .text-no-habits {
        position: absolute;
        left: 0;
        margin-left: 17px;
    }

        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            color: #BABABA;
            /* position: absolute; */

        }
}

    .habits-done {
        color: #8FC549
    }
`;