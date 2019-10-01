import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Addemployee from './Addemployee';

it('renders without crashing', () => {
  const history = {push: () => {}}
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Addemployee history={history}/>
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});