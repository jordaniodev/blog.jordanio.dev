import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { Post } from '../../pages';
import styles from './item-list-post.module.scss';

export interface ItemListPostProps {
  post: Post;
}
export default function ItemListPost({
  post,
}: ItemListPostProps): ReactElement {
  const [publicationDate, setPublicationDate] = useState<string>();

  useEffect(() => {
    setPublicationDate(
      new Date(post.first_publication_date).toLocaleDateString()
    );
  }, [post.first_publication_date]);

  return (
    <li className={styles.itemListPost}>
      <Link href={`/post/${post.uid}`}>
        <h2>{post.data.title}</h2>
      </Link>
      <p>{post.data.subtitle}</p>
      <footer>
        <span>
          <AiOutlineCalendar />
          {publicationDate}
        </span>
        <span>
          <BiUser />
          {post.data.author}
        </span>
      </footer>
    </li>
  );
}
