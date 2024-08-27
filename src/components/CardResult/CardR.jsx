import React from "react";
import Title from "../ui/Title/Title";
import Subtitle from "../ui/Title/Subtitle";
import Image from "../ui/Image/Image";
import './CardR.css';

const CardR = ({ imageSrc, imageAlt, title, className, classNameSub, subtitle ,onClick}) => {
    return (
      <div className={`cardr ${className}`} onClick={onClick}>
            <Image src={imageSrc} alt={imageAlt} className="cardr-image" />
        <Title text={title} className="cardr-title"/>
        <Subtitle text={subtitle} className={classNameSub}/>
      </div>
    );
  };
export default CardR