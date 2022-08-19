/* eslint-disable import/no-duplicates */
import { formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import React, { useContext } from 'react';
import { CycleContext } from '../../contexts/CycleContext';
import { HistoryContainer, HistoryList, Status } from './styles';

const History: React.FC = () => {
  const { cycles } = useContext(CycleContext);
  return (
    <HistoryContainer>
      <h1>Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((item) => (
              <tr id={item.id}>
                <td>{item.task}</td>
                <td>{item.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(new Date(item.startAt), {
                    addSuffix: true,
                    locale: ptBr,
                  })}
                </td>
                <td>
                  {item.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {item.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!item.interruptedDate && !item.finishedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
