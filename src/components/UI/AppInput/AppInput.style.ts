import styled, { css } from "styled-components";

export const StyledInput = styled.input<{ $isError: boolean }>`
    outline: 0;
    font-family: inherit;
    padding: 12px 15px;
    background-color: ${(props) => props.theme.colors.bgc};
    border-radius: 10px;
    border: 2px solid ${(props) => props.theme.colors.disabledBgc};
    width: 100%;
    margin-bottom: 20px;

    ${(props) =>
    props.$isError &&
    css`
      border-color: ${(props) => props.theme.colors.red};
    `}
`

export const AppInputErrorText = styled.span`
    display: block;
    margin-top: 4px;
    margin-bottom: 20px;
    color: red;
    text-align: left;
`