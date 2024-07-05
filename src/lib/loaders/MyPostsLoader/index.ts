import { getMyPosts } from "../../services/post.service";

export default async function MyPostsLoader() {
    const response = await getMyPosts();

    if (response.isError) {
        return undefined;
    }

    return response.response.data;
}