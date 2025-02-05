A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information without requiring a central authority or coordination.
It's commonly used in databases, file systems, or any system that requires generating unique identifiers.

Key Characteristics of UUID:
Uniqueness: The primary goal of UUID is to provide globally unique identifiers without requiring a central authority.
This ensures that even across distributed systems, the UUIDs generated are not duplicated.

Format: A UUID is a 128-bit value (16 bytes) that is typically represented as a string of 32 hexadecimal characters,
grouped into five sections with hyphens:
123e4567-e89b-12d3-a456-426614174000

Why Use UUIDs?

Distributed Systems: When you have a system that spans multiple servers or nodes,
generating unique IDs without relying on a central server (such as a database auto-incrementing key) is critical.

Decentralization: UUIDs help systems stay decentralized without the risk of collisions.
Scalability: You can scale your system without worrying about the uniqueness of the identifiers even when operating on multiple machines.

Use Cases for UUIDs:
Databases: They are often used as primary keys in distributed databases because they avoid conflicts in unique identification across multiple nodes.
Session Tokens: Many web applications use UUIDs for generating session tokens or authentication identifiers.
File Identifiers: UUIDs are useful for generating unique file names, especially in systems where files need to be uploaded or processed concurrently.

Advantages of UUIDs:
No Coordination: UUIDs can be generated independently on any machine or server without the need for coordination or synchronization.
Scalability: Suitable for large-scale distributed systems where coordination of ID generation could otherwise become a bottleneck.

Disadvantages:
Storage Size: Since a UUID is 128-bits long, it is larger than traditional integer-based IDs.
Not Human-Readable: UUIDs are not intuitive for humans to remember or work with compared to sequential integers.
