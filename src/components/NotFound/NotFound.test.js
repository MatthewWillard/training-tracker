import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

it('renders without crashing', () => {
  const history = {push: () => {}}
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><NotFound history={history}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});