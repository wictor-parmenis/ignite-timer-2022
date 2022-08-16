import { Play, HandPalm } from 'phosphor-react';
import React, {
  createContext, useCallback, useEffect, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles';
import NewCycleForm from './components/NewCycleForm';
import Countdown from './components/Countdown';

interface CycleContextData {
    currentCycle: Cycle | undefined;
    cycleActive: string | null;
    markCurrentCycleAsFinished: () => void;
}

export const CycleContext = createContext({} as CycleContextData);

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
    minutesAmount: number;
    task: string;
    startAt: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

const Home: React.FC = () => {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [cycleActive, setCycleActive] = useState<string | null>(null);

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
        minutesAmount: data.minutesAmount,
        task: data.task,
        startAt: new Date(),
      };

      setCycle((state) => [...state, newCycle]);
      setCycleActive(id);
      setAmountSecondsPassed(0);
      reset();
    },
    [reset],
  );

  const currentCycle = cycle.find((item) => item.id === cycleActive);

  const task = watch('task');
  const isSubmittedDisable = !task;

  const markCurrentCycleAsFinished = () => {
    setCycle((state) => state.map((item) => (item.id === cycleActive ? { ...item, finishedDate: new Date() } : item)));
  };

  const handleInterruptCycle = useCallback(() => {
    setCycleActive(null);
    setCycle((state) => state.map((cycleItem) => {
      if (cycleItem.id === cycleActive) {
        return {
          ...cycleItem,
          interruptedDate: new Date(),
        };
      }
      return cycleItem;
    }));
  }, [cycleActive, setCycle]);

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CycleContext.Provider
          value={{ currentCycle, cycleActive, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CycleContext.Provider>
        {cycleActive ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="submit">
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
