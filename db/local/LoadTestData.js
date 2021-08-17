const AWS = require('aws-sdk')

const ALL_SCHEDULES = [
    {
        user: 'Alan',
        id: '1'
    },
    {
        user: 'Bob',
        id: '2'
    },
    {
        user: 'Chris',
        id: '3'
    },
    {
        user: 'Alan',
        id: '4'
    }
]

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing schedules in DynamoDB...')

ALL_SCHEDULES.forEach(schedule => {
    const params = {
        TableName: 'Schedules',
        Item: {
            'user_pk': schedule.user,
            'id_sk': schedule.id,
            'user': schedule.user,
            'id': schedule.id
        }
    }

    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add schedule ${schedule.title}. Error JSON:`, JSON.stringify(err, null, 2))
        } else {
            console.log('PutItem succeeded:', schedule.id)
        }
    })
})

