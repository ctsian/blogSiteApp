-- Seed sample blogs for local development
DELETE FROM blog;

INSERT INTO blog (title, content, category, author, created_at, likes)
VALUES
('Getting started with Spring Cloud Gateway',
 'A concise walkthrough on wiring a gateway in front of microservices, covering route predicates, filters, and CORS setup for local dev.',
 'Tech',
 'alice',
 NOW(), 3),

('Designing a clean React routing structure',
 'Thoughts on structuring routes with protected pages, layout components, and how to keep auth-aware navbars tidy.',
 'Frontend',
 'bob',
 NOW(), 5),

('Why writing daily improves clarity',
 'A short reflection on how daily writing sessions sharpen thinking and communication, even for engineers.',
 'Productivity',
 'carol',
 NOW(), 2),

('Observability basics for small services',
 'Notes on adding lightweight logging and metrics to Spring Boot services without over-engineering the stack.',
 'DevOps',
 'dave',
 NOW(), 1),

('Traveling light: a one-bag packing list',
 'Lessons learned from traveling with a single backpack: clothes rotation, laundry cadence, and gear that pulls double duty.',
 'Travel',
 'eve',
 NOW(), 4);

