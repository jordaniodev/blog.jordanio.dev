import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { ReactElement } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTime, BiUser } from 'react-icons/bi';
import Header from '../../components/Header';
import { createClient } from '../../services/prismic';
import style from './post.module.scss';

interface Post {
  slug: string;
  title: string;
  content: string;
  timeToRead: string;
  banner: {
    url: string;
  };
  author: string;
  updatedAt: string;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactElement {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }
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
        <span>
          <BiTime />
          {post.timeToRead}
        </span>
      </div>
      <div
        className={style.content}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
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
  const timeToRead = Math.ceil(
    RichText.asText(response.data.content)
      .replace('.', '')
      .replace(',', '')
      .split(' ').length / 200
  );

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content),
    banner: response.data.banner,
    author: response.data.author,
    timeToRead: `${timeToRead} min`,
    updatedAt: format(new Date(response.last_publication_date), 'd MMM yyyy', {
      locale: ptBR,
    }),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
