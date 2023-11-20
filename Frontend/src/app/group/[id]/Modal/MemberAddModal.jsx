import React, { useRef, useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import Button from '@/components/Button';
import axios from '@/api/index';

function MemberAddModal({ isOpen, onClose, teamId }) {
  const [totalMembers, setTotalMembers] = useState([]);
  const [keyWord, setKeyWord] = useState('');

  const inputRef = useRef();

  const onClickClose = () => {
    onClose();
  };

  const onClickAddMember = async (id) => {
    console.log(id);
    if (confirm(`초대하시겠습니까??`) == true) {
      const {
        data: { data },
      } = await axios.post(`/study/member/add`, {
        teamId,
        memberId: id,
      });
      alert("초대되었습니다!");
      onClickClose();
    }
  };

  const fetchFindMember = async () => {
    const {
      data: { data },
    } = await axios.get(`/member/list`);
    setTotalMembers(data);
  };

  const searchSpace = (e) => {
    let word = e.target.value;
    setKeyWord({ word });
  };

  useEffect(() => {
    fetchFindMember();
  }, []);

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="text-center bg-white shadow-2xl" width="30vw" height="60vh">
          <Modal.Close onClick={onClickClose} />
          <Modal.Title>멤버 추가</Modal.Title>
          <div className="flex flex-row justify-between w-full">
            <Input>
              <Input.Wrapper className="w-full">
                <Input.Section
                  name="nickname"
                  placeholder="닉네임"
                  type="text"
                  className="w-full"
                  ref={inputRef}
                  onChange={searchSpace}
                ></Input.Section>
              </Input.Wrapper>
            </Input>
            <Button className="w-1/3 text-white bg-hover rounded-small">검색하기</Button>
          </div>
          <div className="overflow-auto">
            {totalMembers.map((member) => {
              if (
                keyWord == '' ||
                member.memberNickname.toLowerCase().includes(keyWord.word.toLowerCase())
              ) {
                return (
                  <div>
                    <ul>
                      <li>
                        <div
                          className="flex m-4 left-3 hover:"
                          onClick={() => onClickAddMember(member.memberId)}
                        >
                          <img src={`${member.memberProfileImage}`} width={36} height={36} />
                          <span className="ml-4">{member.memberNickname}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default MemberAddModal;
