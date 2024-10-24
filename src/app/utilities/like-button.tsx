export default function LikeButton ( {onClickLike, isDisabled } : { onClickLike: () => void, isDisabled : boolean }) { 
    return (
        <button onClick={onClickLike} id="like-button" type="button" className= "text-main-1 border border-main-1 md:hover:bg-secondary-1 md:hover:text-main-2 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center me-2 shadow-md absolute right-4 bottom-4 disabled:text-black disabled:bg-accent-1 disabled:hover:bg-accent-1 disabled:hover:text-black disabled:border-black" disabled={isDisabled === true}>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                    </svg>
                    <span className="sr-only">Like the post to show your support</span>
        </button>
    )
}