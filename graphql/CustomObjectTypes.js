const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const CustomObjectTypes = new GraphQLObjectType({
    name: 'ScheduleType',
    fields: () => ({
        user: { type: GraphQLString },
        id: { type: GraphQLString }
    })
})

const IdType = new GraphQLObjectType({
    name: 'IdType',
    fields: () => ({
        id: { type: GraphQLString }
    })
})

module.exports = { ScheduleType: CustomObjectTypes, IdType }