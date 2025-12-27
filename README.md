# Mock Enrichment Provider (Cloudflare Worker)

## 📌 Overview

The **Mock Enrichment Provider** is a lightweight Cloudflare Worker that simulates a real-world **mobile enrichment service**.  
It is designed specifically to **test and demonstrate API Gateway integration** with the **Mobile Enrichment Gateway** project.

Instead of relying on a real third-party or paid enrichment API, this service behaves like an **external upstream microservice**, returning structured enrichment data in response to POST requests.

---

## 🎯 Purpose of This Project

This project exists to:

- Simulate a **real upstream enrichment provider**
- Enable **end-to-end testing** of the Mobile Enrichment Gateway
- Demonstrate **API Gateway → Microservice communication**
- Avoid dependency on local mocks that are unreachable from Cloudflare Workers
- Keep development **cloud-native, serverless, and cost-free**

> ⚠️ Since Cloudflare Workers cannot reliably call local services, this mock provider is also deployed on Cloudflare to ensure seamless gateway-to-provider interaction.

---

## 🧱 Architecture Role

In the overall system architecture, this project acts as:

**Upstream Microservice / External Provider**

```text
Client
  ↓
Mobile Enrichment Gateway (API Gateway)
  ↓
Mock Enrichment Provider (This Project)


From the gateway’s perspective, this service behaves exactly like:

A third-party API

A paid enrichment service

A legacy backend system

A microservice owned by another team

🚀 Features

Fully serverless (Cloudflare Workers)

Accepts JSON POST requests

Returns realistic enrichment-style data

Stateless and fast

Ideal for testing:

Gateway routing

Authentication forwarding

Error handling

Response sanitization

📡 API Contract
Endpoint
POST /

Request Body (JSON)
{
  "first_name": "John",
  "last_name": "Doe",
  "address": "Lahore, Pakistan"
}

Response (JSON)
{
  "mobile": "+923001234567",
  "confidence": 0.85,
  "request_id": "a3f1c1e2-9c21-4a3a-bb29-0a5f9a8d7c12"
}

🧠 Implementation Logic

Accepts only POST requests

Generates:

A random Pakistani-style mobile number

A fixed confidence score

A unique request ID using crypto.randomUUID()

No authentication or rate limiting is applied here
(Those concerns are intentionally handled by the API Gateway)

🛠 Tech Stack

Cloudflare Workers

TypeScript

Native Fetch API

Serverless edge execution

▶️ Local Development

Install Wrangler if not already installed:

npm install -g wrangler


Login to Cloudflare:

wrangler login


Run locally:

npx wrangler dev

🌍 Deployment

Deploy the worker to Cloudflare:

wrangler publish


After deployment, Cloudflare provides a public URL like:

https://<worker-name>.<account>.workers.dev


This URL is then configured as the upstream provider URL inside the Mobile Enrichment Gateway.

🔗 Integration with Mobile Enrichment Gateway

This project is explicitly used to test and validate:

Gateway → Provider connectivity

Request forwarding from the gateway

Response transformation and sanitization

Error propagation behavior

The Mobile Enrichment Gateway calls this service instead of a real third-party API during development and demos.

📌 Why This Matters

In real production systems:

Gateways rarely call local services

Providers often live on different clouds or networks

External APIs are costly or rate-limited

This mock provider allows us to demonstrate real architecture patterns without those constraints.

📄 License

MIT License — free to use, modify, and extend.

👤 Author

Shafqat Altaf
Serverless • Microservices • API Gateway Architectures
