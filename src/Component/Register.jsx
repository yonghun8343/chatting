import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../redux/slice/loginSlice';

const RegisterWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RegisterForm = styled.form`
  width: 50%;
  height: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;

  & div {
    width: 100%;
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: 50px;
  padding: 0px;
  border: 1px solid black;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-top: 40px;
  width: 100%;
  height: 50px;
`;

function Register() {
  const [email, setEmail] = useState('');
  const [auth, setAuth] = useState({
    auth: '',
    isAuth: 'before',
  });
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const authChange = (e) => {
    setAuth((state) => {
      return {
        auth: e.target.value,
        isAuth: state.isAuth,
      };
    });
  };

  const pwdChange = (e) => {
    setPwd(e.target.value);
  };

  const sendEmail = async () => {
    try {
      const res = await axios.post('/users/auth', {
        email,
      });
      if (res.status === 201) {
        setAuth({
          auth: '',
          isAuth: 'sending',
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      setMsg('인증번호를 발송 할 수 없습니다.');
    }
  };

  const sendAuth = () => {
    axios.post('', {
      email,
      auth,
    });
    setAuth({
      auth,
      isAuth: 'done',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pwd);
    // const res = await axios.post('', {
    //   email,
    //   pwd,
    // });
    // if (res.status === 200) {
    //   로그인
    // }
    dispatch(login({ isLogin: true }));
    navigate('/chatList');
  };

  return (
    <RegisterWrap>
      <RegisterForm onSubmit={onSubmit}>
        <InputBox
          type="email"
          onChange={emailChange}
          placeholder="이메일"
          disabled={auth.isAuth !== 'before'}
        />
        {auth.isAuth === 'before' && (
          <Button type="button" onClick={sendEmail}>
            인증하기
          </Button>
        )}
        {auth.isAuth === 'sending' && (
          <>
            <InputBox
              type="password"
              onChange={authChange}
              placeholder="인증 번호"
            />
            <span>{msg}</span>
            <Button type="button" onClick={sendAuth}>
              인증하기
            </Button>
          </>
        )}
        {auth.isAuth === 'done' && (
          <>
            <InputBox
              type="password"
              onChange={pwdChange}
              placeholder="비밀번호"
            />
            <Button type="submit">회원가입</Button>
          </>
        )}
      </RegisterForm>
    </RegisterWrap>
  );
}

export default Register;
