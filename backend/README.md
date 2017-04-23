## Serverless stack using:
 - Lambda & API Gateway for our serverless API
 - DynamoDB for our database
 - Cognito for user authentication and securing our APIs
 - S3 for hosting our app and file uploads
 - CloudFront for serving out our app
 - Route 53 for our domain
 - Certificate Manager for SSL
 - React.js for our single page app
 - React Router for routing
 - Bootstrap for the UI Kit

### A following along to this tutorial: http://serverless-stack.com/

### Deployment info
  - Service Information
  - service: notes-app-api
  - stage: prod
  - region: us-east-1
  - endpoints:
    - POST - https://2637c3vh5a.execute-api.us-east-1.amazonaws.com/prod/notes
    - GET - https://2637c3vh5a.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
    - GET - https://2637c3vh5a.execute-api.us-east-1.amazonaws.com/prod/notes
    - PUT - https://2637c3vh5a.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
    - DELETE - https://2637c3vh5a.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
  - functions:
    - create: notes-app-api-prod-create
    - get: notes-app-api-prod-get
    - list: notes-app-api-prod-list
    - update: notes-app-api-prod-update
    - delete: notes-app-api-prod-delete
