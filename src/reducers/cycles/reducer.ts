import { produce } from 'immer';
import { ActionTypes } from './actions';

export interface Cycle {
    id: string;
    minutesAmount: number;
    task: string;
    startAt: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}
export interface CycleStates {
    cycles: Cycle[];
    cycleActiveId: string | null;
}

export function cyclesReducer(state: CycleStates, action: any): CycleStates {
  switch (action.type) {
    case ActionTypes.ADD_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.cycleActiveId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.cycleActiveId,
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycleActiveId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.cycleActiveId,
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycleActiveId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
}
