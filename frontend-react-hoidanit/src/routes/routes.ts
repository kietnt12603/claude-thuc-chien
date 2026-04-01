export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  CATEGORY: '/categories/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  PROFILE: '/profile',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ROLES: '/admin/roles',
  ADMIN_ROLE_CREATE: '/admin/roles/create',
  ADMIN_ROLE_EDIT: '/admin/roles/:id/edit',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_CREATE: '/admin/users/create',
  ADMIN_USER_EDIT: '/admin/users/:id/edit',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
