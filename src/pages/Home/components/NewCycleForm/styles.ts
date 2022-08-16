import styled from 'styled-components';

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

const BaseInput = styled.input`
    background-color: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: ${({ theme }) => theme['gray-500']} 1px solid;
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${({ theme }) => theme['gray-500']};

    &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
    }

    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`;
