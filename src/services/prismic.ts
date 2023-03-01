import {
  Client,
  createClient as PrismicClient,
  getRepositoryName
} from '@prismicio/client';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';

import sm from '../../sm.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
export const linkResolver = (doc: { type: string; uid: unknown }): any => {
  if (doc.type === 'post') {
    return `/post/${doc.uid}`;
  }

  return '/';
};

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config: CreateClientConfig = {}): Client => {
  const client = PrismicClient(sm.apiEndpoint, {
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
