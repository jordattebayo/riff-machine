import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    background: lightblue url("https://i.ytimg.com/vi/ISXnJrITwUw/maxresdefault.jpg") no-repeat fixed center;
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

export const Layout: React.FC<{ 
  showModal: boolean, 
  setShowModal: any, 
  riffSelected: any,  
  setRiffSelected: any
    }> = ({ children, showModal, setShowModal, riffSelected, setRiffSelected}) => {

  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if(window){
      if(window.location.hostname == "localhost"){
        setIsLocal(true);
        console.log("running on localhost")
      }
    }
  },[isLocal])

  return (
    <BodyWrapper>
      <AppWrapper>
        <Header>
          <h2>Riff machine</h2>
          {isLocal ? 
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
          : null}
        </Header>
        <Outlet />
      </AppWrapper>
      { showModal ? <Modal showModal={setShowModal} riffSelected={riffSelected} setRiffSelected={setRiffSelected} /> : null }
  </BodyWrapper>)
  }