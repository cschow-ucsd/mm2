const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')

const { ScheduleType, IdType } = require('./CustomObjectTypes')
const { setupDB } = require('../db/setupDB')
const { getSchedule, getSchedules, createSchedule, deleteSchedule } = require('../db/queries')

// create table and client
const { tableName, docClient } = setupDB()

const query = new GraphQLObjectType({
    name: 'ScheduleQuery',
    fields: {
        schedule: {
            type: ScheduleType,
            args: {
                user: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            async resolve(parentValue, args) {
                const data = await getSchedule(tableName, docClient, args.user, args.id)
                return data.Item
            }
        },
        schedules: {
            type: new GraphQLList(ScheduleType),
            args: {
                user: { type: GraphQLString },
            },
            async resolve(parentValue, args) {
                const data = await getSchedules(tableName, docClient, args.user)
                return data.Items
            }
        }
    }

})

const mutation = new GraphQLObjectType({
    name: 'ScheduleMutation',
    fields: {
        createSchedule: {
            type: IdType,
            args: {
                user: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parentValue, args) {
                const [id] = await createSchedule(tableName, docClient, args.user)
                return { id }
            }
        },
        deleteSchedule: {
            type: ScheduleType,
            args: {
                user: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            async resolve(parentValue, args) {
                const data = await deleteSchedule(tableName, docClient, args.user, args.id)
                return data.Attributes
            }
        }
    }
})

module.exports = new GraphQLSchema({ query, mutation })