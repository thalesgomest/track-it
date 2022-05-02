import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";

function CreateHabit({ formDisplayHidden, setFormDisplayHidden, listHabits }) {
  const [habit, setHabit] = useState({ name: "", days: [] });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const { user } = useContext(UserContext);

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  function selectionDays(day) {
    setSelected(!selected);
    if (habit.days.includes(day)) {
      setHabit({ ...habit, days: habit.days.filter((d) => d !== day) });
    } else {
      setHabit({ ...habit, days: [...habit.days, day] });
    }
  }

  function createHabit(e) {
    e.preventDefault();

    if (habit.days.length > 0) {
      setLoading(true);
    } else {
      alert("Selecione pelo menos um dia da semana");
      return;
    }

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const body = { ...habit };

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const promise = axios.post(URL, body, config);
    promise
      .then((response) => {
        listHabits();
        setFormDisplayHidden(false);
        setLoading(false);
        setHabit({ name: "", days: [] });
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
      });
  }

  return formDisplayHidden === true ? (
    <FormCreateHabit onSubmit={createHabit}>
      <input
        type="text"
        placeholder="nome do hábito"
        value={habit.name}
        onChange={(e) => setHabit({ ...habit, name: e.target.value })}
      ></input>
      <DaysContainer>
        {daysOfWeek.map((day, index) => {
          return (
            <DayContainer
              key={index}
              id={index}
              days={habit.days}
              onClick={() => selectionDays(index)}
            >
              <p>{day}</p>
            </DayContainer>
          );
        })}
      </DaysContainer>
      <div className="CreatHabit__footer">
        <p onClick={() => setFormDisplayHidden(false)}>Cancelar</p>
        <button type="submit">
          {loading ? <ThreeDots color="#fff" height={11} /> : "Salvar"}
        </button>
      </div>
    </FormCreateHabit>
  ) : (
    <></>
  );
}

export default CreateHabit;

const FormCreateHabit = styled.form`
  width: 340px;
  height: 180px;
  background: #ffffff;
  border-radius: 5px;
  text-align: center;
  opacity: 1;
  margin-bottom: 20px;

  input {
    width: 303px;
    height: 45px;
    border: solid 1px rgba(212, 212, 212, 1);
    padding-left: 11px;
    margin-top: 18px;
    border-radius: 5px;

    &:focus {
      outline: none;

      &::placeholder {
        color: transparent;
      }
    }

    &::placeholder {
      font-family: "Lexend Deca";
      font-style: normal;
      font-weight: 400;
      font-size: 19.976px;
      color: #dbdbdb;
    }
  }

  .CreatHabit__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 16px;

    p {
      font-family: "Lexend Deca";
      font-style: normal;
      font-weight: 400;
      font-size: 15.976px;
      color: #52b6ff;
      margin-right: 23px;
    }

    button {
      width: 84px;
      height: 35px;
      background-color: #52b6ff;
      border: none;
      border-radius: 5px;
      font-family: "Lexend Deca";
      font-style: normal;
      font-weight: 400;
      font-size: 15.976px;
      color: #ffffff;
    }
  }
`;

const DaysContainer = styled.div`
  display: flex;
  margin: 8px 0 29px 19px;
`;

const DayContainer = styled.div`
  &:nth-child(-n + 6) {
    margin-right: 4px;
  }

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${({ id, days }) =>
    days.includes(id) ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};
  border: 1px solid #d5d5d5;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  color: ${({ id, days }) => (days.includes(id) ? "#FFFFFF" : "#DBDBDB")};
`;
