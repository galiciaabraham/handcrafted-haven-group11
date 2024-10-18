export default function PostPreview({posts}: {
    posts: Array<Post>
}) {
    return (   
        <>
        {posts?.map((post) => (
            <div key={post.post_id} className=" relative m-4 bg-main-2 p-4 rounded-md shadow-md">
                <h2 className=" text-secondary-2 text-titles">{post.post_title}</h2>
                <p className="font-body-text text-secondary-2 p-3">{post.post_content}</p>
                <span className="font-body-text text-secondary-2 p-3 absolute right-4 top-2">{new Intl.DateTimeFormat('en-US').format(post.post_create_at)}</span>

                <button id="like-button" type="button" className= "text-main-1 border border-main-1 md:hover:bg-secondary-1 md:hover:text-main-2 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center me-2 shadow-md absolute right-4 bottom-4">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                    </svg>
                    <span className="sr-only">Like the post to show your support</span>
                </button>
                <span id="likes-count" className="font-body-text text-main-2 bg-main-1 font-extrabold p-1 absolute right-2 bottom-1 rounded-full border">{post.post_likes_count}</span>

            </div>
        ))}
            
        </>   
    )
}