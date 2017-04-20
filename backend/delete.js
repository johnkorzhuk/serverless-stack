import * as dynamoDbLib from './libs/dynamo-lib'
import { success, failure } from './libs/response-lib'

export async function main (event, context, callback) {
  const params = {
    TableName: 'notes',
    // 'Key' defines the partition key and sort key of the time to be removed
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      noteId: event.pathParameters.id
    }
  }

  try {
    const results = await dynamoDbLib.call('delete', params)
    callback(null, success({ status: true }))
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}
