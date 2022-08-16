import { differenceInSeconds } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { CycleContext } from '../..';

import { CountDownContainer, Separator } from './styles';

const Countdown: React.FC = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { currentCycle, cycleActive, markCurrentCycleAsFinished } = useContext(CycleContext);

  const totalSeconds = currentCycle ? currentCycle.minutesAmount * 60 : 0;

  const currentSeconds = currentCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (cycleActive) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, cycleActive]);

  useEffect(() => {
    let interval: number;
    if (currentCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), currentCycle?.startAt);
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setAmountSecondsPassed(0);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentCycle, totalSeconds, amountSecondsPassed, cycleActive, markCurrentCycleAsFinished]);

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
