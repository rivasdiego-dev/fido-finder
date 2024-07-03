import { useLoaderData } from 'react-router-dom'

export default function LostPetPost() {

    const data = useLoaderData() as string | undefined;

    return (
        <>
            {
                data ? (
                    <div>
                        <h1>Lost Pet Post</h1>
                        <h2>Post ID: {data}</h2>
                    </div>
                ) : (
                    <div>
                        <h1>Lost Pet Post</h1>
                        <h2>Post ID: Loading...</h2>
                    </div>
                )
            }
        </>
    )
}
