import React from 'react';
import ReactDOM from 'react-dom';
import { Todos } from './Todos';
import { Revenges } from './Revenges';
import { AddTodo } from './AddTodo';
import { Provider } from 'urql';
import createGraphQLClient from './urql/client';
import { AddRevenge } from './AddRevenge';

function App() {
  return (
    <Provider value={createGraphQLClient()}>
      <h1>Todo App</h1>
      <AddTodo />
      <Todos />
      <h1>Revenge List</h1>
      <AddRevenge />
      <Revenges />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));