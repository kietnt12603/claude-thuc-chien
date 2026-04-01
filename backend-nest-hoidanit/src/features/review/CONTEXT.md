# Review Feature

## Owns
- `reviews` table

## Responsibilities
- Create / update / delete product reviews
- Verified-purchase enforcement (user + product + order 3-way link)
- Rating aggregation

## Key Rules
- User must have purchased the product (via order_id) to review
- One review per user per product per order
- Reviews link to `products`, NOT `product_variants`

## Error Codes
- REV_001: Already reviewed
- REV_002: Must purchase first
