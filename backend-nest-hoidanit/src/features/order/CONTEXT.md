# Order Feature

## Owns
- `orders` table
- `order_items` table

## Responsibilities
- Checkout: cart → order conversion
- Snapshot product info and address at purchase time
- Stock deduction (within transaction)
- Order status management
- Payment status management

## Key Rules
- `shipping_address` is a JSON snapshot — NOT a FK to addresses
- `order_items` snapshots: product_name, sku, price, thumbnail_url
- Checkout MUST use database transaction (QueryRunner)
- Deduct `stock_quantity` from `product_variants`
- Clear cart after successful order

## Error Codes
- ORD_001: Order not found
- ORD_002: Cannot cancel (already shipped)
