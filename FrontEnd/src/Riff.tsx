import { useMutation, useQueryClient } from 'react-query'
import { Riff } from "./types";
import styled from 'styled-components';
import { deleteRiff, getRiffs } from './api'

//#region Styled Components

const Wrapper = styled.li`
    display: flexbox;
    width: 100%;
    flex-direction: row;
    justify-content: spaced-evenly;
    align-items: center;

`
 const Item = styled.p`
    padding: 0 2em;
    margin-bottom: 1em;
 `

 const HiddenItem = styled.p`
  padding: 0 2em;
  margin-bottom: 1em;
  border: 1px solid black;
  display: none;
`

 const Delete = styled.button`
  padding-left: 2em;
  color: red;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`
 //#endregion

 interface RiffItemProps {
  riff: Riff, 
  setModal?: any, 
  setRiffSelected?: any
 }

 const RiffItem: React.FC<RiffItemProps> = ({ riff, setModal, setRiffSelected }) => {

    const deleteRiff = () => {
      setRiffSelected(riff);
      setModal(true);
    }
    
    return (
        <Wrapper>
            <HiddenItem>{riff.id}</HiddenItem>
            <Item>{riff.riff}</Item>
            { !!setModal ? <Item>{riff.author}</Item> : null }
            <HiddenItem>{riff.dateCreated}</HiddenItem>
            { !!setModal ? <Delete type='button' onClick={() => deleteRiff()}>x</Delete> : null }
        </Wrapper>
        )
}

export default RiffItem;