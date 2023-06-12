import PropTypes from 'prop-types'
import Upvote from './Upvote'
import Downvote from './Downvote'
import Bookmark from './Bookmark'
import { useState, useEffect } from 'react';
import "./MenuCard.css"

const MenuCard = ({ id, date, level, imageURL, rating, upvote, downvote , title, author, text, bookmarkStatus, onBookmarkClick }) => {
    return (
        <div className="fullCard">
            <div className="mainImage">
            <a href={"/page/" + id}><img className="imageMenuCard" src={imageURL}/></a>
            </div>
            <div className="bottomHalf">
                <div className="bottomTop">
                    <div className="leftMiddle">
                        <div className="upvote">
                            <Upvote onClick = {upvote}/>
                        </div>
                        <div className="rating">
                            {rating}
                        </div>
                        <div className="downvote">
                            <Downvote onClick = {downvote}/>
                        </div>
                    </div>
                    <div className="middleMiddle">
                        <div className="title">
                            {title}
                        </div>
                        <div className="authorMenuCard">
                            by {author}
                        </div>
                        <div className="dateMenuCard">
                            {date}
                        </div>
                        <div className="level">
                            level: {level}
                        </div>
                    </div>
                    <div className="rightMiddle">
                        <div className="bookmark">
                            <Bookmark showBookmark = {bookmarkStatus} onClick = {onBookmarkClick}/>
                        </div>
                    </div>
                </div>
                <div className="bottomBottom">
                    <div className="description">
                        {text}
                    </div>
                </div>
                <div className="bottomBar">
                    
                </div>
            </div>
        </div>
    )
}

MenuCard.defaultProps = {
    title: 'Loading Title...',
    rating: 0,
    author: 'loading...',
    text: 'loading text...',
    imageURL: 'https://www.kickassfacts.com/wp-content/uploads/2018/07/loading-game-life.jpg',
}

MenuCard.propTypes = {
    title: PropTypes.string,
    rating: PropTypes.number,
    author: PropTypes.string,
    text: PropTypes.string,
    imageURL: PropTypes.string,
    upvote: PropTypes.func,
    downvote: PropTypes.func,
}

export default MenuCard
