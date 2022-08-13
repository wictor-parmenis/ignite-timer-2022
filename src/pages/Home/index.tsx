import { Play } from 'phosphor-react';
import React from 'react';

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles';

const Home: React.FC = () => (
  <HomeContainer>
    <form action="">
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          type="text"
          list="suggestions"
          id="task"
          placeholder="Dê um nome para o seu projeto"
        />

        <datalist id="suggestions">
          <option aria-label="Estudar inglês" value="Estudar inglês" />
          <option
            aria-label="Estudar Front end pelo Ignite"
            value="Estudar Front end pelo Ignite"
          />
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          step={5}
          min={5}
          max={60}
          type="number"
          id="minutesAmount"
          placeholder="00"
        />
      </FormContainer>

      <CountDownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountDownContainer>

      <StartCountDownButton disabled type="submit">
        <Play size={24} />
        Começar
      </StartCountDownButton>
    </form>
  </HomeContainer>
);

export default Home;
