import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserContext from '../contexts/UserContext';
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';
import { BsTrash } from 'react-icons/bs';
import { BsPlusSquareFill } from "react-icons/bs";


import CreateHabit from "./CreateHabit";


function Habits() {

    const [habits, setHabits] = useState();
    const [formDisplayHidden, setFormDisplayHidden] = useState(false);
    const { user } = useContext(UserContext);



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

    // function deleteHabit(id) {
    //     if (window.confirm('Deseja realmente excluir esse hábito?')) {
    //         const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         };

    //         const promise = axios.get(URL, config)
    //         promise.then(listHabits);
        
    //         promise.catch((err) => console.log(err.response.data.message));
    //     };
    // }

    useEffect(() => {
        listHabits();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);

    console.log(habits)

    return(
        <HabitsContainer>
            <HabitsHeader>
                <h1>Meu Hábitos</h1>
                <BsPlusSquareFill className="add-habit" onClick={()=>setFormDisplayHidden(!formDisplayHidden)}/>
            </HabitsHeader>
            <CreateHabit formDisplayHidden={formDisplayHidden} setFormDisplayHidden={setFormDisplayHidden} listHabits={() => listHabits()}/>
            {/* <div className="habits">
                {habits ? (
                    habits.map(({ id, name, days }) => (
                        <div className="habit" key={id}>
                            <p className="title">{name}</p>
                            <div className="days">{daysBuilder({ days })}</div>
                            <BsTrash
                                className="trash"
                                onClick={() => deleteHabit(id)}
                            />
                        </div>
                    ))
                ) : (
                    <p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um
                        hábito para começar a trackear!
                    </p>
                )}
            </div> */}
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