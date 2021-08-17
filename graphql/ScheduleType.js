const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const ScheduleType = new GraphQLObjectType({
    name: 'ScheduleType',
    fields: () => ({
        user: { type: GraphQLString },
        id: { type: GraphQLString }
    })
})

module.exports = ScheduleType