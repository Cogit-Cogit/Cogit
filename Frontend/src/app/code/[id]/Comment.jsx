import React, { forwardRef, useEffect, useRef, useState } from 'react';
import SendIcon from '@/icons/send.svg';
import axios from '@/api/index';

function CommentItem({ nickName, contents, imgsrc, lineNum, onClick}) {

  return (
    <div className="p-4 m-3 bg-primary rounded-small" onClick={onClick}>
      <div className="flex items-center justify-between text-xl font-bold">
      <img className="m-auto rounded-large" src={`${imgsrc}`} width={30} height={30} />
      <div className="grow ml-3">{nickName}</div>
      <div>{lineNum > 0 ? lineNum + '번 라인': ''}</div>
      </div>
      <div className='m-1'>{contents}</div>
    </div>
  );
}

const CommentInput = forwardRef(function CommentInput(
  { placeholder, registerComment, fetchComments },
) {
  const inputRef = useRef(null);

  const onInputEnter = (e) => {
    if (e.keyCode !== 13) {
      return;
    }

    registerComment(inputRef.current.value);
    inputRef.current.value = '';

    fetchComments();
  };

  const onClickButton = (e) => {
    registerComment(inputRef.current.value);
    inputRef.current.value = '';

    fetchComments();
  };

  return (
    <div className="flex items-center h-12 px-4 overflow-hidden border rounded-full border-outline">
      <input
        placeholder={placeholder}
        className="h-full grow outline-0"
        ref={inputRef}
        onKeyUp={onInputEnter}
      />
      <button
        className="relative flex items-center w-8 h-8 p-1 ml-1 rounded-full bg-hover"
        onClick={onClickButton}
      >
        <SendIcon width="20" className="absolute right-[8px]" />
      </button>
    </div>
  );
});

function Comment({ codeId, registerComment, onClickComment}) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const {
      data: { data },
    } = await axios.get(`/code/detail/comment?codeId=${codeId}`);

    setComments(data);
  };

  const clickComment = (e) => {
    onClickComment(e)
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='h-[78vh] w-full'>
      <div className="overflow-auto h-[84%] mb-4 scrollbar-hide">
        {comments &&
          comments.map(( comment, idx ) => (
            <CommentItem
              key={idx}
              nickName={comment.memberNickname}
              contents={comment.commentContent}
              imgsrc={comment.memberProfileImage}
              lineNum={comment.commentLineNumber}
              onClick={() => clickComment(comment.commentLineNumber - 1)}
            />
          ))}
      </div>
      <CommentInput
        placeholder='댓글 추가'
        registerComment={registerComment}
        fetchComments={fetchComments}
      />
    </div>
  );
}

export default Comment;
