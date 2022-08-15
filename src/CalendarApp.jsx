import React from 'react'
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { AppRouterE } from './router/AppRouter';
import { store } from './store';


export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouterE/>
      </BrowserRouter>
    </Provider>
  )
}
