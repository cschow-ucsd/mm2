const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')
const ScheduleType = require('./ScheduleType')
const AWS = require('aws-sdk')
const setupDB = require('../db/setupDB')


// create table and client
const tableName = setupDB()
const docClient = new AWS.DynamoDB.DocumentClient()

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        schedule: {
            type: ScheduleType,
            args: {
                user: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            async resolve(parentValue, args) {
                const data = await getSchedule(args.user, args.id)
                return data.Item
            }
        },
        schedules: {
            type: new GraphQLList(ScheduleType),
            args: {
                user: { type: GraphQLString },
            },
            async resolve(parentValue, args) {
                const data = await getSchedules(args.user)
                return data.Items
            }
        }
    }

})

function getSchedule(user, id) {
    const params = {
        TableName: tableName,
        Key: { user, id }
    }
    return docClient.get(params).promise()
}

function getSchedules(user) {
    const params = {
        TableName: tableName,
        KeyConditionExpression: '#user = :user',
        ExpressionAttributeNames: { '#user': 'user'},
        ExpressionAttributeValues: { ':user': user}
    }
    return docClient.query(params).promise()
}

module.exports = new GraphQLSchema({
    query: RootQuery
})