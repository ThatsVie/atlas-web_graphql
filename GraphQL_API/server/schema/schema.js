const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLNonNull, GraphQLList } = graphql;
const Project = require('../models/project');
const Task = require('../models/task');
const _ = require('lodash');

// const tasks = [
//  {
//        id: '1',
//        title: 'Create your first webpage',
//        weight: 1,
//        description: 'Create your first HTML file...',
//        projectId: '1'
//    },
//    {
//        id: '2',
//        title: 'Structure your webpage',
//        weight: 1,
//        description: 'Copy the content of 0-index.html...',
//       projectId: '1'
//    }
//];

//const projects = [
//    {
//        id: '1',
//        title: 'Advanced HTML',
//        weight: 1,
//        description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools...'
//    },
//    {
//        id: '2',
//        title: 'Bootstrap',
//        weight: 1,
//        description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development...'
//    }
//];

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
                // return _.find(projects, { id: parent.projectId });
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
                // return _.filter(tasks, { projectId: parent.id });
                return Task.find({ projectId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(tasks, { id: args.id });
                return Task.findById(args.id);
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(projects, { id: args.id });
                return Project.findById(args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                return project.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                    projectId: args.projectId
                });
                return task.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});