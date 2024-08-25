import React from "react";
import Title from "../ui/Title/Title";
import Image from "../ui/Image/Image";
import './CardR.css';

const CardR = ({ imageSrc, imageAlt, title, className, onClick}) => {
    return (
      <div className={`cardr ${className}`} onClick={onClick}>
            <Image src={imageSrc} alt={imageAlt} className="cardr-image" />
        <Title text={title} className="cardr-title"/>
      </div>
    );
  };
export default CardR