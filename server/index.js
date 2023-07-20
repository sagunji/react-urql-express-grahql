const express = require('express');
const { buildSchema, GraphQLError } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const _ = require('lodash');
const fs = require('fs');
const cors = require('cors');

// Load initial data
let data = JSON.parse(fs.readFileSync('db.json'));

let revengeData = JSON.parse(fs.readFileSync('revenge.json'));

// Construct a schema
const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String
    completed: Boolean
  }

  type Revenge {
    id: ID!
    type: String
  }
  
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
    revenges: [Revenge]
    revenge(id: ID!): Revenge
  }

  type Mutation {
    createTodo(title: String): Todo
    updateTodo(id: ID!, title: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Todo
    createRevenge(type: String): Revenge
    updateRevenge(id: ID!, type: String): Revenge
    deleteRevenge(id: ID!): Revenge
  }
`);

// Map user actions to database interactions
const rootValue = {
  todos: () => data,
  todo: ({ id }) => _.find(data, { id }),
  createTodo: ({ title }) => {
    const newTodo = { id: (data.length + 1).toString(), title, completed: false };
    data.push(newTodo);
    fs.writeFileSync('db.json', JSON.stringify(data));
    return newTodo;
  },
  updateTodo: ({ id, title, completed }) => {
    const todo = _.find(data, { id });
    if (!todo) return false;
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    fs.writeFileSync('db.json', JSON.stringify(data));
    return todo;
  },
  deleteTodo: ({ id }) => {
    const todo = _.find(data, { id });
    data = _.reject(data, { id });
    fs.writeFileSync('db.json', JSON.stringify(data));
    return todo;
  },
  revenges: () => revengeData,
    revenge: ({ id }) => _.find(revengeData, { id }),
    createRevenge: ({ type }) => {
      const newRevenge = { id: (revengeData.length + 1).toString(), type };
      revengeData.push(newRevenge);
      fs.writeFileSync('revenge.json', JSON.stringify(revengeData));
      return newRevenge;
    },
    updateRevenge: ({ id, type }) => {
      const revenge = _.find(revengeData, { id });
      if (!revenge) return false;
      if (type !== undefined) revenge.type = type;
      fs.writeFileSync('revenge.json', JSON.stringify(revengeData));
      return revenge;
    },
    deleteRevenge: ({ id }) => {
      const revenge = _.find(revengeData, { id });
      revengeData = _.reject(revengeData, { id });
      fs.writeFileSync('revenge.json', JSON.stringify(revengeData));
      return revenge;
    },
};



const app = express()

// Allow cross-origin requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  graphiql: true
}));

app.listen(4000, () => console.log('Listening on 4000'));
