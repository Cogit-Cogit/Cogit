import React, { useState } from 'react';
import RemoveIcon from '@/icons/remove.svg';

function MemberCard({ nickname }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <div
        className="relative bg-background rounded-small"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering && (
          <div className="absolute px-10 py-16 bg-dim rounded-small">
            <RemoveIcon width={60} height={60} />
          </div>
        )}
        <img className="pt-10 m-10" src="/images/cogit.png" width={60} height={60} />
        <p className="pb-4 mt-5 text-xl text-center">{nickname}</p>
      </div>
    </div>
  );
}

export default MemberCard;
