import React from 'react';

import './BannerCard.css';
import defaultbanner from '../../../assets/images/one.jpg'

const BannerCard = props => {
    return (
        <div className="banner_card_container" onClick={() => props.articleClicked(props.id)}>
            <div className="banner_card_image">
                {props.bannerimage ?
                    <img src={props.bannerimage} alt="bannerimage" /> :
                    <img src={defaultbanner} alt="bannerimage" />
                }
            </div>
            <div className="banner_card_details">
                <div className="banner_card_author" onClick={(event) => props.authorClicked(event, props.authorId)}>
                    <div className="banner_card_author_dp">
                        <img src={props.authordp} alt="author" />
                    </div>
                    <p>{props.authorname}</p>
                </div>
                <h3>{props.title}</h3>
                <p>
                    {props.dateposted} &bull; {Math.round(props.minread / 3)} min read
                    {/* <FontAwesomeIcon icon={faBookmark} className="banner_card_bookmark" onClick={(event) => props.articleBookmarkHandler(event, props.id)} /> */}
                </p>
            </div>
        </div>
    );

};

export default BannerCard;