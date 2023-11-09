import React, { forwardRef, useEffect, useRef, useState } from 'react';
import SendIcon from '@/icons/send.svg';
// import axios from '@/api/index';
// import { useSearchState } from './SearchContext';
// import { useSelector } from 'react-redux';

function CommentItem({ nickName, contents, deleteComment, commentId }) {
  // const { nickname: myNickName } = useSelector((state) => state.user);

  return (
    <div className="p-4 m-3 bg-primary rounded-small">
      <div className="flex items-center justify-between text-xl font-bold">
        <div className="grow">{nickName}</div>{' '}
      </div>
      <div>{contents}</div>
    </div>
  );
}

const CommentInput = forwardRef(function CommentInput(
  { placeholder, registerComment, disabled },
  ref,
) {
  const inputRef = useRef(null);

  const onInputEnter = (e) => {
    if (e.keyCode !== 13) {
      return;
    }

    registerComment(inputRef.current.value);
    inputRef.current.value = '';
  };

  const onClickButton = (e) => {
    registerComment(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <div className="flex items-center h-12 px-4 overflow-hidden border rounded-full border-outline">
      <input
        placeholder={placeholder}
        className="h-full grow outline-0"
        ref={inputRef}
        onKeyUp={onInputEnter}
        disabled={disabled}
      />
      <button
        className="relative flex items-center w-8 h-8 p-1 ml-1 rounded-full bg-hover"
        onClick={onClickButton}
        disabled={disabled}
      >
        <SendIcon width="20" className="absolute right-[8px]" />
      </button>
    </div>
  );
});

function Comment({ careaCode, jcategoryCode }) {
  // const [comments, setComments] = useState([]);
  // const { isLogin } = useSelector((state) => state.user);
  // const commentsContainerRef = useRef(null);

  // const fetchComments = async () => {
  //   const {
  //     data: { commentResponseList },
  //   } = await axios.get(`/comment/${careaCode}`);

  //   setComments(commentResponseList);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  // const deleteComment = async (commentId) => {
  //   await axios.delete(`/comment/${commentId}`);

  //   await fetchComments();
  // };

  // const registerComment = async (contents) => {
  //   await axios.post(`/comment`, {
  //     careaCode,
  //     jcategoryCode,
  //     contents,
  //   });

  //   fetchComments();
  // };

  const comments = [
    {
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },{
      "codeId": 8,
      "nickname": 3,
      "commnetLineNumber": 16,
      "commentContent": "코드에서 냄새가 너무 심합니다"
    },
  ]

  return (
    <div className='h-[78vh] w-full'>
      <div className="overflow-auto h-[84%] mb-4 scrollbar-hide">
        {comments &&
          comments.map(( comment, idx ) => (
            <CommentItem
              key={idx}
              nickName={comment.nickname}
              contents={comment.commentContent}
            />
          ))}
      </div>
      <CommentInput
        placeholder='댓글 추가'
      />
    </div>
  );
}

export default Comment;
