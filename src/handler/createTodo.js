'use strict'

const {v4} = require('uuid');
const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.createTodo = async (event, context, callback) => {
    const datetime = new Date().toISOString();
    const data2 = JSON.parse(event.body);
    const params = {
        TableName: 'todos',
        Item: {
            id: v4(),
            task: data2.task,
            done: false,
            createdAt: datetime,
            updatedAt: datetime
        }
    };
    dynamoDb.put(params, (error, data) => {
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
            body: JSON.stringify(params.Item)
        }
        
        console.log('data is ',params.Item);
        console.log('respose is ',response);
    });   
    callback(null, "success");
}