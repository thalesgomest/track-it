import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserContext from '../contexts/UserContext';
import styled from "styled-components";
import { BsTrash } from 'react-icons/bs';
import { BsPlusSquareFill } from "react-icons/bs";


import CreateHabit from "./CreateHabit";


function Habits() {

    const [habits, setHabits] = useState();
    const [formDisplayHidden, setFormDisplayHidden] = useState(false);
    const { user } = useContext(UserContext);
    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];



    function listHabits() {
        const URL ='https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const promise = axios.get(URL, config)

        promise.then((response) => {
            const {data} = response;
            setHabits(data);
        })
            
        promise.catch((err) => console.log(err.response.data.message));
    };

    function deleteHabit(id) {
        console.log(id)
        if (window.confirm('Deseja realmente excluir esse hábito?')) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const promise = axios.delete(URL, config)
            promise.then(listHabits);
        
            promise.catch((err) => console.log(err.response.data.message));
        };
    }

    useEffect(() => {
        listHabits();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);

    console.log(habits);

    return (
        <HabitsContainer>
            <HabitsHeader>
                <h1>Meus Hábitos</h1>
                <BsPlusSquareFill className="add-habit" onClick={()=>setFormDisplayHidden(!formDisplayHidden)}/>
            </HabitsHeader>
            <CreateHabit formDisplayHidden={formDisplayHidden} setFormDisplayHidden={setFormDisplayHidden} listHabits={() => listHabits()}/>
            {habits ? (
                habits.map(({id, name, days}) => (
                <>
                <HabitContainer className="habit" key={name}>
                    <p className="habit-name">{name}</p>
                    <DaysContainerHabit >
                    {daysOfWeek.map((day, index) => { return (
                        <DayContainerHabit className="day-container" key={index} id={index} days={days}>
                            <p>{day}</p>
                        </DayContainerHabit>)
                    })}
                    </DaysContainerHabit>
                    <BsTrash className="trash-icon" onClick={() => deleteHabit(id)}/>
                </HabitContainer>
                </>   
            ))) : (
                <p>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um
                    hábito para começar a trackear!
                </p>
                )
            }        
        </HabitsContainer>
    );
};

export default Habits;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E5E5E5;
    min-width: 100vw;
    min-height: 100vh;
    padding-bottom: 100px;
    
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        color: #666666;
    }
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

    .add-habit {
        width: 40px;
        height: 35px;
        color: #52B6FF;
    }
`;

const HabitContainer = styled.div`
    width: 340px;
    height: 91px;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: relative;
    margin-bottom: 10px;

    .trash-icon {
        position: absolute;
        top: 0;
        right: 0;
        margin: 11px 10px 0 0;
        color: rgba(102, 102, 102, 1);
        font-size:15px;

    }

    .habit-name {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        color: #666666;
        padding-top: 13px;
        padding-left: 15px;
    }
`;

const DaysContainerHabit = styled.div`
    display: flex;
    margin: 8px 0 0 14px;
`;

const DayContainerHabit = styled.div`

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
    background: ${({id, days }) => days.includes(id) ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: ${({id, days }) => days.includes(id) ? "#FFFFFF" : "#DBDBDB" };
`;