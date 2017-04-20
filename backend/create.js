import uuid from 'uuid'
import * as dynamoDbLib from './libs/dynamo-lib'
import { success, failure } from './libs/response-lib'

export async function main (event, context, callback) {
  const { content, attachment } = JSON.parse(event.body)
  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.authorizer.claims.sub,
      noteId: uuid.v1(),
      content,
      attachment,
      createdAt: new Date().getTime()
    }
  }

  try {
    const result = await dynamoDbLib.call('put', params)
    callback(null, success(params.Item))
  } catch (e) {
    console.log(e)
    callback(null, failure({ status: false }))
  }
}
