import { getAllPosts } from '../../services/post.service';

export default async function SearchLoader() {
  const postsResponse = await getAllPosts();

  if (postsResponse.isError) return [];

  const posts = postsResponse.response.data as ApiPost[];

  return posts;
}
