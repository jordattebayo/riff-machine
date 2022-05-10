import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { getRiffs, postRiff } from './api';
import { Riff } from './types';
import RiffItem from './Riff';

const RiffWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const RiffContainer = styled.ul`
  width: 700px;
`

export const Home: React.FC = () => {
    const queryClient = useQueryClient()

    const [riffValue, setRiffValue] = useState('');
    const [riffAuthorValue, setRiffAuthorValue] = useState('');

     // Queries
     const { error, isLoading, data, isFetching } = useQuery("riffs", getRiffs, {
        refetchInterval: 10000,
    });
     // Mutations
     const mutation = useMutation( () => {
       const newRiff: Riff = { riff: riffValue  }
       if (riffAuthorValue !== "" || riffAuthorValue === null)
       {
         newRiff.author = riffAuthorValue;
       }
       return postRiff(newRiff)
      }, {
        onSuccess: () => queryClient.invalidateQueries('riffs'),
        onSettled: () => queryClient.refetchQueries(['riffs']),
    })
  
  
    if (isLoading) return <p>Loading...</p>;
  
    if (error) return <p>An error has occurred: {error}</p>
  
    return (
        <>
      <div>
        <form onSubmit={e => {
            e.preventDefault();
            mutation.mutate()
            setRiffValue("");
            setRiffAuthorValue("");

          }}>
          <input placeholder='riff' type='text' value={riffValue} onChange={(event) => setRiffValue(event.target.value)}></input>
          <input placeholder='author' type='text' value={riffAuthorValue} onChange={(event) => setRiffAuthorValue(event.target.value)} ></input>

          <button type='submit'>Add riff</button>
        </form>
        <RiffWrapper>
          <RiffContainer>
            {data ?
            data.map(riff => (
              <RiffItem riff={riff} key={riff.id} />
              )) 
              : isFetching ? <li><p>Updating...</p></li> : <li><p>nothing loaded?</p></li>
          }
          </RiffContainer>
        </RiffWrapper>
      </div>
      </>)
  }