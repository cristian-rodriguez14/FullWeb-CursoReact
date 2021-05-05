import React from "react";

import "./blogBox.scss";



const blog = (props) => (
    <div className="blog__box">
      <div className="blog__image">
        <img src={props.article.image} alt="blog story" width="370"   height="280"  />
        <div className="blog__hover flex-center">
          <h4 className="font30 weight800">VER PRODUCTO</h4>
        </div>
      </div>
      <div className="blog__info">
        <h4 className="font20 weight800">{props.article.name}</h4>
        <p className="font12 weight500 padding10" maxlength="10" >{props.article.description}</p>
        <h3 className="font17 weight800">${props.article.price}</h3>
      </div>
    </div>
  );

export default blog;
