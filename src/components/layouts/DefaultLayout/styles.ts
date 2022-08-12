import styled from 'styled-components';

export const LayoutContainer = styled.div`
    width: 74rem;
    height: calc(50vw - 10rem);
    margin: 5rem auto;
    padding: 2.5rem;

    background-color: ${({ theme }) => theme['gray-800']};
    border-radius: 8px;

    display: flex;
    flex-direction: column;
`;
