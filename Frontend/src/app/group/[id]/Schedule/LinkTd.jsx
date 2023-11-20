import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '@/api/index';

function LinkTd({ questionId, member, solved }) {
  const [codeId, setCodeId] = useState([]);

  const [number, setNumber] = useState(0);

  const fetchCode = async () => {
    const {
      data: { data },
    } = await axios.get(`/code/code-id?memberId=${member.memberId}&algorithmQuestId=${questionId}`);
    setCodeId(data);
  };

  useEffect(() => {
    fetchCode();
    setNumber(solved);
    console.log(solved);
  }, []);

  {
    if (number == 2) {
      console.log(number);
      return (
        <td className="items-center px-4 py-3">
          <Link href={`/code/${codeId[0]}`}>
            <img className="m-auto" src="/images/cogit.png" width={40} height={40} />
          </Link>
        </td>
      );
    } else {
      return (
        <td className="items-center px-4 py-3">
          <Link href={`/code/${codeId[0]}`}>
            <img className="m-auto" src="/images/cogit_gray.png" width={40} height={40} />
          </Link>
        </td>
      );
    }
  }
}

export default LinkTd;
