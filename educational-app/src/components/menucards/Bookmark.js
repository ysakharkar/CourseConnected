import filledBookmark from './bookmark-filled.png';
import unfilledBookmark from './bookmark-unfilled.png';
import "./MenuCard.css";
import { useState } from 'react';

const Bookmark = ({showBookmark, onClick}) => {
    const [inverter, setInverter] = useState(false)
    
    const clicker = () => {
        setInverter(!inverter)
        onClick()
    }
    
    return (
        <div className="bookmark">
            <button onClick={clicker}>
                <img className='bookmarkImg' src={!(showBookmark&&inverter) ? (filledBookmark) : (unfilledBookmark)}/>
            </button>
        </div>
    )
}

export default Bookmark
