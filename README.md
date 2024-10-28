<div align="center">
    <img src="https://github.com/user-attachments/assets/5818c899-a70d-45f9-b33f-2e24951b5c9a" alt="studiousblackpug" width="400">
</div>

<h1 align="center">GraphQL API</h1>

<p align="center">
    This project involved building a GraphQL API using Express, Mongoose, and MongoDB Atlas to manage and interact with Projects and Tasks. Through implementing queries, mutations, and type relationships, the API provides a flexible and efficient way to fetch, add, and manipulate data. The project demonstrated how to set up a scalable backend that can be easily integrated with front-end clients using tools like GraphiQL for testing and MongoDB Atlas for database management.
</p>



## Resources

- [GraphQL](https://graphql.org/)
- [GraphQL: Schemas and Types](https://graphql.org/learn/schema/)
- [GraphQL: Queries and Mutations](https://graphql.org/learn/queries/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Apollo-boost](https://www.npmjs.com/package/apollo-boost)
- [Apollo Client (React)](https://www.apollographql.com/docs/react)

</details>

## Learning Objectives

<details>
  <summary><strong>What GraphQL means</strong></summary>
  
  GraphQL is a query language for APIs that allows clients to request exactly the data they need, and nothing more. It provides a more efficient, powerful, and flexible alternative to traditional REST APIs by enabling clients to specify the shape and structure of the response. 

  **Tasks Covered:** Task 0 (initial setup of GraphQL server and schema), Task 1 (Root Query), Task 2 (testing queries in GraphiQL), Task 3 (GraphQL ID type).

</details>

<details>
  <summary><strong>What is GraphiQL</strong></summary>

  GraphiQL is an in-browser tool that allows developers to interact with their GraphQL API. It enables you to write, test, and execute GraphQL queries and mutations, making it easy to see the structure of the data you can query. It also provides features like auto-completion and query formatting.

  **Tasks Covered:** Task 2 (initial setup and testing with GraphiQL), Task 7 (testing mutations with GraphiQL).

</details>

<details>
  <summary><strong>How to test queries using GraphiQL</strong></summary>

  To test queries in GraphiQL, navigate to `http://localhost:4000/graphql` after starting your server. You can write and execute GraphQL queries and mutations directly in the interface. For example, to fetch all tasks or add a new project, simply input the appropriate query or mutation and click the "Run" button.

  **Tasks Covered:** Task 2 (testing queries), Task 5 (testing root queries), Task 7 (testing mutations).

</details>

<details>
  <summary><strong>What is Apollo</strong></summary>

  Apollo is a popular client library for interacting with GraphQL APIs. It simplifies the process of making GraphQL queries and mutations from a front-end application, handling data caching, state management, and error handling. Apollo also supports integrations with various frameworks like React, Angular, and Vue.js.

  **Tasks Covered:** Although Apollo was not directly implemented in this project, knowledge of GraphQL gained in Tasks 0-8 would help in understanding how to use Apollo with a GraphQL server.

</details>

<details>
  <summary><strong>How to connect to MongoDB</strong></summary>

  To connect to MongoDB, we used Mongoose, a Node.js library that simplifies interactions with MongoDB. After setting up a cluster on MongoDB Atlas, we connected to it using a connection string. We set up models for `Projects` and `Tasks` to interact with the database, enabling us to store, query, and manage data directly.

  **Tasks Covered:** Task 6 (connecting to MongoDB Atlas), Task 8 (updating resolve functions to use MongoDB).

</details>

<details>
  <summary><strong>How to make queries from React</strong></summary>

  To make GraphQL queries from React, you would typically use a client like Apollo Client. After setting up the GraphQL server (as done in this project), you can configure Apollo Client in your React application to make queries and mutations, automatically updating your UI when data changes.

  **Tasks Covered:** While the project did not cover React specifically, the knowledge from Tasks 0-8 can be applied to making queries from React using Apollo Client or other GraphQL libraries.

</details>

<details>
  <summary><strong>How to make a GraphQL server accept requests from another server</strong></summary>

  To make a GraphQL server accept requests from another server, you need to configure CORS (Cross-Origin Resource Sharing) on the server. By enabling CORS, you can control which domains are allowed to send requests to your GraphQL server. In Express, you can achieve this using the `cors` middleware.

  **Tasks Covered:** The project setup in Task 0 can be extended to include CORS configuration for handling requests from other servers.

</details>



## Requirements

- Allowed editors: vi, vim, emacs, Visual Studio Code
- Files will be interpreted/compiled on Ubuntu 18.04 LTS using Node (version 12.x.x)
- All files should end with a new line
- A `README.md` file, at the root of the project folder, is mandatory
- Code should use the `.js` extension

</details>

## Set Up
<details><summary><strong>Instructions</strong></summary>

**Install NodeJS**
*(in your home directory):*
```bash
sudo apt install nodejs 
node -v  # Output: v12.x.x
npm -v   # Output: ...
```

**Setup Express and GraphQL**
*(In your server folder of the GraphQL server):*
```bash
# Add package.json
npm init

# Install Express and save to dependencies
npm install express --save

# Set up GraphQL
npm install graphql express-graphql
```

**Setup Apollo**
```bash
npm i apollo-boost graphql react-apollo --save
```

</details>


## Tasks and Usage

### Task 0: GraphQL Schema

This task involves setting up a basic GraphQL schema using `express-graphql` middleware within an Express server. We defined a `TaskType` with several fields and ensured that the GraphQL server was correctly set up to use this schema.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

The file `app.js` of the folder `server` is initializing the Express server with `express-graphql` which is a middleware, applied here to just a single route, the `/graphql` route:

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
}));
app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
```

When you run the command: `npm run start`

```bash
khaoula@khaoula-HP-Laptop-15-dw3xxx:~/Holberton/GraphQL_playlist/server$ npm run start
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
now listening for request on port 4000
```

You will obtain in the browser [http://localhost:4000/graphql](http://localhost:4000/graphql) the following error:

From the message, you can understand that we must pass an object which contains the `schema` property.

Create the file `schema.js`, in which:

- Require `graphql`.
- Add `GraphQLObjectType` object using the object destructuring syntax (`const { prop1, prop2, prop3, …, propN } = object` and `object` in our case is `graphql`).
- Create a new `GraphQLObjectType`: `TaskType` which contains 2 parameters:
  - `name: Task`
  - `fields` property: an object that contains a set of properties. In our case, `fields` will contain:
    - `id` of type `GraphQLString`
    - `title` of type `GraphQLString`
    - `weight` of type `GraphQLInt`
    - `description` of type `GraphQLString`
- Note: Don’t forget to import these types using the object destructuring syntax that contains `GraphQLObjectType`.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Create Project Structure:**

   Begin by creating the necessary directories and files:

   ```bash
   mkdir GraphQL_API
   cd GraphQL_API
   mkdir server
   cd server
   touch app.js
   mkdir schema
   cd schema
   touch schema.js
   ```

2. **Install Required Dependencies:**

   Navigate to the `server` directory and install the following:

   ```bash
   npm install express express-graphql graphql
   ```

3. **Configure `app.js`:**

   Set up the Express server and apply `express-graphql` middleware:

   ```javascript
   const express = require('express');
   const { graphqlHTTP } = require('express-graphql');
   const schema = require('./schema/schema');

   const app = express();

   app.use('/graphql', graphqlHTTP({
       schema: schema,
       graphiql: true
   }));

   app.listen(4000, () => {
       console.log('Now listening for requests on port 4000');
   });
   ```

4. **Define `TaskType` in `schema.js`:**

   Create a GraphQL object type to describe the structure of a `Task`:

   ```javascript
   const graphql = require('graphql');
   const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;

   const TaskType = new GraphQLObjectType({
       name: 'Task',
       fields: {
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString }
       }
   });

   // Placeholder setup, which overlaps with Task 1
   const RootQuery = new GraphQLObjectType({
       name: 'RootQueryType',
       fields: {
           task: {
               type: TaskType,
               args: { id: { type: GraphQLID } },
               resolve(parent, args) {
                   return {
                       id: '1',
                       title: 'Sample Task',
                       weight: 10,
                       description: 'Love'
                   };
               }
           }
       }
   });

   module.exports = new GraphQLSchema({
       query: RootQuery
   });
   ```

5. **Run the Server:**

   Use `npm run start` to start the server:

   ```bash
   npm run start
   ```

6. **Test the GraphQL Schema Using GraphiQL:**

   Open your browser and go to [http://localhost:4000/graphql](http://localhost:4000/graphql). Run the following query:

   ```graphql
   {
     task(id: "1") {
       id
       title
       weight
       description
     }
   }
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involved setting up a basic GraphQL schema and server using `express-graphql`, including a `TaskType` definition.
- **Where:** The implementation is located in `server/app.js` and `server/schema/schema.js`.
- **Why:** It sets the foundation for interacting with GraphQL APIs by defining object types and connecting them to an Express server.
- **How:** By using `express-graphql`, we created an Express server that serves a GraphQL endpoint and set up a placeholder root query.
- **Who:** This setup is important for developers building flexible APIs.
- **When:** This is the foundational step for building the GraphQL API.

</details>

<details>
  <summary><strong>Troubleshooting</strong></summary>

- **Issue:** `Unexpected <EOF>` error when accessing `/graphql`.
  
  - **Solution:** Ensure you type and complete a valid GraphQL query in the GraphiQL interface. Example:
  
    ```graphql
    {
      task(id: "1") {
        id
        title
        weight
        description
      }
    }
    ```

</details>



### Task 1: Root Query

This task focuses on creating a `RootQuery` to allow querying for a particular task by ID. It builds on the schema already set up in Task 0.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

Root field is at the top level of every GraphQL server. It is a type that represents all of the possible entry points into the GraphQL API; it’s often called the Root type or the Query type. The objective of this task is to create a root query to query for a particular task. 

Create `RootQuery`: a new `GraphQLObjectType` in the `schema.js` file which contains the following parameters:

- **name:** `RootQueryType`
- **fields** property will contain the field `task`, which will contain:
  - **type:** `TaskType`
  - **args** (any type of arguments can be added): in our case, we will query for a particular task using the `id` of type `GraphQLString` which should be the argument.
  - **resolve** function where you write code to get whichever data needed from the database. In this task, we will create an empty function of prototype: `resolve(parent, args)`
  
At the end of the file, make sure you export your `GraphQLSchema` with your `RootQuery` and be sure you have imported it using the object destructuring syntax.

In `app.js` file, require the `schema.js` file and add `schema` in an object we pass to the `graphqlHTTP()` constructor to correct the error related to the schema in the middleware.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Ensure `schema.js` Has `RootQueryType` Correctly Defined:**

   Confirm that your `schema.js` includes the following:

   ```javascript
   const graphql = require('graphql');
   const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;

   const TaskType = new GraphQLObjectType({
       name: 'Task',
       fields: {
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString }
       }
   });

   const RootQuery = new GraphQLObjectType({
       name: 'RootQueryType',
       fields: {
           task: {
               type: TaskType,
               args: { id: { type: GraphQLID } }, 
               resolve(parent, args) {
                   return {
                       id: '1',
                       title: 'Sample Task',
                       weight: 10,
                       description: 'Love'
                   };
               }
           }
       }
   });

   module.exports = new GraphQLSchema({
       query: RootQuery
   });
   ```

2. **Ensure `app.js` is Configured to Use the Schema:**

   Confirm that `app.js` correctly imports the `schema.js` file and applies it to the `/graphql` route:

   ```javascript
   const express = require('express');
   const { graphqlHTTP } = require('express-graphql');
   const schema = require('./schema/schema'); // Import the schema

   const app = express();

   app.use('/graphql', graphqlHTTP({
       schema: schema, // Use the schema defined in schema.js
       graphiql: true
   }));

   app.listen(4000, () => {
       console.log('Now listening for requests on port 4000');
   });
   ```

3. **Run the Server Using `npm run start`:**

   Use `npm run start` to start the server:

   ```bash
   npm run start
   ```

4. **Test the GraphQL Query:**

   Open your browser and go to [http://localhost:4000/graphql](http://localhost:4000/graphql). Run the following query:

   ```graphql
   {
     task(id: "1") {
       id
       title
       weight
       description
     }
   }
   ```

   **Expected Output:**

   ```json
   {
     "data": {
       "task": {
         "id": "1",
         "title": "Sample Task",
         "weight": 10,
         "description": "Love"
       }
     }
   }
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involved creating a `RootQueryType` to enable querying for a specific task using an ID. The `RootQuery` serves as the entry point for our GraphQL API.
- **Where:** The implementation is located in `server/schema/schema.js`. The root query is integrated with the `/graphql` endpoint defined in `server/app.js`.
- **Why:** In GraphQL, the root query defines how users can interact with the API. This task sets up a way to query specific tasks by their ID, which is essential for fetching particular data.
- **How:** We used `GraphQLObjectType` to define `RootQueryType` and `TaskType`, and then linked the root query to the `task` field. The `resolve` function returns static data as a placeholder.
- **Who:** This setup is important for developers building APIs that need to fetch and display data based on specific identifiers (e.g., fetching a task by ID).
- **When:** This process is required when setting up a GraphQL API to manage specific, structured data efficiently.

</details>



### Task 2: Resolve Function and Test Query in GraphiQL

In this task, we created dummy data to be used in the resolve function. We set up an array of tasks in `schema.js` and used lodash to simplify finding a specific task by its ID. We then used GraphiQL to test the query and verify the setup.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

In this task, you will create dummy data to be used in the resolve function. In the file `schema.js`, create an array `tasks` containing these 2 different task objects:

```json
{id: ’1’, title: ’Create your first webpage’, weight: 1, description: ’Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)’}
{id: ’2’, title: ’Structure your webpage’, weight: 1, description: ’Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order’}
```

Install and require the module `lodash` to avoid using Vanilla JavaScript and make the code easier. In the resolve function, use the `id` from `args` parameter to find the task of a given `id` from the `tasks` array using lodash and return it.

In the file `app.js`, add the property `graphiql: true` to the `graphqlHTTP` constructor to be able to use GraphiQL: a great tool to test GraphQL API obtained in the link [http://localhost:4000/graphql](http://localhost:4000/graphql). Before adding `graphiql: true`, you will get the following error:

After adding the property, when you visit the [http://localhost:4000/graphql](http://localhost:4000/graphql) URL, you will see GraphiQL in action.

When you click "Docs" in the top right of GraphiQL, you will see in Root types: `query: RootQueryType`. This panel will tell you about the GraphQL server you are making queries to. In our case, it will give an idea about the properties used in the object `Task` and show how to make a request for a `Task` using the `id`.

In a file `graphiql2`, write the query in GraphiQL that will give you the `title`, the `weight`, and the `description` of the task with `id: "2"` and return the following result:

```json
{
  "data": {
    "task": {
      "title": "Structure your webpage",
      "weight": 1,
      "description": "Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order"
    }
  }
}
```

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Install Lodash:**

   Navigate to your `server` directory and install `lodash`:

   ```bash
   npm install lodash --legacy-peer-deps
   ```

2. **Update `schema.js` to Include Dummy Data and Use Lodash:**

   Modify `schema.js` to add the `tasks` array and implement the `resolve` function using lodash:

   ```javascript
   const graphql = require('graphql');
   const _ = require('lodash'); // Import lodash
   const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;

   // Dummy data
   const tasks = [
       {
           id: '1',
           title: 'Create your first webpage',
           weight: 1,
           description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)'
       },
       {
           id: '2',
           title: 'Structure your webpage',
           weight: 1,
           description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order'
       }
   ];

   const TaskType = new GraphQLObjectType({
       name: 'Task',
       fields: {
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString }
       }
   });

   const RootQuery = new GraphQLObjectType({
       name: 'RootQueryType',
       fields: {
           task: {
               type: TaskType,
               args: { id: { type: GraphQLID } }, 
               resolve(parent, args) {
                   // Use lodash to find the task by id
                   return _.find(tasks, { id: args.id });
               }
           }
       }
   });

   module.exports = new GraphQLSchema({
       query: RootQuery
   });
   ```

3. **Ensure `graphiql: true` is Set in `app.js`:**

   Confirm that `app.js` already has `graphiql: true` set up:

   ```javascript
   const express = require('express');
   const { graphqlHTTP } = require('express-graphql');
   const schema = require('./schema/schema');

   const app = express();

   app.use('/graphql', graphqlHTTP({
       schema: schema,
       graphiql: true // Ensures GraphiQL is enabled
   }));

   app.listen(4000, () => {
       console.log('Now listening for requests on port 4000');
   });
   ```

4. **Run the Server Using `npm run start`:**

   Use `npm run start` to start the server:

   ```bash
   npm run start
   ```

5. **Write and Save the Query in `graphiql2`:**

   Create a file `graphiql2` in your `server` directory and write the following GraphiQL query:

   ```graphql
   {
     task(id: "2") {
       title
       weight
       description
     }
   }
   ```

6. **Test the Query in GraphiQL:**

   Open your browser and go to [http://localhost:4000/graphql](http://localhost:4000/graphql). Run the query you wrote in `graphiql2`. 

**Expected Output:**
```json
{
  "data": {
    "task": {
      "title": "Structure your webpage",
      "weight": 1,
      "description": "Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order"
    }
  }
}
```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involved setting up dummy data, using lodash to simplify data retrieval, and testing the query with GraphiQL.
- **Where:** The dummy data and updated `resolve` function are in `server/schema/schema.js`. The `graphiql2` file containing the query is also in the `server` directory.
- **Why:** Using dummy data and enabling GraphiQL helps in testing and verifying the GraphQL API before connecting to a real database.
- **How:** Lodash was used to find the task by `id` in the `resolve` function, and GraphiQL was enabled to allow running queries directly through the browser.
- **Who:** This is important for developers building APIs who need to test and ensure that data retrieval works as expected.
- **When:** This setup allows for testing at any stage of development to confirm that the query logic is correctly implemented.

</details>


### Task 3: GraphQL ID Type and Project Type

In this task, we updated the `id` fields to use `GraphQLID` instead of `GraphQLString` for added flexibility. We also created a new `ProjectType` and added it to the `RootQueryType` to allow querying for projects. This task sets up the ability to query both tasks and projects using GraphQL.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

In the previous tasks, you used the type string for the `id` but to be a bit more flexible, you can use a type called `GraphQLID`. So, the `id` must be an ID type not necessarily a string, and you can write the `id` without the quotations in your request, and it still works.

Change the type of `id` to `GraphQLID` and do all the necessary changes to your code.

Create a new `GraphQLObjectType`: `ProjectType` which contains 2 parameters:

- **name:** `Project`
- **fields** property: object containing a set of properties. In our case, fields will contain:
  - `id` of type `GraphQLID`
  - `title` of type `GraphQLString`
  - `weight` of type `GraphQLInt`
  - `description` of type `GraphQLString`

Do the same steps that you did with the type `TaskType` in the `RootQueryType` with the new field `project` of type `ProjectType`. In the `resolve` function, use the `id` to find a project.

To test your queries in GraphiQL, create an array `projects` that contains these 2 different project objects:

```json
{id: ’1’, title: ’Advanced HTML’, weight: 1, description: ’Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!’}
{id: ’2’, title: ’Bootstrap’, weight: 1, description: ’Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.’}
```

Note: In the `RootQueryType` of the Documentation Explorer, the field `project(id: ID): Project` will be added.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Change `id` Types to `GraphQLID`:**
   
   Update your existing `TaskType` and any relevant code to use `GraphQLID` instead of `GraphQLString` for `id`.

2. **Create a New `ProjectType` in `schema.js`:**
   
   Define a new GraphQL object type, `ProjectType`, similar to `TaskType` but for projects:

   ```javascript
   const ProjectType = new GraphQLObjectType({
       name: 'Project',
       fields: {
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString }
       }
   });
   ```

3. **Add Dummy Data for Projects:**

   Create an array called `projects` that contains the two project objects:

   ```javascript
   const projects = [
       {
           id: '1',
           title: 'Advanced HTML',
           weight: 1,
           description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!'
       },
       {
           id: '2',
           title: 'Bootstrap',
           weight: 1,
           description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'
       }
   ];
   ```

4. **Update `RootQuery` to Include `ProjectType`:**

   Add a new field `project` to `RootQueryType` so you can query projects using `GraphQLID`:

   ```javascript
   const RootQuery = new GraphQLObjectType({
       name: 'RootQueryType',
       fields: {
           task: {
               type: TaskType,
               args: { id: { type: GraphQLID } },
               resolve(parent, args) {
                   return _.find(tasks, { id: args.id });
               }
           },
           project: {
               type: ProjectType,
               args: { id: { type: GraphQLID } },
               resolve(parent, args) {
                   return _.find(projects, { id: args.id });
               }
           }
       }
   });
   ```

5. **Run the Server Using `npm run start`:**

   Use `npm run start` to start the server:

   ```bash
   npm run start
   ```

6. **Test Queries in GraphiQL:**

   - **Task Query Example:**
     ```graphql
     {
       task(id: 2) {
         title
         weight
         description
       }
     }
     ```
   
   - **Project Query Example:**
     ```graphql
     {
       project(id: 1) {
         title
         weight
         description
       }
     }
     ```

   **Expected Output for Project Query:**
   ```json
   {
     "data": {
       "project": {
         "title": "Advanced HTML",
         "weight": 1,
         "description": "Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!"
       }
     }
   }
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involved changing the `id` field to `GraphQLID` and adding a new `ProjectType` to the GraphQL schema. It sets up the ability to query for both tasks and projects.
- **Where:** The changes were made in `server/schema/schema.js`. The `TaskType` and `ProjectType` definitions and the updated `RootQuery` are all located in this file.
- **Why:** Using `GraphQLID` makes the ID fields more flexible, and adding `ProjectType` allows for better demonstration of querying multiple types of objects in GraphQL.
- **How:** We defined a new `GraphQLObjectType` for projects, added dummy data, and updated `RootQuery` to include a resolver for projects.
- **Who:** This is useful for developers building GraphQL APIs that need to handle different types of queries and objects.
- **When:** This setup is required whenever the application needs to support querying for different types of data (e.g., tasks and projects).

</details>

<details>
  <summary><strong>Troubleshooting</strong></summary>

- **Issue:** GraphiQL shows an error when querying with `id` as a number.
  
  - **Solution:** Ensure you are using `GraphQLID`, which accepts IDs without quotes. Double-check your schema setup and query syntax.

- **Issue:** `Project` query returns `null`.
  
  - **Solution:** Verify that the `projects` array contains the correct `id` values and that lodash is properly finding the matching object. Make sure the IDs match exactly.

- **Issue:** Cannot find `ProjectType` in the schema.
  
  - **Solution:** Ensure `ProjectType` is correctly defined and added to the `RootQuery` in the exported schema. Restart the server if necessary.

</details>

### Task 4: Type Relations

In this task, we established a relationship between `Project` and `Task` to illustrate how objects can be connected in GraphQL. Each `Task` will reference a `Project`, and each `Project` can contain multiple `Tasks`. This setup allows for more complex queries that retrieve related data in a single request.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

From the final graph in the description, you can conclude that there is a relation between `Project` and `Task`. Each `Task` will be related to a `Project`, and each `Project` can contain 0 to multiple `Tasks`.

- Add to the 2 objects in the `tasks` array the property `projectId` with the value `'1'`.
- Add the object `project` to the fields of `TaskType`:
  - Specify the type to `ProjectType`
  - Add the `resolve` function to find from `projects` the one that has an `id` property equal to `projectId` in the parent object.
- To test in GraphiQL, in a file `graphiql4_1`, write the query that will give you the `title`, `weight`, and `description` of the task with `id: "2"` and the `title` of the project.
- Add the object `tasks` to the field of `ProjectType`:
  - Specify the type as a list of `TaskType` (use `GraphQLList`)
  - Add the `resolve` function to filter the `tasks` array for tasks where `projectId` matches the `id` in the parent object.
- To test in GraphiQL, in a file `graphiql4_2`, write the query that will give you the `title`, `weight`, and `description` of the project with `id: "1"` and the titles of its tasks.

**Important Remark:**
Wrap the `fields` property inside a function. Without wrapping, you may encounter an error (`TypeError: Failed to fetch`) because the code runs top to bottom. Wrapping ensures the function only executes after the entire file is processed, avoiding reference issues between `TaskType` and `ProjectType`.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Add `projectId` to Tasks:**

   We updated the `tasks` array to include a `projectId` field:
   ```javascript
   const tasks = [
       {
           id: '1',
           title: 'Create your first webpage',
           weight: 1,
           description: 'Create your first HTML file...',
           projectId: '1' // Added projectId
       },
       {
           id: '2',
           title: 'Structure your webpage',
           weight: 1,
           description: 'Copy the content of 0-index.html...',
           projectId: '1' // Added projectId
       }
   ];
   ```

2. **Update `TaskType` to Reference `ProjectType`:**

   We modified `TaskType` to include a `project` field:
   ```javascript
   const TaskType = new GraphQLObjectType({
       name: 'Task',
       fields: () => ({
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString },
           project: {
               type: ProjectType, // Reference to ProjectType
               resolve(parent, args) {
                   return _.find(projects, { id: parent.projectId });
               }
           }
       })
   });
   ```

3. **Update `ProjectType` to Include a List of Tasks:**

   We added a `tasks` field to `ProjectType`:
   ```javascript
   const ProjectType = new GraphQLObjectType({
       name: 'Project',
       fields: () => ({
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString },
           tasks: {
               type: new GraphQLList(TaskType), // List of TaskType
               resolve(parent, args) {
                   return _.filter(tasks, { projectId: parent.id });
               }
           }
       })
   });
   ```

4. **Wrap `fields` in Functions:**
   
   Wrapping `fields` in functions ensures that `TaskType` and `ProjectType` can reference each other without causing errors. This is essential because otherwise, the code may try to access `TaskType` or `ProjectType` before they are fully defined.

5. **Run the Server Using `npm run start`:**

   Use the following command:
   ```bash
   npm run start
   ```

6. **Write and Test Query in `graphiql4_1`:**

   Create `graphiql4_1` and add:
   ```graphql
   {
     task(id: "2") {
       title
       weight
       description
       project {
         title
       }
     }
   }
   ```

   **Expected Output:**
   ```json
   {
     "data": {
       "task": {
         "title": "Structure your webpage",
         "weight": 1,
         "description": "Copy the content of 0-index.html into 1-index.html Create the head and body sections...",
         "project": {
           "title": "Advanced HTML"
         }
       }
     }
   }
   ```

7. **Write and Test Query in `graphiql4_2`:**

   Create `graphiql4_2` and add:
   ```graphql
   {
     project(id: "1") {
       title
       weight
       description
       tasks {
         title
       }
     }
   }
   ```

   **Expected Output:**
   ```json
   {
     "data": {
       "project": {
         "title": "Advanced HTML",
         "weight": 1,
         "description": "Welcome to the Web Stack specialization...",
         "tasks": [
           { "title": "Create your first webpage" },
           { "title": "Structure your webpage" }
         ]
       }
     }
   }
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task establishes relationships between `Task` and `Project` types in the GraphQL schema. Each `Task` can reference a `Project`, and each `Project` can have a list of `Tasks`.
- **Where:** The relationships were added in `server/schema/schema.js` by updating `TaskType` and `ProjectType`. The `graphiql4_1` and `graphiql4_2` files contain test queries to verify the relationships.
- **Why:** Creating these relations allows for more complex data retrieval, enabling queries that gather connected information in a single request. This is a key feature of GraphQL’s flexibility.
- **How:** We added `projectId` to tasks, modified `TaskType` to include a reference to `ProjectType`, and added a list of `TaskType` to `ProjectType`. The `resolve` functions ensure data is correctly retrieved and filtered based on these relationships.
- **Who:** Developers using GraphQL APIs who need to fetch related data efficiently will benefit from this setup, as it reduces the need for multiple queries and simplifies data retrieval.
- **When:** This setup is useful whenever you need to display tasks related to a project or show which project a task belongs to. It’s ideal for scenarios where data is interconnected.

</details>

### Task 5: More on Root Queries: Projects and Tasks

In this task, we extended the `RootQueryType` to allow for querying all projects and all tasks. This enables users to fetch comprehensive data, such as all projects with their related tasks, in a single request.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

In this task, you will be able to write in GraphiQL the query that will result in all the projects and all the tasks.

In the fields of the `RootQueryType`, create two new fields `tasks` and `projects` of types `GraphQLList` of `TaskType` and `ProjectType` respectively. In the resolve functions of each field, return all the tasks and all the projects.

To test that in GraphiQL, in a file `graphiql5`, write the query that will give you the `id`, `title`, `weight`, and `description` of all the projects, and the `title` and `description` of their tasks. The result of your query will look like in the following figure:

You can also test the output of the query that will give all the tasks.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Add `tasks` and `projects` Fields to `RootQueryType`:**
   
   Modify `RootQueryType` to include two new fields:
   ```javascript
   const RootQuery = new GraphQLObjectType({
       name: 'RootQueryType',
       fields: {
           task: {
               type: TaskType,
               args: { id: { type: GraphQLID } },
               resolve(parent, args) {
                   return _.find(tasks, { id: args.id });
               }
           },
           project: {
               type: ProjectType,
               args: { id: { type: GraphQLID } },
               resolve(parent, args) {
                   return _.find(projects, { id: args.id });
               }
           },
           tasks: {
               type: new GraphQLList(TaskType),
               resolve(parent, args) {
                   return tasks; // Return all tasks
               }
           },
           projects: {
               type: new GraphQLList(ProjectType),
               resolve(parent, args) {
                   return projects; // Return all projects
               }
           }
       }
   });
   ```

2. **Run the Server Using `npm run start`:**

   Start the server with:
   ```bash
   npm run start
   ```

3. **Write and Save the Query in `graphiql5`:**

   Create a file `graphiql5` and add:
   ```graphql
   {
     projects {
       id
       title
       weight
       description
       tasks {
         title
         description
       }
     }
   }
   ```

   **Expected Output:**
   ```json
   {
     "data": {
       "projects": [
         {
           "id": "1",
           "title": "Advanced HTML",
           "weight": 1,
           "description": "Welcome to the Web Stack specialization...",
           "tasks": [
             {
               "title": "Create your first webpage",
               "description": "Create your first HTML file..."
             },
             {
               "title": "Structure your webpage",
               "description": "Copy the content of 0-index.html..."
             }
           ]
         },
         {
           "id": "2",
           "title": "Bootstrap",
           "weight": 1,
           "description": "Bootstrap is a free and open-source CSS framework...",
           "tasks": []
         }
       ]
     }
   }
   ```

4. **Test the Query for All Tasks:**

   You can also test a query to fetch all tasks:
   ```graphql
   {
     tasks {
       id
       title
       description
     }
   }
   ```

   **Expected Output:**
   ```json
   {
     "data": {
       "tasks": [
         {
           "id": "1",
           "title": "Create your first webpage",
           "description": "Create your first HTML file..."
         },
         {
           "id": "2",
           "title": "Structure your webpage",
           "description": "Copy the content of 0-index.html..."
         }
       ]
     }
   }
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task extends the `RootQueryType` to support querying all tasks and all projects. It allows for more comprehensive data retrieval by combining related objects in one query.
- **Where:** The changes are implemented in `server/schema/schema.js`, with queries for testing saved in `graphiql5`.
- **Why:** Enabling users to query all tasks and projects allows for better organization and simplified data retrieval. It reduces the need for multiple requests to fetch related information.
- **How:** We added `tasks` and `projects` fields to `RootQueryType`, used `GraphQLList` to handle lists, and ensured the resolve functions return all objects from their respective arrays.
- **Who:** This is beneficial for developers who need to access related data efficiently and see comprehensive information from their APIs.
- **When:** This setup is especially useful for cases where the application needs to show all available tasks under specific projects, or when a complete overview of all tasks and projects is needed.

</details>


### Task 6: Connecting to MongoDB Atlas and Create Mongoose Models

In this task, we connected our GraphQL application to MongoDB Atlas using Mongoose, a popular Object Data Modeling (ODM) library for MongoDB. We set up a database, created models for `Task` and `Project`, and established a secure connection to store and retrieve data dynamically.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

Open this link: www.mongodb.com and create an account. Add a new database user, well save the username and the password then create a new database.

To use MongoDB in your application:

1. Install a new package Mongoose by using the following command: `npm install mongoose --save`.
2. In the file `app.js`:
   - Require Mongoose using `const mongoose = require('mongoose');`
   - Connect to MongoDB Atlas database using the string generated in the cluster in MongoDB Atlas.
   - Add this code:
     ```javascript
     mongoose.connection.once('open', () =>
       console.log('Connected to database');
     );
     ```
   - An event listener returns the message “Connected to database” to the console once the connection is open.

Before you start putting data in the database, you need to create a model and schema for each data type to be stored inside the database.

- Create a new folder `models`. Inside the folder, create two files `task.js` and `project.js`.
- In the file `task.js`:
  - Require mongoose.
  - Create a constant `Schema` contains `mongoose.Schema`.
  - Create a schema for the task: `taskSchema`, then add the properties with the adequate type (`String`, `Number` …) except the id because MongoDB is automatically going to create a new ID.
  - Make sure you export the model, you define the model which will be the collection in MongoDB “Task” and base it on the schema “taskSchema”.
- In the file `project.js`: Do the same steps you did with the previous file. Just modify the properties, the name of the schema to “projectSchema” and the collection name to “Project”.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Set Up MongoDB Atlas:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in.
   - Create a new cluster by following the on-screen instructions. Name the cluster (e.g., `atlas-graphql-cluster`).
   - Configure a database user:
     - Go to **Security > Database Access** and click **"Add New Database User."**
     - Save the username and password.
   - Set network access:
     - Go to **Security > Network Access** and click **"Add IP Address."**
     - Choose **"Allow Access from Anywhere"** for development purposes.
   - Generate the connection string by clicking **"Connect"** on your cluster.

2. **Install Mongoose:**
   ```bash
   npm install mongoose --save --legacy-peer-deps
   ```
This command installs **Mongoose** and adds it as a dependency in the `package.json`. The `--legacy-peer-deps` flag bypasses strict peer dependency conflicts, allowing Mongoose to be installed even if other packages (like `express-graphql`) have conflicting dependencies. This ensures the installation proceeds smoothly without manual resolution of version conflicts.

3. **Connect to MongoDB in `app.js`:**
   Update `app.js` to include the following:
   ```javascript
   const express = require('express');
   const { graphqlHTTP } = require('express-graphql');
   const mongoose = require('mongoose');
   const schema = require('./schema/schema');

   const app = express();

   mongoose.connect('mongodb+srv://<username>:<password>@atlas-graphql-cluster.mongodb.net/<dbname>?retryWrites=true&w=majority');

   mongoose.connection.once('open', () => {
       console.log('Connected to database');
   });

   app.use('/graphql', graphqlHTTP({
       schema: schema,
       graphiql: true
   }));

   app.listen(4000, () => {
       console.log('Now listening for requests on port 4000');
   });
   ```

4. **Create `task.js` in `models`:**
   ```javascript
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;

   const taskSchema = new Schema({
       title: String,
       weight: Number,
       description: String,
       projectId: String // To relate to Project
   });

   module.exports = mongoose.model('Task', taskSchema);
   ```

5. **Create `project.js` in `models`:**
   ```javascript
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;

   const projectSchema = new Schema({
       title: String,
       weight: Number,
       description: String
   });

   module.exports = mongoose.model('Project', projectSchema);
   ```

6. **Start the Application:**
   ```bash
   npm run start
   ```

7. **Expected Output:**
   ```bash
   Now listening for requests on port 4000
   Connected to database
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involves connecting your GraphQL application to a MongoDB Atlas database using Mongoose. It also includes defining Mongoose models to structure the data.
- **Where:** Changes were implemented in `server/app.js`, and new files `server/models/task.js` and `server/models/project.js` were created.
- **Why:** Connecting to a database enables persistent storage, making the application capable of storing, retrieving, and manipulating dynamic data. Mongoose models ensure a structured and consistent way to interact with this data.
- **How:** We used the connection string from MongoDB Atlas, created Mongoose models for `Task` and `Project`, and set up a reliable database connection.
- **Who:** This setup is beneficial for developers needing to integrate dynamic data storage and retrieval in their applications.
- **When:** This configuration is essential whenever your application needs to store or interact with persistent data in a structured manner.

</details>

### Task 7: Mutation

In this task, we implemented GraphQL mutations to add new `Projects` and `Tasks` to the MongoDB database. We created a `Mutation` type with `addProject` and `addTask` fields to enable the addition of data through the GraphQL API. We also learned how to view the stored data on the MongoDB Atlas Dashboard.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

In the file `schema.js`, create a new `GraphQLObjectType` Mutation with the name `Mutation` then create a field called `addProject`. So when you use `addProject` mutation, you will be able to add a project to the database.

- `addProject` property is going to be an object of the fields of `const Mutation` where their properties are:
  - **type**: `ProjectType`
  - **args**: Add arguments for `title`, `weight`, and `description`, and ensure they are required using `GraphQLNonNull`.
  - **resolve function**: Create a new `Project` instance, save it to the database, and return the result.

To prevent users from making mutations without passing through any required fields, you should use the `GraphQLNonNull` type. Add `GraphQLNonNull` to all the arguments of the mutation.

Repeat the same steps to add a field `addTask` for adding new tasks. Make sure to specify `projectId` as one of the arguments.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Update `schema.js` with Mutation:**
   - Define new `addProject` and `addTask` fields inside a `Mutation` type.
   - Use `GraphQLNonNull` to make certain fields required.
   
2. **Test Mutations in GraphiQL:**
   - Use GraphiQL to add new projects and tasks by running the following example mutations:
   
   **Add Project (`graphiql7_1`):**
   ```graphql
   mutation {
     addProject(title: "Bootstrap", weight: 1, description: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.") {
       title
       weight
       description
     }
   }
   ```
   
   **Expected Output:**
   ```json
   {
     "data": {
       "addProject": {
         "title": "Bootstrap",
         "weight": 1,
         "description": "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development."
       }
     }
   }
   ```

   **Add Task (`graphiql7_2`):**
   ```graphql
   mutation {
     addTask(title: "Reboot styling", weight: 2, description: "Add Bootstrap to reset the CSS styling.", projectId: "<existing_project_id>") {
       title
       weight
       description
     }
   }
   ```
   
   **Expected Output:**
   ```json
   {
     "data": {
       "addTask": {
         "title": "Reboot styling",
         "weight": 2,
         "description": "Add Bootstrap to reset the CSS styling."
       }
     }
   }
   ```

3. **Using GraphiQL Files in the Browser:**
   - To make testing easier, save the mutation queries above into files named `graphiql7_1` and `graphiql7_2`.
   - Open **GraphiQL** in the browser at `http://localhost:4000/graphql`.
   - Copy and paste the query from `graphiql7_1` to test adding a new project. 
   - Similarly, use `graphiql7_2` to add a new task.
   - Check the output in GraphiQL to confirm the mutations work as expected.

4. **Check the Database on MongoDB Atlas:**
   - Go to the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website and log in to your account.
   - Select the **Project** where your cluster (e.g., `atlas-graphql-cluster`) is located.
   - Navigate to **Clusters** and click **"Browse Collections."**
   - This will open a view where you can see all your **databases** and **collections**.
     - Click on a collection (e.g., `projects`, `tasks`) to view the entries that have been added through the mutations.
   - You can manually **add, edit, or delete** entries from this interface.

5. **Start the Application:**
   ```bash
   npm run start
   ```

6. **Expected Output in the Terminal:**
   ```bash
   Now listening for requests on port 4000
   Connected to database
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involves adding mutation support to the GraphQL API, enabling users to add `Projects` and `Tasks` to the database.
- **Where:** Code changes were implemented in `server/schema/schema.js`, and the mutations were tested via GraphiQL. Database updates were verified using MongoDB Atlas Dashboard.
- **Why:** Mutations are essential for modifying data, such as adding new entries to the database, and this task demonstrates how to use them for CRUD (Create, Read, Update, Delete) operations.
- **How:** The GraphQL `Mutation` type was set up with `addProject` and `addTask` fields, using `GraphQLNonNull` to make certain arguments required. Data was stored using Mongoose models.
- **Who:** This is useful for developers who need to modify the database through the GraphQL API without directly interacting with the database.
- **When:** Use these mutations whenever you want to create new `Project` or `Task` entries through the API.

</details>

<details>
  <summary><strong>Troubleshooting</strong></summary>

- **Issue:** Mutation does not appear in GraphiQL.
  - **Solution:** Make sure you have correctly exported the `mutation` in `schema.js`. Restart your server after making any changes.
  
- **Issue:** GraphQL query fails with validation error.
  - **Solution:** Ensure that all required fields are provided when making a mutation. For example, `title`, `weight`, and `description` must be included for `addProject`.

- **Issue:** Unable to connect to MongoDB Atlas.
  - **Solution:** Verify the connection string, and make sure your IP is whitelisted. Check the username, password, and database name.

- **Issue:** Data does not appear in MongoDB Atlas.
  - **Solution:** Verify your MongoDB Atlas connection by checking the logs in the terminal. Ensure mutations were successful by looking for a "Connected to database" message when starting the app.

</details>




### **Task 8: Updating the Resolve Functions**

In this task, we updated the resolve functions to fetch data directly from the MongoDB database instead of using example arrays. This ensures that queries return real data from the database collections, reflecting the current state of the database.

<details>
  <summary><strong>Curriculum Instruction</strong></summary>

In the file `schema.js`, delete the 2 arrays of data: `tasks` and `projects`. In the resolve functions, delete any line of code using these two arrays and replace them with code that retrieves data directly from the database using the models: `Project` and `Task`.

- Remove the example arrays `tasks` and `projects`.
- Update all resolve functions to use `Project` and `Task` models from the database.
- Ensure that every query now interacts directly with MongoDB via Mongoose.

</details>

<details>
  <summary><strong>Steps and Code Implementation</strong></summary>

1. **Remove Example Arrays:**
   - Delete the `tasks` and `projects` arrays from `schema.js` to avoid referencing hardcoded data.

2. **Update Resolve Functions to Use Mongoose Models:**
   - Replace lines of code that referenced these arrays with database queries using Mongoose models:
     - For `Project` queries, use `Project.find()` and `Project.findById()`.
     - For `Task` queries, use `Task.find()`, `Task.findById()`, or `Task.find({ projectId: parent.id })` to fetch tasks based on their `projectId`.
   
3. **Revised Example of Resolve Functions in `schema.js`:**
   ```javascript
   const TaskType = new GraphQLObjectType({
       name: 'Task',
       fields: () => ({
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString },
           project: {
               type: ProjectType,
               resolve(parent, args) {
                   return Project.findById(parent.projectId);
               }
           }
       })
   });

   const ProjectType = new GraphQLObjectType({
       name: 'Project',
       fields: () => ({
           id: { type: GraphQLID },
           title: { type: GraphQLString },
           weight: { type: GraphQLInt },
           description: { type: GraphQLString },
           tasks: {
               type: new GraphQLList(TaskType),
               resolve(parent, args) {
                   return Task.find({ projectId: parent.id });
               }
           }
       })
   });
   ```

4. **Test Your Queries and Mutations in GraphiQL:**
   - Open **GraphiQL** in the browser at `http://localhost:4000/graphql`.
   - Test the existing `task`, `tasks`, `project`, and `projects` queries to ensure they now return real data from the MongoDB database.
   - Use `addProject` and `addTask` mutations to add new entries to the database and confirm that subsequent queries reflect these additions.

5. **Check the Database on MongoDB Atlas:**
   - After performing queries or mutations, log into your MongoDB Atlas account.
   - Navigate to **Clusters** and click **"Browse Collections."**
   - Inspect the `projects` and `tasks` collections to verify that they contain the expected entries. 
   - Confirm that relationships (e.g., tasks linked to specific projects) are correctly represented.

6. **Start the Application:**
   ```bash
   npm run start
   ```

7. **Expected Output in the Terminal:**
   ```bash
   Now listening for requests on port 4000
   Connected to database
   ```

</details>

<details>
  <summary><strong>Explanation: Who, What, Where, When, Why, How</strong></summary>

- **What:** This task involves updating the resolve functions to retrieve data directly from MongoDB using Mongoose models, ensuring real-time data querying.
- **Where:** Code changes were made in `server/schema/schema.js`. Queries and mutations can be tested via GraphiQL, and database changes can be confirmed in MongoDB Atlas.
- **Why:** Fetching data directly from the database allows for dynamic data interaction and ensures that the GraphQL API returns up-to-date information. It also eliminates the reliance on hardcoded sample data.
- **How:** Resolve functions in `schema.js` were refactored to use `.find()` and `.findById()` methods from Mongoose models, making it possible to query the database directly. 
- **Who:** Developers who want to maintain a reliable data source and ensure their API dynamically interacts with the actual database.
- **When:** Use these updated resolve functions whenever querying for `Projects` and `Tasks` through the GraphQL API to get the most accurate data.

</details>
