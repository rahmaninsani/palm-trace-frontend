import React from "react";

const RoundedAvatar = (props) => {
  return <img src={props.src} alt={props.alt} className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />;
};

export default RoundedAvatar;
