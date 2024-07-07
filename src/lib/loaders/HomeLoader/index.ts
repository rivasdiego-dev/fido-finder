import { getAllPosts } from '../../services/post.service';

export default async function HomeLoader() {
  const postsResponse = await getAllPosts();

  if (postsResponse.isError) return { posts: [] };

  const rawPosts = postsResponse.response.data as ApiPost[];

  const posts = rawPosts.sort((a, b) => {
    return (
      new Date(b.lost_datetime).getTime() - new Date(a.lost_datetime).getTime()
    );
  });

  return { posts };
}
