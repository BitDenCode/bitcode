import React from "react";

type IconProps = {
  name: string;
  alt?: string;
  size?: number;
};

const Icon: React.FC<IconProps> = ({ name, alt, size = 32 }) => {
  
  const src = `/icons/${name.toLowerCase().replace(/\s+/g, "")}.png`;

  return (
    <img
      src={src}
      alt={alt || name}
      width={size}
      height={size}
      style={{ borderRadius: "8px" }}
    />
  );
};

export default Icon;
