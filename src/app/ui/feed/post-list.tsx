export default function PostPreview({posts}: {
    posts: Array<Post>
}) {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="m-4 bg-main-2 p-4 rounded-md shadow-md">
                <h1 className=" text-secondary-2 text-titles">this will be a post</h1>
            </div>
        </main>   
    )
}