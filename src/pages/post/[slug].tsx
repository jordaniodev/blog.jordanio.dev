import { PrismicRichText } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import Header from '../../components/Header';
import { createClient } from '../../services/prismic';
import style from './post.module.scss';

interface Post {
  slug: string;
  title: string;
  content: any;
  banner: string;
  author: string;
  updatedAt: string;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactElement {
  return (
    <div className={style.container}>
      <Header />
      <img
        src={post.banner.url}
        alt={post.title}
        className={style.bannerImage}
      />
      <h1>{post.title}</h1>
      <div className={style.postInformation}>
        <span>
          <AiOutlineCalendar />
          {post.updatedAt}
        </span>
        <span>
          <BiUser />
          {post.author}
        </span>
      </div>
      <div className={style.content}>
        <PrismicRichText
          field={post.content}
          components={{
            heading2: ({ children }) => <h2>{children}</h2>,
            paragraph: ({ children }) => <p>{children}</p>,
          }}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = createClient({});
  const { results } = await prismic.getByType('post');

  const paths = results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };

  // TODO
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = createClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: response.data.title,
    content: response.data.content,
    banner: response.data.banner,
    author: response.data.author,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
