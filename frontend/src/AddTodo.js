import React, { useState } from 'react';
import { useMutation } from 'urql';
import { gql } from 'graphql-tag';

export const ADD_TODO = gql`
  mutation($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export function AddTodo() {
  const [title, setTitle] = useState('');
  const [, addTodo] = useMutation(ADD_TODO);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addTodo({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}