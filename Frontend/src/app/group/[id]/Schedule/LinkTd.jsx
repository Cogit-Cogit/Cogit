import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import axios from '@/api/index';

function LinkTd ({ questionId, member, solved }) {
  const [codeId, setCodeId] = useState([]);

  const fetchCode = async () => {
    const {
      data: { data },
    } = await axios.get(`/code/code-id?memberId=${member.memberId}&algorithmQuestId=${questionId}`);
    setCodeId(data);
  };

  useEffect(() => {
    fetchCode();
  }, []);

  {
    if(solved == 2) {
      return (
        <td className='px-4 py-3 items-center'>
          <Link href={`/code/${codeId[0]}`}>
            <img className='m-auto' src="/images/cogit.png" width={40} height={40} />
          </Link>
        </td>
        )
    } else {
      return (
        <td className='px-4 py-3 items-center'>
          <Link href={`/code/${codeId[0]}`}>
            <img className='m-auto' src="/images/cogit_gray.png" width={40} height={40} />
          </Link>
        </td>
    )}
  }
};

export default LinkTd;
