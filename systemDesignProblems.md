# Uber System Design

## 🟢 S - Scope & Requirements (2-3 min)

### Functional Requirements
- Real-time driver location tracking
- Nearby driver discovery
- Ride requesting and matching
- Live trip tracking
- Trip completion and payment
- Driver availability management

### Non-Functional Requirements
- Low latency (real-time updates < 3 seconds)
- High availability (24/7 service)
- Consistent driver-rider matching
- Location accuracy
- Scalable to millions of concurrent users

### Constraints & Assumptions
- Drivers update location every 3 seconds
- Active drivers are always connected
- Mobile app is primary interface
- GPS accuracy is reliable
- Network connectivity is mostly stable

## 🟢 C - Capacity Estimation (3-4 min)

### Users & Traffic
- Total Users: 300M customers, 1M drivers
- Daily Active: 1M customers, 500K drivers
- Daily Rides: 1M
- Location Updates: 500K drivers × updates every 3s = ~167K RPS

### Storage & Bandwidth
- Driver Location Update Size: 19 bytes
- Location Update Bandwidth: 47.5 MB/s
- Subscription Storage: 21MB for active users
- Total Storage: 35MB for DriverLocationHT

## 🟢 A - API Design (2-3 min)

### Key Endpoints
```
POST /driver/location
    Request: {driverId, latitude, longitude, availability}
    Response: {success, timestamp}

GET /drivers/nearby
    Request: {latitude, longitude, radius}
    Response: [{driverId, location, rating, ...}]

POST /ride/request
    Request: {userId, pickup, destination}
    Response: {rideId, driverId, eta}

GET /ride/{rideId}/status
    Response: {status, driverLocation, eta}
```

## 🟢 L - Low-Level Design (8-10 min)

### Data Structures
- QuadTree: For spatial indexing of driver locations
- DriverLocationHT: Hash table for real-time location updates
- Subscription Manager: For managing customer-driver live updates

### Database Schema
```sql
Drivers
- driver_id
- current_location
- availability_status
- rating

Rides
- ride_id
- customer_id
- driver_id
- pickup_location
- destination
- status
- timestamp
```

## 🟢 E - Entire Architecture (8-10 min)

### Components
- Mobile Apps (iOS/Android)
- Location Service
- Match Making Service
- Trip Management Service
- Notification Service
- Payment Service

### Infrastructure
- Load Balancers: For distributing traffic
- WebSocket Servers: For real-time communication
- QuadTree Servers: For location indexing
- Notification Servers: For push notifications
- Cache Layer: Redis for frequent location queries
- Message Queue: Kafka for async processing
- Primary DB: PostgreSQL for trip data
- Geo-Database: MongoDB for location data

## 🟢 D - Deep Dive & Discussion (5-8 min)

### Scalability
- Distribute DriverLocationHT across multiple servers
- Partition QuadTree by geographic regions
- Cache frequently accessed driver locations
- Use read replicas for scaling queries

### Fault Tolerance
- Replicated servers for critical services
- Persistent storage backup
- Graceful degradation strategy
- Circuit breakers for failing components

### Monitoring & Performance
- Driver location update latency
- Matching algorithm performance
- System error rates
- Customer matching success rate

### Security
- Authentication for all API endpoints
- Rate limiting for location updates
- Encryption for sensitive data
- Fraud detection system

### Edge Cases
- Network disconnections during rides
- Surge pricing implementation
- Multiple ride requests for same driver
- Driver availability status accuracy
- Payment failure handling

-----------------------------------------------------------------------------------------------------

# YouTube System Design

## 🟢 S - Scope & Requirements (2-3 min)

### Functional Requirements
- Upload videos
- View/stream videos
- Search videos by title
- Like/dislike videos
- Comment on videos
- Track video statistics

### Non-Functional Requirements
- High reliability (no video loss)
- High availability (prefer over consistency)
- Low latency streaming
- Real-time video playback without lag
- Scalable to handle massive concurrent views

### Clarifying Questions
- What video formats are supported?
- Maximum video size limit?
- Video quality requirements?
- Geographic distribution of users?
- Authentication requirements?

### Constraints & Assumptions
- Users can upload videos of any length
- Videos need to be stored in multiple formats
- Global user base requiring CDN
- Read-heavy system (200:1 read:write ratio)

## 🟢 C - Capacity Estimation (3-4 min)

### Users & Traffic
- 1.5B total users
- 800M daily active users (DAU)
- 46K video views/second
- 230 video uploads/second

### Storage & Bandwidth
- Storage:
  - 500 hours of video uploaded/minute
  - 50MB per minute of video
  - 1500 GB/minute (25 GB/second)
  
- Bandwidth:
  - Upload: 5 GB/second
  - Download: 1 TB/second (1:200 ratio)

## 🟢 A - API Design (2-3 min)

### Key Endpoints
```
POST /api/videos
- Upload new video with metadata
- Parameters: api_dev_key, title, description, tags[], category_id, language, video_contents

GET /api/videos/search
- Search videos
- Parameters: api_dev_key, search_query, user_location, max_results, page_token

GET /api/videos/stream/{video_id}
- Stream video content
- Parameters: api_dev_key, video_id, offset, codec, resolution
```

## 🟢 L - Low-Level Design (8-10 min)

### Database Schema

#### Videos Table
```sql
CREATE TABLE videos (
    video_id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    size INT,
    uploader_id INT,
    thumbnail_path VARCHAR(255),
    views INT,
    likes INT,
    dislikes INT,
    created_at TIMESTAMP
);
```

#### Comments Table
```sql
CREATE TABLE comments (
    comment_id VARCHAR(255) PRIMARY KEY,
    video_id VARCHAR(255),
    user_id INT,
    comment_text TEXT,
    created_at TIMESTAMP
);
```

### Core Algorithms
- Video encoding algorithm
- Deduplication detection
- Thumbnail generation
- Search ranking algorithm
- Cache eviction (LRU)

## 🟢 E - Entire Architecture (8-10 min)

### Components
1. Client Applications
   - Web interface
   - Mobile apps
   - Smart TV apps

2. CDN Layer
   - Globally distributed
   - Caches popular videos
   - Reduces latency

3. Load Balancers
   - Distribute incoming traffic
   - Handle upload/view separately

4. Application Services
   - Upload service
   - Streaming service
   - Search service
   - Analytics service

5. Storage Systems
   - Video storage (HDFS/GlusterFS)
   - Metadata DB (MySQL)
   - Cache layer (Redis/Memcached)
   - Thumbnail storage (Bigtable)

6. Processing Queue
   - Video encoding
   - Thumbnail generation
   - Analytics processing

## 🟢 D - Deep Dive & Discussion (5-8 min)

### Scalability Approaches
- Horizontal scaling of services
- Database sharding (by VideoID)
- Read replicas for metadata
- Consistent hashing for cache distribution

### Failure Points & Solutions
- Video upload failures → Resumable uploads
- Storage node failures → Replication
- CDN node failures → Multiple CDN providers
- Database failures → Master-slave configuration

### Monitoring & Performance
- Video upload success rate
- Streaming latency
- Cache hit ratio
- CDN performance
- Error rates and types

### Security Considerations
- Video upload authentication
- Content validation
- Rate limiting
- Copyright detection
- DDoS protection

### Advanced Features
- Video deduplication
- Adaptive bitrate streaming
- Regional content delivery optimization
- Real-time analytics processing

-----------------------------------------------------------------------------------------------------

# Nearby Friends System Design

## 🟢 S - Scope & Requirements (2-3 min)

### Functional Requirements
- Add/delete/update places
- Search nearby places within radius
- Add reviews (text, photos, ratings)
- Rate and review places
- Filter by categories (restaurants, shopping, etc.)

### Non-Functional Requirements
- Low latency for search (real-time experience)
- High availability for read operations
- Eventually consistent writes acceptable
- Results should be location-relevant

### Clarifying Questions
- What is the search radius limit?
- Do we need real-time updates for new places?
- Should we support multiple languages?
- Do we need to support mobile apps?

### Constraints & Assumptions
- User location accuracy is within acceptable GPS range
- Reviews can be delayed in showing up
- Search results prioritize accuracy over completeness

## 🟢 C - Capacity Estimation (3-4 min)

### Traffic Estimates
- 500M total places
- 100K QPS (Queries Per Second)
- Read to Write ratio: 100:1 (more searches than updates)
- 20% annual growth rate

### Storage Estimates
- Per place: ~793 bytes
  - LocationID: 8 bytes
  - Name: 256 bytes
  - Coordinates: 16 bytes
  - Description: 512 bytes
  - Category: 1 byte
- Total storage for places: 500M * 793 bytes ≈ 396.5 GB
- Reviews and photos will need additional storage

### Bandwidth Estimates
- Average response size: 1KB per place
- For 100 places per search: 100KB per request
- Bandwidth: 100K QPS * 100KB = 10GB/s

## 🟢 A - API Design (2-3 min)

### Search API
```
GET /api/v1/places/search
Parameters:
- api_dev_key: string
- latitude: float
- longitude: float
- radius: int (meters)
- category: string (optional)
- sort: enum (DISTANCE, RATING)
- page_token: string

Response:
{
  "places": [{
    "id": string,
    "name": string,
    "location": {lat, lng},
    "rating": float,
    "category": string
  }],
  "next_page_token": string
}
```

### Review API
```
POST /api/v1/places/{place_id}/reviews
{
  "rating": int,
  "text": string,
  "photos": [binary]
}
```

## 🟢 L - Low-Level Design (8-10 min)

### Database Schema
```sql
Places:
  - location_id (PK)
  - name
  - latitude
  - longitude
  - description
  - category
  - created_at
  - updated_at

Reviews:
  - review_id (PK)
  - location_id (FK)
  - user_id
  - rating
  - text
  - created_at
```

### Core Components
- QuadTree Implementation
  - Node capacity: 500 places
  - Dynamic splitting when full
  - Leaf node connection for neighbor search
- Geohashing Algorithm
  - Convert lat/long to grid identifier
  - Support for radius search

## 🟢 E - Entire Architecture (8-10 min)

### System Components
1. Load Balancers
   - Route requests based on location
   - Health checking

2. Application Servers
   - Handle API requests
   - Implement business logic
   - Cache coordination

3. QuadTree Servers
   - Store location indices
   - Handle proximity queries
   - Memory optimized

4. Cache Layer
   - Store hot places
   - LRU eviction
   - Memcached/Redis

5. Database Servers
   - Primary for writes
   - Replicas for reads
   - Sharded by LocationID

### Data Flow
1. Client sends location-based search
2. Load balancer routes to nearest datacenter
3. Application server processes request
4. QuadTree server finds relevant grids
5. Cache/DB fetches place details
6. Results aggregated and returned

## 🟢 D - Deep Dive & Discussion (5-8 min)

### Scalability
- Horizontal scaling of application servers
- Database sharding by LocationID
- Read replicas for scaling reads
- CDN for static content (images)

### Failure Handling
- QuadTree server redundancy
- Master-slave replication
- Automatic failover
- Data rebuilding strategy

### Monitoring & Performance
- Query latency tracking
- Cache hit/miss rates
- Server load monitoring
- Error rate tracking

### Optimizations
- Batch updates for popularity scores
- Precomputed grids for common radiuses
- Caching strategy for hot areas
- Background jobs for analytics

### Security
- Rate limiting by API key
- Input validation
- DDOS protection
- Data encryption

-----------------------------------------------------------------------------------------------------

