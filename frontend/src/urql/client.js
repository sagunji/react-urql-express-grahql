import {
  createClient,
  fetchExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import { cacheExchange} from "@urql/exchange-graphcache";

import { createTodoOptimistic, createTodoUpdate, deleteTodoUpdate } from './todo-mutations';

import { createRevengeUpdate } from './revenge-mutations';

export default function createGraphQLClient() {
  let exchanges= [
    cacheExchange({
      optimistic: {
        createTodo: createTodoOptimistic
      },
      updates: {
        Mutation: {
          createTodo: createTodoUpdate,
          deleteTodo: deleteTodoUpdate,
          createRevenge: createRevengeUpdate
        },
      }
    }),
    fetchExchange
  ];

  return createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [devtoolsExchange, ...exchanges],
  });
}
