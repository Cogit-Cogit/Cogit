import React, { useState } from 'react';
import Link from 'next/link';

function SiteCard({ url, image }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Link
      href={url}
      className="relative py-3"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering && (
        <div className="absolute w-full h-[100px] px-5 py-14 text-xl text-center text-white bg-dim rounded-small">
          사이트 이동하기
        </div>
      )}
      <img className="w-full h-[100px]" src={image} />
    </Link>
  );
}

export default SiteCard;
