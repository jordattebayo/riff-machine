import React from 'react';
import { Outlet } from 'react-router-dom';

export const DevOnlyRoute: React.FC = ({children}) => {

    if(window){
       if(window.location.host != "localhost"){
        <Outlet />
       }
    }
    return null
    }