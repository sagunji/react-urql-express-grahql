import React from 'react';
import { useQuery, useMutation } from 'urql';
import { gql } from 'graphql-tag';

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
        id
        title
        completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation($id: ID!, $title: String) {
    updateTodo(id: $id, title: $title) {
        id
        title
        completed
    }
  }
`;

export function Todos() {
  const [result] = useQuery({ query: GET_TODOS });
  const { data, fetching, error } = result;

  const [, deleteTodo] = useMutation(DELETE_TODO);
  const [, updateTodo] = useMutation(UPDATE_TODO);

  const handleUpdate = async (id) => {
    await updateTodo({id, title: 'random words'});
  }

  const handleRemove = async (id) => {
    await deleteTodo({id});
  }

  if (fetching) return 'Loading...';
  if (error) return 'Oh no!';

  return (
    <ul>
      {data?.todos?.map(todo => (
        <li key={todo.id}>
          {todo.title} - {todo.completed ? 'Completed' : 'Not completed'}
          <button onClick={() => handleRemove(todo.id)}>X</button>
          <button onClick={() => handleUpdate(todo.id)}>Udpate</button>
        </li>
      ))}
    </ul>
  );
}