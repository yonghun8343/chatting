// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../redux/slice/loginSlice';

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginForm = styled.form`
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

const SpanBox = styled.span`
  width: 100%;
  height: 50px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      login({
        userId: '',
        nick: '',
        isLogin: false,
      })
    );
  }, []);

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const pwdChange = (e) => {
    setPwd(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
      pwd,
    try {
      const res = await axios.post('/users/login', {
        email,
        pwd,
      });
      if (res.status === 200) {
        dispatch(
          login({
            isLogin: true,
            userId: res.data.info.uid,
            name: res.data.info.name,
            nick: res.data.info.nick,
          })
        );
        navigate('/chatList');
      }
    } catch (error) {
      setMsg('오류가 발생하였습니다.');
    }
  };

  const moveToRegister = () => {
    navigate('/register');
  };

  return (
    <LoginWrap>
      <LoginForm onSubmit={onSubmit}>
        <div>
          <InputBox type="text" placeholder="아이디" onChange={emailChange} />
          <InputBox
            type="password"
            placeholder="비밀번호"
            onChange={pwdChange}
          />
          <span>{msg}</span>
        </div>
        <Button type="submit">로그인</Button>
      </LoginForm>
      <SpanBox onClick={moveToRegister}>회원가입</SpanBox>
    </LoginWrap>
  );
}

export default Login;
