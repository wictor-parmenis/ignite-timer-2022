import { differenceInSeconds } from 'date-fns';
import {
  createContext, useCallback, useEffect, useReducer, useState,
} from 'react';
import { storageConfig } from '../config/storage';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducer, CycleStates } from '../reducers/cycles/reducer';

interface CycleContextData {
    cycles: Cycle[];
    currentCycle: Cycle | undefined;
    cycleActiveId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (secondsPassed: number) => void;
    interruptCycle: () => void;
    createNewCycle: (cycle: NewCycleData) => void;
}

interface NewCycleData {
    minutesAmount: number;
    task: string;
}

interface CycleProviderProps {
    children: React.ReactNode;
}

const initialValuesForCycle = {
  cycles: [],
  cycleActiveId: null,
};

export const CycleContext = createContext({} as CycleContextData);

export const CycleProvider: React.FC<CycleProviderProps> = ({ children }) => {
  const [cycleState, dispatch] = useReducer(cyclesReducer, initialValuesForCycle, () => {
    const storedStateAsJSON = localStorage.getItem(storageConfig.cyclesState);
    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    }
    return initialValuesForCycle;
  });

  useEffect(() => {
    const stateString = JSON.stringify(cycleState);
    localStorage.setItem(storageConfig.cyclesState, stateString);
  }, [cycleState]);

  const { cycleActiveId, cycles } = cycleState;
  const currentCycle = cycles.find((item) => item.id === cycleActiveId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (currentCycle) {
      return differenceInSeconds(new Date(), new Date(currentCycle?.startAt));
    }

    return 0;
  });

  const markCurrentCycleAsFinished = (): void => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const setSecondsPassed = (seconds: number): void => {
    setAmountSecondsPassed(seconds);
  };

  const createNewCycle = useCallback((data: NewCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startAt: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }, []);

  const interruptCycle = useCallback(() => {
    dispatch(interruptCurrentCycleAction());
  }, [dispatch]);

  return (
    <CycleContext.Provider
      value={{
        amountSecondsPassed,
        currentCycle,
        cycleActiveId,
        cycles,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
