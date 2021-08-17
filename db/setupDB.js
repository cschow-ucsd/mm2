const AWS = require('aws-sdk')

function setupDB() { //TODO: set to endpoint using env (not localhost)
    AWS.config.update({
        region: 'us-west-2',
        endpoint: 'http://localhost:8000'
    })

    const dynamodb = new AWS.DynamoDB()

    const tableName = 'Schedules'
    const params = {
        TableName: tableName,
        KeySchema: [
            { AttributeName: 'user', KeyType: 'HASH' },
            { AttributeName: 'id', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'user', AttributeType: 'S' },
            { AttributeName: 'id', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }

    dynamodb.createTable(params, (err, data) => {
        if (err) console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
        else console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    })

    return { tableName, docClient: new AWS.DynamoDB.DocumentClient() }
}

module.exports = { setupDB }