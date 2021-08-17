const { v4: uuidv4 } = require('uuid')

function getSchedule(tableName, docClient, user, id) {
    const params = {
        TableName: tableName,
        Key: { user, id }
    }
    return docClient.get(params).promise()
}

function getSchedules(tableName, docClient, user) {
    const params = {
        TableName: tableName,
        KeyConditionExpression: '#user = :user',
        ExpressionAttributeNames: { '#user': 'user' },
        ExpressionAttributeValues: { ':user': user }
    }
    return docClient.query(params).promise()
}

function createSchedule(tableName, docClient, user) {
    const id = uuidv4()
    const params = {
        TableName: tableName,
        Item: { user, id },
    }
    return Promise.all([
        Promise.resolve(id),
        docClient.put(params).promise()
    ])
}

function deleteSchedule(tableName, docClient, user, id) {
    const params = {
        TableName: tableName,
        Key: { user, id },
        ReturnValues: 'ALL_OLD'
    }
    return docClient.delete(params).promise()
}

module.exports = { getSchedule, getSchedules, createSchedule, deleteSchedule }