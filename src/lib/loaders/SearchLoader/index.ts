import { getAllPosts } from '../../services/post.service';

export default async function SearchLoader() {
  const postsResponse = await getAllPosts();

  if (postsResponse.isError) return [];

  const rawPosts = postsResponse.response.data as ApiPost[];

  console.log(rawPosts);

  const posts = rawPosts.sort((a, b) => {
    return (
      new Date(b.lost_datetime).getTime() - new Date(a.lost_datetime).getTime()
    );
  });

  return posts;
}
