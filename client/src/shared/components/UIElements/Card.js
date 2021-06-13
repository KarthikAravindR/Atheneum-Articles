import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBookmark } from '@fortawesome/free-regular-svg-icons'

import './Card.css';

const Card = props => {
  return (
    <div className="normal_card_container" onClick={() => props.articleClicked(props.id)}>
      <div className="normal_card_details">
        <div className="normal_card_author" onClick={(event) => props.authorClicked(event,props.authorId)}>
          <div className="normal_card_author_dp">
            <img src={props.authordp} alt="author" />
          </div>
          <p>{props.authorname}</p>
        </div>  
        <h6>{props.title}</h6>
        <p>
          {props.dateposted} &bull; {Math.round(props.minread / 3)} min read
          {/* <FontAwesomeIcon icon={faBookmark} className='normal_card_bookmark' onClick={(event) => props.articleBookmarkHandler(event, props.id)} /> */}
        </p>
      </div>
      <div className="normal_card_image">
        {props.bannerimage ? 
          <img src={props.bannerimage} alt="bannerimage" /> :
          <p></p>
        }
      </div>
    </div>
  );
};

export default Card;
