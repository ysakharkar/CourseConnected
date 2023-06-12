import upvote from './upvote.png';

const Upvote = ({ onClick }) => {
    
    return (
        <div>
            <button onClick={onClick}>
                <img className='upvote' src={(upvote)} alt="icon" />
            </button>
        </div>
    )
}

export default Upvote
