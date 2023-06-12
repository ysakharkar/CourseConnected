import downvote from './downvote.png';

const Downvote = ({ onClick }) => {
    
    return (
        <div>
            <button onClick={onClick}>
            <img className='downvote' src={(downvote)} alt="icon" />
            </button>
        </div>
    )
}

export default Downvote
