const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateTodo = (event, context, callback) => {
    var data2 = JSON.parse(event.body);
    const params = {
        TableName: 'todos',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ':t': data2.task
        },
        UpdateExpression: 'set task = :t'
    };
    dynamoDb.update(params, (error, data) => {
        if(error) {
            console.error(error);
            return error;
        }
        const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data2)
        }
        callback(null, response);
    });
}