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
import { resolveProjectReferencePath } from 'typescript';

export const Home: React.FC = () => {
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
        <>
      <div>
        <h2>Test</h2>
      </div>
      </>)
  }