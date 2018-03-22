import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import * as firebase from 'firebase';


export default function intiApollo() {
  const httpLink = new HttpLink({
    uri: '/graphql',
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => {
      const token =  localStorage.getItem('token');
      if (token) {
        headers['authorization'] = `Bearer ${token}`;
      }
      return { headers };
    });

    return forward(operation);
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const link = ApolloLink.from([errorLink, authMiddleware, httpLink]);

  const cache = new InMemoryCache({
    logger: console.log,
    loggerEnabled: true,
  });

  const client = new ApolloClient({
    link,
    cache,
  });
  
  return client;
}
