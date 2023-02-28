import { ReactElement } from 'react';
import { ItemListPostProps } from '../ItemListPost';
import styles from './list-post.module.scss';

interface ListPostProps {
  children: ReactElement<ItemListPostProps>[];
}

export default function ListPost({ children }: ListPostProps): ReactElement {
  return <ul className={styles.listPost}>{children}</ul>;
}
