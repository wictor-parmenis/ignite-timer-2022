import { differenceInSeconds } from 'date-fns';
import React, { useContext, useEffect } from 'react';
import { CycleContext } from '../../../../contexts/CycleContext';

import { CountDownContainer, Separator } from './styles';

const Countdown: React.FC = () => {
  const {
    currentCycle,
    cycleActiveId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSeconds = currentCycle ? currentCycle.minutesAmount * 60 : 0;

  const currentSeconds = currentCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (cycleActiveId) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, cycleActiveId]);

  useEffect(() => {
    let interval: number;
    if (currentCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(currentCycle?.startAt),
        );
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(0);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    currentCycle,
    totalSeconds,
    amountSecondsPassed,
    cycleActiveId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
};

export default Countdown;
