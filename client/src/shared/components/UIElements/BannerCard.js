import React from 'react';

import './BannerCard.css';

const BannerCard = props => {
    return (
        <div className="banner_card_container" onClick={() => props.articleClicked(props.id)}>
            <div className="banner_card_image">
                <img src={props.bannerimage} alt="bannerimage" />
            </div>
            <div className="banner_card_details">
                <div className="banner_card_author">
                    <div className="banner_card_author_dp">
                        <img src={props.authordp} alt="author" />
                    </div>
                    <p>{props.authorname}</p>
                </div>
                <h2>{props.title}</h2>
                <p>{props.dateposted} &bull; {props.minread} min read &#9733;</p>
            </div>
        </div>
    );

};

export default BannerCard;