import React from 'react';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

const NewCycleForm: React.FC = () => (
  <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      type="text"
      list="suggestions"
      id="task"
      {...register('task')}
      disabled={!!cycleActive}
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
      disabled={!!cycleActive}
      {...register('minutesAmount', { valueAsNumber: true })}
    />
  </FormContainer>
);

export default NewCycleForm;
