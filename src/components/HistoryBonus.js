import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UserContext from '../contexts/UserContext';
import { TodayHabitContainer } from './TodayHabit';
import { BsCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs';

const History = () => {
    const today = new Date();
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    const [date, setDate] = useState(new Date());
    const [habitsHistory, setHabitsHistory] = useState([]);
    const { user, setCompletedHabits } = useContext(UserContext);
    const [dateHabits, setDateHabits] = useState();

    const listTodayHabits = () => {
        const URL =
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        axios
            .get(URL, config)
            .then((response) => {
                setCompletedHabits(
                    (response.data.filter((habit) => habit.done).length /
                        response.data.length) *
                        100
                );
            })
            .catch((err) => {
                alert(err);
            });
    };

    const getHabisHistory = () => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios
            .get(URL, config)
            .then((response) => {
                setHabitsHistory(response.data);
                setDateHabits(
                    response.data.find(
                        (habit) =>
                            habit.day ===
                            date.toLocaleDateString('pt-br', dateOptions)
                    )
                );
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    useEffect(() => {
        getHabisHistory();
        listTodayHabits();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDateHabits(
            habitsHistory.find(
                (habit) =>
                    habit.day === date.toLocaleDateString('pt-br', dateOptions)
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return (
        <HistoryContainer>
            <div className="header">
                <h1>Historico</h1>
            </div>
            <Calendar
                className="react-calendar"
                value={date}
                onChange={setDate}
                calendarType={'US'}
                maxDate={today}
                tileClassName={({ date }) => {
                    const history = habitsHistory.map((day) => {
                        return {
                            day: day.day,
                            allDone:
                                day.habits.filter((habit) => habit.done)
                                    .length === day.habits.length,
                        };
                    });

                    const allDones = history
                        .filter((day) => day.allDone)
                        .map((day) => day.day);
                    const notAllDone = history
                        .filter((day) => !day.allDone)
                        .map((day) => day.day);

                    if (
                        date.toLocaleDateString('pt-br', dateOptions) !==
                        today.toLocaleDateString('pt-br', dateOptions)
                    ) {
                        if (
                            allDones.includes(
                                date.toLocaleDateString('pt-br', dateOptions)
                            )
                        ) {
                            return 'react-calendar__tile--all-done';
                        } else if (
                            notAllDone.includes(
                                date.toLocaleDateString('pt-br', dateOptions)
                            )
                        ) {
                            return 'react-calendar__tile--not-all-done';
                        } else {
                            return 'react-calendar__tile';
                        }
                    }
                }}
                formatDay={(locale, date) => <p>{dayjs(date).format('DD')}</p>}
            />
            <div className="date-habits">
                {dateHabits ? (
                    <>
                        <h1>
                            Habitos do dia{' '}
                            {date.toLocaleDateString('pt-br', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}
                            :
                        </h1>
                        {dateHabits.habits.map((habit) => (
                            <TodayHabitContainer
                                className="date-habit"
                                key={habit.id}
                            >
                                <h1 className="name-habit">{habit.name}</h1>
                                {habit.done ? (
                                    <BsCheckSquareFill 
                                        className="check check-true"
                                        background-color={'#8FC549'}
                                    />
                                ) : (
                                    <BsFillXSquareFill
                                        className="check check-false"
                                        fill={'#eb3d3a'}
                                    />
                                )}
                            </TodayHabitContainer>
                        ))}
                    </>
                ) : (
                    <h1>
                        Não existem habitos para o dia{' '}
                        {date.toLocaleDateString('pt-br', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        })}
                    </h1>
                )}
            </div>
        </HistoryContainer>
    );
};

export default History;

const HistoryContainer = styled.div`
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 70px;
    display: flex;
    flex-direction: column;
    padding: 28px 18px;
    background: #e5e5e5;
    overflow-y: auto;
    /* ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    } */
    .react-calendar {
        width: 100%;
        border: none;
        border-radius: 10px;
        &__navigation button:last-child {
            border-top-right-radius: 10px;
        }
        &__tile {
            height: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            &:last-child {
                border-bottom-right-radius: 10px;
            }
            &:nth-last-child(7) {
                border-bottom-left-radius: 10px;
            }
            &--all-done {
                p {
                    background: #8fc549;
                    color: #000;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }
            &--not-all-done {
                p {
                    background: #eb3d3a;
                    color: #fff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }
            &--active {
                background: #fff;
                p {
                    background: #006edc;
                    color: white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                &:enabled {
                    &:hover,
                    &:focus {
                        background: #fff;
                        p {
                            background: #1087ff;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    .date-habits {
        margin-top: 50px;
        h1 {
            font-family: 'Lexend Deca';
            font-size: 20px;
            line-height: 25px;
            color: #666666;
            margin-bottom: 7px;
            
        }

        .name-habit {
            padding-top: 20px;
        }
        .check-true {
            fill: #8FC549;
        }

        .check-false { 
            fill: #eb3d3a;
        }
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        h1 {
            font-family: 'Lexend Deca';
            font-size: 25px;
            color: #126ba5;
        }
    }
`;