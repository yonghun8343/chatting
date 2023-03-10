import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ChatList() {
  const { userId } = useSelector((store) => store.loginState.userId);
  const { list, setList } = useState([]);

  useEffect(async () => {
    const res = await axios({
      url: '/room/list',
      method: 'get',
      params: {
        uid: userId,
      },
    });
    if (res.status === 200) {
      setList(res.data.info);
    }
  }, []);
  
  return <div>ChatList</div>;
}

export default ChatList;
