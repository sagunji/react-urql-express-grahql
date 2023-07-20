import {
  createClient,
  cacheExchange as coreCacheExchange,
  fetchExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import {cacheExchange} from "@urql/exchange-graphcache";

import { gql } from 'graphql-tag';

export default function createGraphQLClient() {
  let exchanges= [
    cacheExchange({
      optimistic: {
        createTodo(args, cache, info) {
          return {
            __typename: 'Todo',
            id: Date.now(),
            title: "loading....",
            completed: false
          };
        },
      },
      updates: {
        Mutation: {
          createTodo: (result, args, cache) => {
            const GET_TODOS = gql`
              query {
                todos {
                  id
                  title
                  completed
                }
              }
            `;
            cache.updateQuery({ query: GET_TODOS }, (data) => {
              return { ...data, todos: [...data.todos, result.createTodo] }
            })
          },
          deleteTodo: (result, args, cache) => {
            cache.invalidate({
              __typename: 'Todos',
              id: args.id,
            });
          },
        },
      }
    }),
    coreCacheExchange,
    fetchExchange
  ];

  return createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [devtoolsExchange, ...exchanges],
  });
}
