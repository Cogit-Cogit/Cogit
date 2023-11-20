'use client';

import React, { useState, useEffect } from 'react';
import axios from '@/api/index';

function page() {
  const [memberList, setMemberList] = useState([]);

  const fetchMemberList = async () => {
    const {
      data: { data },
    } = await axios.get(`/member/list`);
    setMemberList(data);
  };

  useEffect(() => {
    fetchMemberList();
  }, []);

  return (
    <div>
      {memberList.map(({ memberId, memberName }, idx) => {
        return (
          <div key={idx}>
            아이디={memberId}
            이름={memberName}
          </div>
        );
      })}
    </div>
  );
}

export default page;
