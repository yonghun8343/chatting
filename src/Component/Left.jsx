import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import chat from '../assets/bubble-chat.png';
import join from '../assets/join.png';
import login from '../assets/login.png';
import setting from '../assets/settings.png';

const LeftWrap = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NavStyle = styled(NavLink)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  & img {
    display: block;
    width: 70%;
    height: auto;
  }
`;

const BtnStyle = styled(NavLink)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  & img {
    display: block;
    width: 70%;
    height: auto;
    opacity: 0.3;
  }
`;

const LeftWrapTop = styled.div`
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

function Left() {
  const isLogin = useSelector((state) => state.loginState.isLogin);

  return (
    <LeftWrap>
      <LeftWrapTop>
        {!isLogin ? (
          <NavStyle to="/">
            <img src={login} alt="" />
          </NavStyle>
        ) : (
          <BtnStyle>
            <img src={login} alt="" />
          </BtnStyle>
        )}
        {isLogin ? (
          <NavStyle to="/chatList">
            <img src={chat} alt="" />
          </NavStyle>
        ) : (
          <BtnStyle>
            <img src={chat} alt="" />
          </BtnStyle>
        )}
        {isLogin ? (
          <NavStyle to="/chatRoom">
            <img src={join} alt="" />
          </NavStyle>
        ) : (
          <BtnStyle>
            <img src={join} alt="" />
          </BtnStyle>
        )}
      </LeftWrapTop>
      {isLogin ? (
        <NavStyle to="/myPage">
          <img src={setting} alt="" />
        </NavStyle>
      ) : (
        <BtnStyle>
          <img src={setting} alt="" />
        </BtnStyle>
      )}
    </LeftWrap>
  );
}

export default Left;
