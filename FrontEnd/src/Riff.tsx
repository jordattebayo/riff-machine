import { useMutation, useQueryClient } from 'react-query'
import { Riff } from "./types";
import styled from 'styled-components';
import { deleteRiff, getRiffs } from './api'


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
 
const RiffItem: React.FC<{riff: Riff}> = ({ riff }) => {
    const queryClient = useQueryClient()

    const deleteTodoMutation = useMutation((riff: Riff) => {
        const { id } = riff;
        let stringId = id ? id?.toString() : "";
        return deleteRiff(stringId);
      }, {
        onSuccess: () => queryClient.invalidateQueries('riff'),
        onSettled: () => queryClient.refetchQueries(['riff']),
      })

    const showModal = () => {

    }
    
    return (
        <Wrapper>
            <HiddenItem>{riff.id}</HiddenItem>
            <Item>{riff.riff}</Item>
            <Item>{riff.author}</Item>
            <HiddenItem>{riff.dateCreated}</HiddenItem>
            <Delete type='button' onClick={() => deleteTodoMutation.mutate(riff)}>x</Delete>
        </Wrapper>
        )
}

export default RiffItem;