import React from 'react';

import './Card.css';

const Card = props => {
  return (
    <div className="normal_card_container" onClick={() => props.articleClicked(props.id)}>
      <div className="normal_card_details">
        <div className="normal_card_author">
          <div className="normal_card_author_dp">
            <img src={props.authordp} alt="author" />
          </div>
          <p>{props.authorname}</p>
        </div>
        <h6>{props.title}</h6>
        <p>{props.dateposted} &bull; {props.minread} min read &#9733;</p>
      </div>
      <div className="normal_card_image">
        <img src={props.bannerimage} alt="bannerimage" />
      </div>
    </div>
  );
};

export default Card;
