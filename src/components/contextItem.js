import React, { createContext } from 'react'; 

//Context item for passing data from 
export const CommentContext = createContext(); 

//Context item for passing data from renderThread.js
export const ThreadContext = createContext(); 


export const RenderAllCommentsContext = createContext(); 

//Context item for passing data from App.js
export const AppContext = createContext(); 
