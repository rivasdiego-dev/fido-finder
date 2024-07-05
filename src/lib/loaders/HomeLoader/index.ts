import { getAllPosts } from '../../services/post.service';

export default async function HomeLoader() {
  const postsResponse = await getAllPosts();

  if (postsResponse.isError) return { posts: [] };

  const posts = postsResponse.response.data as ApiPost[];

  return { posts };
}
