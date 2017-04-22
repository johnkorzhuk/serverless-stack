export default {
  s3: {
    BUCKET: 'serverless-tut-notes-app'
  },
  apiGateway: {
    URL: 'https://2637c3vh5a.execute-api.us-east-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-1',
    IDENTITY_POOL_ID: 'us-east-1:da844188-be5a-422e-9f8f-78fe223e024f',
    USER_POOL_ID: 'us-east-1_sUJdx8WJg',
    APP_CLIENT_ID: '7hum6sc0ncl0e6ncor3kko8u93'
  },
  MAX_ATTACHMENT_SIZE: 5000000
}
