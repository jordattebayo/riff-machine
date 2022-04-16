import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Todo from './Todo';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { TodoItem } from "./types";
import { getTodos, postTodo } from './api'
import { Outlet } from 'react-router-dom';

const AppWrapper = styled.div`
  padding: 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`
const BodyWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`
const TodoList = styled.ul`
  list-style: none;
`

export const Layout: React.FC = ({children}) => {
    const queryClient = useQueryClient()

    const [inputValue, setInputValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
     // Queries
     const { error, isLoading, data, isFetching } = useQuery("todos", getTodos, {
        refetchInterval: 10000,
    });
     // Mutations
     const mutation = useMutation( () => {
       const newTodo: TodoItem = { iscomplete: statusValue, name: inputValue } 
       return postTodo(newTodo)
      }, {
        onSuccess: () => queryClient.invalidateQueries('todos'),
        onSettled: () => queryClient.refetchQueries(["todos"]),
    })
  
  
    if (isLoading) return <p>Loading...</p>;
  
    if (error) return <p>An error has occurred: {error}</p>
  
    return (
    <BodyWrapper>
      <AppWrapper>
        <div>
          <h2>Riff machine</h2>
        </div>
        <Outlet />
      </AppWrapper>
  </BodyWrapper>)
  }