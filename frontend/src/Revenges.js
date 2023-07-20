import React from 'react';
import { useQuery, useMutation } from 'urql';
import { gql } from 'graphql-tag';

const GET_REVENGES = gql`
  query {
    revenges {
      id
      type
    }
  }
`;

const DELETE_REVENGE = gql`
  mutation($id: ID!) {
    deleteRevenge(id: $id) {
        id
        type
    }
  }
`;

const UPDATE_REVENGE = gql`
  mutation($id: ID!, $type: String) {
    updateRevenge(id: $id, type: $type) {
        id
        type
    }
  }
`;

export function Revenges() {
  const [result] = useQuery({ query: GET_REVENGES });
  const { data, fetching, error } = result;

  const [, deleteRevenge] = useMutation(DELETE_REVENGE);
  const [, updateRevenge] = useMutation(UPDATE_REVENGE);

  const handleUpdate = async (id) => {
    await updateRevenge({id, title: 'new revenge'});
  }

  const handleRemove = async (id) => {
    await deleteRevenge({id});
  }

  if (fetching) return 'Loading...';
  if (error) return 'Oh no!';

  return (
    <ul>
      {data?.revenges?.map(revenge => (
        <li key={revenge.id}>
          {revenge.type}
          <button onClick={() => handleRemove(revenge.id)}>X</button>
          <button onClick={() => handleUpdate(revenge.id)}>Udpate</button>
        </li>
      ))}
    </ul>
  );
}