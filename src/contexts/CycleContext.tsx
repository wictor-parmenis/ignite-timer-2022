import {
  createContext, useCallback, useContext, useState,
} from 'react';

export interface Cycle {
    id: string;
    minutesAmount: number;
    task: string;
    startAt: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CycleContextData {
    cycle: Cycle[];
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

export const CycleContext = createContext({} as CycleContextData);

export const CycleProvider: React.FC<CycleProviderProps> = ({ children }) => {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [cycleActiveId, setCycleActiveId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const currentCycle = cycle.find((item) => item.id === cycleActiveId);

  const markCurrentCycleAsFinished = (): void => {
    // eslint-disable-next-line max-len
    setCycle((state) => state.map((item) => (item.id === cycleActiveId ? { ...item, finishedDate: new Date() } : item)));
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

    setCycle((state) => [...state, newCycle]);
    setCycleActiveId(id);
    setAmountSecondsPassed(0);
  }, []);

  const interruptCycle = useCallback(() => {
    setCycleActiveId(null);
    setCycle((state) => state.map((cycleItem) => {
      if (cycleItem.id === cycleActiveId) {
        return {
          ...cycleItem,
          interruptedDate: new Date(),
        };
      }
      return cycleItem;
    }));
  }, [cycleActiveId, setCycle]);
  return (
    <CycleContext.Provider
      value={{
        amountSecondsPassed,
        currentCycle,
        cycleActiveId,
        cycle,
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
