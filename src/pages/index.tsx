import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import Header from '../components/Header';
import ItemListPost from '../components/ItemListPost';
import ListPost from '../components/ListPost';
import { createClient } from '../services/prismic';
import style from './home.module.scss';

export interface Post {
  uid?: string;
  slugs: string[];
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    first_publication_date: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): ReactElement {
  return (
    <>
      <div className={style.container}>
        <Header />
        <ListPost>
          {postsPagination.results.map(post => {
            return <ItemListPost key={post.uid} post={post} />;
          })}
        </ListPost>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient({});
  const data = await prismic.getByType('post');
  return {
    props: {
      postsPagination: data,
    },
  };
};
