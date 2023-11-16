import { Section } from '@/components/Section';
import React, { useState, useEffect } from 'react';
import CodeIcon from '@/icons/code.svg';
import CommentIcon from '@/icons/comment.svg';
import PrevIcon from '@/icons/prev.svg';
import Comment from './Comment';
import Button from '@/components/Button';

function CodeDetail() {
  const [codeLine, setCodeLine] = useState([]);
  const [codeActive, setCodeActive] = useState(-1);
  const codeee =
    'import java.util.*;\n​\nclass Solution {\n    public int solution(int[][] targets) {\n        int answer = 0;\n        Arrays.sort(targets, (o1, o2) -> {\n            if(o1[0] == o2[0]){\n                return o2[1] - o1[1];\n            }\n            return o1[0] - o2[0];\n        });\n        \n        for(int i = 0; i < targets.length; i++){\n            int end = targets[i][1];\n            \n            while(i < targets.length - 1 && targets[i + 1][0] < end){\n                end = Math.min(end, targets[i + 1][1]);\n                i++;\n            }\n            answer++;\n        }\n        return answer;\n    }\n}';

  const toggleActive = (e) => {
    setCodeActive((prev) => {
      if (prev == e.target.value) {
        return -1;
      }
      return e.target.value;
    });
  };

  useEffect(() => {
    setCodeLine(codeee.toString().split('\n'));
  }, []);

  return (
    <div className="flex justify-center">
      <Section className="h-[86vh] w-[50vw] p-5">
        <Section.Title className="justify-between">
          <div className="flex">
            <CodeIcon alt="CodeIcon" width={36} height={36} />
            <p className="ml-2">코드</p>
          </div>
          <Button className="p-1 rounded-small bg-primary">
            <PrevIcon alt="prevIcon" width={36} height={36} />
          </Button>
        </Section.Title>
        <div className="h-[80%]">
          <div className="h-full mr-6 overflow-auto">
            {codeLine.map((code, idx) => {
              return (
                <button
                  value={idx}
                  className={
                    'flex ml-6 w-[95%] text-left  hover:bg-background' +
                    (idx == codeActive ? ' bg-hover' : '')
                  }
                  onClick={toggleActive}
                >
                  <div className="mr-6">{idx + 1}</div>
                  {code}
                </button>
              );
            })}
          </div>
        </div>
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
