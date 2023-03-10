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
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
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

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const nickChange = (e) => {
    setNick(e.target.value);
  };

  const sendEmail = async () => {
    try {
      setisLoading(true);
      const res = await axios({
        method: 'post',
        url: '/users/auth',
        data: {
          email,
        },
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
    } finally {
      setisLoading(false);
    }
  };

  const sendAuth = async () => {
    try {
      setisLoading(true);
      const res = await axios({
        url: '/users/auth_check/',
        method: 'get',
        params: {
          email,
          digit: auth.auth,
        },
      });
      if (res.status === 200 && res.data.message === 'check complete.') {
        setAuth({
          auth,
          isAuth: 'done',
        });
      }
    } catch (error) {
      setMsg('인증 할 수 없습니다.');
    } finally {
      setisLoading(false);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setisLoading(false);
      const res = await axios({
        method: 'post',
        url: '/users/sign',
        data: {
          email,
          pwd,
          name,
          nick,
        },
      });
      if (res.status === 200 && res.data.status === 'success') {
        dispatch(login({ isLogin: true, userId: res.data.info.uid }));
        navigate('/chatList');
      }
    } catch (error) {
      setMsg('인증 할 수 없습니다.');
    } finally {
      setisLoading(false);
    }
  };

  return (
    <RegisterWrap>
      <RegisterForm onSubmit={onSubmit}>
        <InputBox
          type="email"
          onChange={emailChange}
          placeholder="이메일"
          disabled={auth.isAuth !== 'before'}
          value={email}
        />
        {auth.isAuth === 'before' && (
          <Button type="button" onClick={sendEmail} disabled={isLoading}>
            {!isLoading ? '인증하기' : '진행 중'}
          </Button>
        )}
        {auth.isAuth === 'sending' && (
          <>
            <InputBox
              type="password"
              onChange={authChange}
              placeholder="인증 번호"
              value={auth.auth}
            />
            <span>{msg}</span>
            <Button type="button" onClick={sendAuth} disabled={isLoading}>
              {!isLoading ? '인증하기' : '진행 중'}
            </Button>
          </>
        )}
        {auth.isAuth === 'done' && (
          <>
            <InputBox
              type="password"
              onChange={pwdChange}
              placeholder="비밀번호"
              value={pwd}
            />
            <InputBox
              type="text"
              onChange={nameChange}
              placeholder="이름"
              value={name}
            />
            <InputBox
              type="text"
              onChange={nickChange}
              placeholder="닉네임"
              value={nick}
            />
            <Button type="submit" disabled={isLoading}>
              {!isLoading ? '회원가입' : '진행 중'}
            </Button>
          </>
        )}
      </RegisterForm>
    </RegisterWrap>
  );
}

export default Register;
