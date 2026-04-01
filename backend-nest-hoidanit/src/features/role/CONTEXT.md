# Role Feature

## Owns
- `roles` table

## Responsibilities
- CRUD operations for system roles.
- Role management via Admin API.

## Key Rules
- Role names must be unique.
- All endpoints are prefixed with `/admin/roles` for management.
- Uses `bigint` for primary keys to match project standard.

## Endpoints
- `GET /api/v1/admin/roles`: List all roles.
- `GET /api/v1/admin/roles/:id`: Get role detail.
- `POST /api/v1/admin/roles`: Create new role.
- `PATCH /api/v1/admin/roles/:id`: Update role.
- `DELETE /api/v1/admin/roles/:id`: Remove role.
