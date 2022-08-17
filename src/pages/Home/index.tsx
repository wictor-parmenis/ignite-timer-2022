import { Play, HandPalm } from 'phosphor-react';
import React, { useCallback, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles';
import NewCycleForm from './components/NewCycleForm';
import Countdown from './components/Countdown';
import { CycleContext } from '../../contexts/CycleContext';

const newCycleValidator = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'Adicione no mínimo 5 minutos')
    .max(60, 'Adicione no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleValidator>;

const Home: React.FC = () => {
  const { cycleActiveId, createNewCycle, interruptCycle } = useContext(CycleContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidator),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const handleCreateNewCycle = useCallback(
    (data: NewCycleFormData) => {
      createNewCycle(data);
      reset();
    },
    [createNewCycle, reset],
  );

  const task = watch('task');
  const isSubmittedDisable = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {cycleActiveId ? (
          <StopCountDownButton onClick={interruptCycle} type="submit">
            <HandPalm size={24} />
            Encerrar
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmittedDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export default Home;
