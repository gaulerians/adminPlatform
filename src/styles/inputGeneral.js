import styled, { css } from 'styled-components'

export const mixinInput = css`
  background: white;
  border: 1px solid ${props => props.theme.gray100};
  border-radius: 4px;
  padding: 5px 10px;
  font-family: ${props => props.theme.textFont};
  font-size: 0.938em;
  color: ${props => props.theme.gray500};
  transition: all .2s;
`

export const mixinHoverAndFocus = css`
  &:hover {
    border: 1px solid ${props => props.theme.orange300};
  }

  &:focus {
    color: ${props => props.theme.textColor};
    outline: none;
    border: 1px solid ${props => props.theme.brandColor};
  }

  &:read-only {
    background: ${props => props.theme.gray100};
  }
`

export const FormContainer = styled.form`
  @media(min-width:1200px) {
    .inputContainerDuplo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 40px;
      width: 70%;
    }

    .inputContainerQuad {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 10px;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 5px 0;
  position: relative;

  ${props => props.margin10B && css`
    margin: 0 0 10px 0;
  `}

  ${props => props.noMargin && css`
    margin: 0;
  `}

  label {
    font-size: 0.938em;
    font-family: ${props => props.theme.textFont};
    font-weight: ${props => props.theme.weight.medium};
    margin: 0 0 5px 0;
  }
  
  input {
    height: 40px;
    ${mixinInput}
    ${mixinHoverAndFocus}
    margin: ${props => props.margin};
  }

  textarea {
    ${mixinInput}
    ${mixinHoverAndFocus}
    height: ${props => props.heightTextArea};
    resize: none;
  }

  .inputsRadioContainer {
    display: flex;
    margin: 2px 0 0 0;

    & .inputRadioContainer:last-child {
      margin: 0;
    }
  }

  .inputRadioContainer {
    display: flex;
    align-items: center;
    font-weight: ${props => props.theme.weight.regular};
    margin: 0 20px 0 0;
    line-height: 0;
    width: max-content;

    input {
      height: 30px;
    }

    @media(min-width:768px) {
      margin: 0 40px 0 0;
    }
  }

  select {
    appearance: none;
    background: transparent;
    border: none;
    padding: 0 1em 0 10px;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    line-height: inherit;
    color: ${props => props.theme.gray500};
    height: 40px;
    transition: all .2s;

    z-index: 1;

    &::-ms-expand {
      display: none;
    }

    outline: none;
  }

  .select {
    display: grid;
    grid-template-areas: "select";
    align-items: center;
    position: relative;
    background: white;
    border: 1px solid ${props => props.theme.gray100};
    border-radius: 4px;
    font-family: ${props => props.theme.textFont};
    font-size: 0.938em;
    transition: all .2s;

    &:hover {
      border: 1px solid ${props => props.theme.orange300};
    }

    select,
    &::after {
      grid-area: select;
    }

    &::after {
      content: "";
      justify-self: end;
      width: 0.8em;
      height: 0.5em;
      background: ${props => props.theme.gray500};
      clip-path: polygon(0% 14%, 51% 88%, 100% 12%, 90% 12%, 51% 73%, 11% 15%);
      margin: 0 10px 0 0;
    }
  }

  select:focus {
    color: ${props => props.theme.textColor};
  }
  
  select:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    border: 1px solid ${props => props.theme.brandColor};
  }

  .inputType {
    @supports(-webkit-appearance: none) or (-moz-appearance: none) {
      input[type='checkbox'],
      input[type='radio'] {
        appearance: none;
        height: 21px;
        outline: none;
        width: 21px;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0 7px 0 0;
        cursor: pointer;
        border: 2px solid var(--bc, #ECA163);
        background: var(--b, ${props => props.theme.backgroundColor});
        transition: background .3s, border-color .3s, box-shadow .2s;
        flex: 1 0 auto;

        &:after {
          content: '';
          display: block;
          left: -4px;
          top: -4px;
          position: absolute;
          transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
        }

        &:checked {
          --b: ${props => props.theme.brandColor};
          --bc: ${props => props.theme.brandColor};
          --d-o: .3s;
          --d-t: .6s;
          --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
        }

        &:disabled {
          --b: ${props => props.theme.gray400Color};
          cursor: not-allowed;
          opacity: .9;

          &:checked {
            --b: ${props => props.theme.orange100};
            --bc: ${props => props.theme.gray400};
          }

          & + label {
            cursor: not-allowed;
          }
        }

        &:hover {
          &:not(:checked) {
            &:not(:disabled) {
              --bc: ${props => props.theme.brandColor};
            }
          }
        }

        &:focus {
          box-shadow: 0 0 0 2px ${props => props.theme.orange300};
        }

        &:not(.switch) {
          width: 21px;
          &:after {
            opacity: var(--o, 0);
          }
          &:checked {
            --o: 1;
          }
        }

        & + label {
          font-size: 14px;
          line-height: 21px;
          display: inline-block;
          vertical-align: top;
          cursor: pointer;
          margin-left: 4px;
        }

        @media(min-width:7680px) {
          margin: 0 15px 0 0;
        }
      }

      input[type='checkbox'] {
        &:not(.switch) {
          border-radius: 7px;

          &:after {
            width: 5px;
            height: 9px;
            border: 2px solid ${props => props.theme.backgroundColor};
            border-top: 0;
            border-left: 0;
            left: 7px;
            top: 4px;
            transform: rotate(var(--r, 20deg));
          }

          &:checked {
            --r: 43deg;
          }
        }

        &.switch {
          width: 38px;
          border-radius: 11px;
          &:after {
            left: 2px;
            top: 2px;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            background: var(--ab, ${props => props.theme.brandColor});
            transform: translateX(var(--x, 0));
          }

          &:checked {
            --ab: ${props => props.theme.backgroundColor};
            --x: 17px;
          }

          &:disabled {
            &:not(:checked) {
              &:after {
                opacity: .6;
              }
            }
          }
        }
      }

      input[type='radio'] {
        border-radius: 50%;

        &:after {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: ${props => props.theme.backgroundColor};
          opacity: 0;
          transform: scale(var(--s, .7));
        }
        
        &:checked {
          --s: .5;
        }
      }
    }
  }
`
