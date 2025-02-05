# System Design Interview Framework - 🚀 S.C.A.L.E.D.
## 🔑 Key Mnemonic: S.C.A.L.E.D.
✔ S – Scope & Requirements  
✔ C – Capacity Estimation  
✔ A – API Design  
✔ L – Low-Level Design  
✔ E – Entire Architecture  
✔ D – Deep Dive & Discussion  

## 🟢 S - Scope & Requirements (2-3 min)
✔ Functional requirements → What must the system do? (e.g., URL Shortener → Generate, Store, Redirect)  
✔ Non-functional requirements → Performance, reliability, security, latency, etc.  
✔ Clarifying Questions → Who are the users? Expected scale?   
✔ Constraints & Assumptions → Fill in missing details  

## 🟢 C - Capacity Estimation (3-4 min)

### 🔹 Option 1
✅ Users & Traffic:
- Small: Up to 1,000 users, 100 RPS
- Medium: 1,000 – 100,000 users, 100 – 10K RPS
- Large: 100K+ users, 10K+ RPS

✅ Storage & Bandwidth:
- Small: Up to 1M 
- Medium: 1M – 100M 
- Large: 100M – 1G+ 
- Massive: 1G+ 

### 🔹 Option 2
📌 Users → DAU/MAU (Daily/Monthly Active Users)  
📌 Traffic → RPS (Requests per Second)  
📌 Storage → How much data is stored/grows per day/month?  
📌 Bandwidth → Estimated data transfer volume  

🔢 Quick Estimations:
- If 1M users & each makes 10 requests/day → 10M requests/day (~115 RPS)
- If each request is 1KB, daily storage needs ~10GB/day

## 🟢 A - API Design (2-3 min)
📌 Define Key Endpoints (REST)  
Example:
```http
POST /shorten → Accepts long URL, returns short URL
GET /{shortUrl} → Redirects to original URL
```

📌 Request & Response Format  
- JSON, Error Handling, Status Codes

## 🟢 L - Low-Level Design (8-10 min)
📌 Database Schema → Tables, Indexing  
📌 Core Algorithms → Hashing (Base62 for URL shortener), Sorting, Caching Logic  
📌 Component Diagrams → Class relationships, dependencies  

## 🟢 E - Entire Architecture (8-10 min)

### 📌 High-Level Design:
✅ Client Applications → Web (React/Angular/Vue), Mobile (iOS/Android)
✅ CDN → Cloudflare for static content
✅ Load Balancer → Distribute traffic (NGINX, AWS ALB)
✅ Backend Services → API Layer, Business Logic
✅ Database → SQL (for consistency), NoSQL (for scale)
✅ Caching Strategy → Redis/Memcached for fast lookups
✅ Blob Storage → AWS S3/Azure Blob for file storage
✅ Queue System → Kafka/RabbitMQ for async processing
📌 System Diagram → Always draw one!

## 🟢 D - Deep Dive & Discussion (5-8 min)
📌 Scalability Approaches → Horizontal Scaling, Sharding, Replication  
📌 Failure Points → Single Point of Failure (SPOF), Redundancy  
📌 Monitoring & Logging → Prometheus, ELK Stack  
📌 Security → Rate Limiting, Authentication (OAuth/JWT), Data Encryption  

## 🎯 Final Tips for Success:
✅ Always Start with Requirements – Never jump to a solution too fast  
✅ Use Round Numbers for Quick Estimations – Don't overcomplicate math  
✅ Draw Clear Diagrams – System overview, data flow, key components  
✅ Talk Through Your Thought Process – Explain trade-offs & why  
✅ Ask for Feedback – Validate your approach with the interviewer  

