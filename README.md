# Serverless Contact Form using AWS

A simple contact form built using AWS Serverless services.

## 🧰 Tech Stack
- **Frontend**: HTML, CSS, JavaScript (hosted on S3)
- **Backend**: AWS Lambda + API Gateway
- **Database**: DynamoDB
- **Deployment**: AWS CLI

## 🔧 Architecture

User (Browser)
↓
S3 (Static Website)
↓
API Gateway (HTTP API)
↓
Lambda (Node.js)
↓
DynamoDB (Stores form data)

## 💡 Features
- Fully serverless and scalable
- Form validation and real-time submission
- CORS handled for cross-domain requests
- Clean and modern UI

## 🚀 How to Deploy

1. **Frontend**  
   Upload `frontend/` to your S3 bucket and enable static website hosting.

2. **Backend (Lambda)**  
   - Zip your `handler.js`, `package.json`, and `node_modules`  
   - Deploy with:
     ```bash
     aws lambda update-function-code \
       --function-name storeContactForm \
       --zip-file fileb://lambda.zip
     ```

3. **API Gateway**  
   Create HTTP API with CORS and connect to Lambda.

4. **DynamoDB**  
   Create table `ContactForm` with `email` as partition key.

## 🧪 Sample Test

```bash
curl -X POST https://<api-url>/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Aditya","email":"aditya@example.com","message":"Hello"}'