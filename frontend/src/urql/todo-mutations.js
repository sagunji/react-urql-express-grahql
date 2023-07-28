import { gql } from 'graphql-tag';

export function createTodoOptimistic(args, cache, info) {
  return {
    __typename: 'Todo',
    id: Date.now(),
    title: "loading....",
    completed: false
  };
}

export function createTodoUpdate(result, args, cache) {
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
}

export function deleteTodoUpdate(result, args, cache) {
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
    return { ...data, todos: data.todos.filter(todo => todo.id !== args.id) }
  })
}


