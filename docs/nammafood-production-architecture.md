# Namma Food production architecture

## Business model

Namma Food is a single-restaurant, own-delivery food ordering platform. The platform operates its own kitchen, owns the delivery fleet, and manages the end-to-end order lifecycle from food browsing to customer delivery and settlement.

## Core business rules

- One restaurant, one central kitchen.
- Delivery is managed by the platform itself.
- Customers may pay by Razorpay or cash on delivery.
- Every order is tied to one restaurant and one delivery assignment.
- Financial and operational events are explicitly tracked instead of hidden behind a single generic status field.
- Business rules are enforced by the backend domain model, not by the frontend.

## Domain model

- User: customer, admin, delivery partner identity
- Restaurant: the single Namma Food kitchen
- FoodItem: menu items and pricing
- Cart: customer cart
- Order: lifecycle and customer checkout state
- Payment: provider and payment lifecycle
- Delivery: assignment, pickup, and completion
- Notification: alerts and internal operations
- Review: customer feedback
- AuditLog: operational traceability

## Backend architecture

### Modules

- auth
- user
- food
- cart
- address
- order
- payment
- delivery
- notification
- review
- admin
- common

### Engineering standards

- Spring Boot 3 + Java 17
- PostgreSQL + Spring Data JPA + Hibernate
- Flyway migrations
- JWT-based authentication
- DTOs and validation for all external APIs
- Service interfaces and dependency inversion
- Error handling using custom exceptions
- No raw SQL in business logic
- Unit and integration tests for core workflows

## Frontend migration target

The final frontend will be Angular-based with three apps:

- customer app
- admin app
- delivery app

The migration will be done after the backend API contracts are stable.

## Why this architecture is production-ready

- It reflects the actual business model without unnecessary marketplace complexity.
- It cleanly separates order, payment, and delivery state machines.
- It keeps the app scalable by using ORM and domain-driven services rather than ad hoc scripts.
- It makes room for future growth such as branch expansion, coupons, reviews, notifications, and dashboards without a rewrite.
