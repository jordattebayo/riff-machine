import { useMutation, useQueryClient } from 'react-query'
import { TodoItem } from "./types";
import styled from 'styled-components';
import { deleteTodo, getTodos } from './api'


const Wrapper = styled.li`
    display: flexbox;
    width: 100%;
    flex-direction: row;
    justify-content: spaced-evenly;


`
 const Item = styled.p`
    padding: 0 2em;
    margin-bottom: 1em;
    border: 1px solid black;
 `

 const Delete = styled.button`
 padding: 0 2em;
 color: red;
 margin-bottom: 1em;
 border: 1px solid red;
`
 
const Todo: React.FC<{todo: TodoItem}> = ({ todo }) => {
    const queryClient = useQueryClient()

    const deleteTodoMutation = useMutation((todo: TodoItem) => {
        const { id } = todo;
        let stringId = id ? id?.toString() : "";
        return deleteTodo(stringId);
      }, {
        onSuccess: () => queryClient.invalidateQueries('todos'),
        onSettled: () => queryClient.refetchQueries(["todos"]),
      })
    
    return (
        <Wrapper>
            <Item>{todo.id}</Item>
            <Item>{todo.name}</Item>
            <Item>{todo.iscomplete}</Item>
            <Item>{todo.date_created}</Item>
            <Delete onClick={() => deleteTodoMutation.mutate(todo)}>Delete</Delete>
        </Wrapper>
        )
}

export default Todo;