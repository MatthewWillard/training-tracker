import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './LogIn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><LogIn /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});