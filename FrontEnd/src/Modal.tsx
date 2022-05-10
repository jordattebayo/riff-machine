import { useMutation, useQueryClient } from 'react-query'
import { Riff } from "./types";
import styled from 'styled-components';
import { deleteRiff } from './api'
import RiffItem from './Riff';

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
`

const Wrapper = styled.div`
    width: 500px;
    height: 500px;
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
 
const Modal: React.FC<{show: boolean, riff: Riff}> = ({ show, riff }) => {
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
        <Background>
        <Wrapper>
            <p>Are you sure you want to delete riff:</p>
            <RiffItem riff={riff} />
            <Delete type='button' onClick={() => deleteTodoMutation.mutate(riff)}>Delete forever</Delete>
        </Wrapper>
        </Background>
        )
}

export default Modal;