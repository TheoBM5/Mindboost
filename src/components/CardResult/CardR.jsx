import React from "react";
import Title from "../ui/Title/Title";
import Subtitle from "../ui/Title/Subtitle";
import Image from "../ui/Image/Image";
import './CardR.css';

const CardR = ({ imageSrc, imageAlt, title, className,classTitle, classNameSub, subtitle ,onClick}) => {
    return (
      <div className={`cardr ${className}`} onClick={onClick}>
        <Image src={imageSrc} alt={imageAlt} className="cardr-image" />
        <div className="titile-sub-card">
          <Title text={title} className={`cardr-title ${classTitle}`}/>
          <Subtitle text={subtitle} className={`sub-title-card ${classNameSub}`}/>
        </div>
      </div>
    );
  };
export default CardR