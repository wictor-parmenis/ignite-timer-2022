import { Play } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles';

const newCycleValidator = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'Adicione no mínimo 5 minutos')
    .max(60, 'Adicione no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleValidator>;

interface Cycle {
    id: string;
    minutesAmout: number;
    task: string;
}

const Home: React.FC = () => {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [cycleActive, setCycleActive] = useState<string | null>(null);

  const currentCycle = cycle.find((item) => item.id === cycleActive);

  console.log(currentCycle, 'currentCycle');

  const {
    register, handleSubmit, watch, reset,
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidator),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  });

  const handleCreateNewCycle = useCallback(
    (data: NewCycleFormData) => {
      const id = String(new Date().getTime());
      const newCycle: Cycle = {
        id,
        minutesAmout: data.minutesAmount,
        task: data.task,
      };

      setCycle((state) => [...state, newCycle]);
      setCycleActive(id);
      reset();
    },
    [reset],
  );

  const task = watch('task');
  const isSubmittedDisable = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            list="suggestions"
            id="task"
            {...register('task')}
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <StartCountDownButton disabled={isSubmittedDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};

export default Home;
