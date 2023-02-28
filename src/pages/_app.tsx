/* eslint-disable jsx-a11y/anchor-has-content */
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { linkResolver } from '../services/prismic';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <Component {...pageProps} />;
    </PrismicProvider>
  );
}

export default MyApp;
