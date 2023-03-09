import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Left from './Left';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

const Right = styled.div`
  width: calc(100% - 150px);
  height: 100%;
`;

function App() {
  return (
    <Wrap>
      <Left />
      <Right>
        <Outlet />
      </Right>
    </Wrap>
  );
}

export default App;
