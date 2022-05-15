import { useMutation, useQueryClient } from 'react-query'
import { Riff } from "./types";
import styled from 'styled-components';
import { deleteRiff } from './api'
import RiffItem from './Riff';

//#region Styled Components

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Wrapper = styled.div`
    width: 500px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
`

 const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
 `

 const Delete = styled.button`
  min-height: 25px;
  min-width: 35px;
  padding: 0 2em;
  color: red;
  background: none;
  border: 1px solid red;
  &:hover {
    cursor: pointer;
  }
`

const Cancel = styled.button`
min-height: 25px;
min-width: 35px;
margin-left: 1em;
padding: 0 2em;
background: none;

border: 1px solid black;
&:hover {
  cursor: pointer;
}
`
 //#endregion

 interface ModalProps {
  showModal: any   
  riffSelected: any,  
  setRiffSelected: any
 }

 const Modal: React.FC<ModalProps> = ({ showModal, riffSelected, setRiffSelected }) => {
    const queryClient = useQueryClient()

    const deleteTodoMutation = useMutation((riff: Riff) => {
        const { id } = riff;
        let stringId = id ? id?.toString() : "";
        return deleteRiff(stringId);
      }, { 
        onSuccess: () =>{ queryClient.invalidateQueries('riff'); clearSelected()},
        onSettled: () => queryClient.refetchQueries(['riff']),
      })
    
    const clearSelected = () => {
      setRiffSelected({}) 
      showModal(false)
    }
    
    return (
        <Background>
          <Wrapper>
            <div>
              <p>Are you sure you want to delete this riff?</p>
            </div>         
            <div>          
              <RiffItem riff={riffSelected} key={riffSelected.id} />
            </div>
            <ChoiceContainer>
              <Delete type='button' onClick={() => deleteTodoMutation.mutate(riffSelected)}>Delete forever</Delete>
              <Cancel type='button' onClick={() => clearSelected()}>Cancel</Cancel>
            </ChoiceContainer>
          </Wrapper>
        </Background>
        )
}

export default Modal;