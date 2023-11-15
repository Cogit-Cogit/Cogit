import { Section } from '@/components/Section';
import React from 'react';
import CodeIcon from '@/icons/code.svg';
import CommentIcon from '@/icons/comment.svg'
import PrevIcon from '@/icons/prev.svg'
import Comment from './Comment';
import Button from '@/components/Button';

function CodeDetail() {
  return (
    <div className="flex justify-center">
      <Section className="h-[86vh] w-[50vw] p-5">
          <Section.Title className="justify-between">
            <div className='flex'>
            <CodeIcon alt="CodeIcon" width={36} height={36} />
            <p className="ml-2">코드</p>
            </div>
            <Button className="p-1 rounded-small bg-primary">
              <PrevIcon alt="prevIcon" width={36} height={36} />
            </Button>
          </Section.Title>
          <Section.Container>
          </Section.Container>
        </Section>
        <Section className="h-[86vh] w-[30vw] p-5">
          <Section.Title>
            <CommentIcon alt="CodeIcon" width={36} height={36} />
            <p className="ml-2">댓글</p>
          </Section.Title>
          <Section.Container>
            <Comment />
          </Section.Container>
        </Section>
    </div>
  );
}

export default CodeDetail;
