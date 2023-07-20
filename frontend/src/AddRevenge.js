import React, { useState } from 'react';
import { useMutation } from 'urql';
import { gql } from 'graphql-tag';

export const ADD_REVENGE = gql`
  mutation($type: String!) {
    createRevenge(type: $type) {
      id
      type
    }
  }
`;

export function AddRevenge() {
  const [type, setType] = useState('');
  const [, addRevenge] = useMutation(ADD_REVENGE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRevenge({ type });
    setType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="New Revenge"
      />
      <button type="submit">Add Revenge</button>
    </form>
  );
}