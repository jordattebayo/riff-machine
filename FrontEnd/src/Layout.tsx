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
import { Outlet, Link } from 'react-router-dom';
import Modal from './Modal';

//#region Styled Components
  const AppWrapper = styled.div`
    padding: 4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%
  `

  const Header = styled.header`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 100%

  `
  const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
  `

  const NavList = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    max-width: 25vw;
    padding: 0;
  `
  const NavListFirstItem = styled.li`
    padding: 0;
  `

  const NavListItem = styled.li`
    padding-left: 3em;
  `

  const BodyWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;

  `
//#endregion

export const Layout: React.FC = ({children}) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <BodyWrapper>
      <AppWrapper>
        <Header>
          <h2>Riff machine</h2>
          <NavContainer>    
            <NavList>
              <NavListFirstItem>
                <Link to="/">Riff App</Link>
              </NavListFirstItem>
              <NavListItem>
                <Link to="/todo">Todo List App</Link>
              </NavListItem>
            </NavList>
          </NavContainer>
        </Header>
        {/* { showModal ? <Modal show={showModal} riff={riff}/> : null } */}
        <Outlet />
      </AppWrapper>
  </BodyWrapper>)
  }