// ==========================
// ENUMS (iguais ao schema)
// ==========================
export type ProductStatus = "DRAFT" | "ACTIVE" | "HIDDEN" | "DISCONTINUED";
export type OrderStatus   = "PENDING" | "PAID" | "FULFILLED" | "CANCELLED" | "REFUNDED";

// ==========================
// AUTH / USER
// ==========================
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;

  // relations (opcionais)
  user?: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string; // ISO

  // relations
  user?: User;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: string | null; // ISO
  image?: string | null;
  createdAt: string; // ISO

  // relations
  accounts?: Account[];
  sessions?: Session[];
  orders?: Order[];
  cart?: Cart | null;
  reviews?: Review[];
  addresses?: Address[];
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: string; // ISO
}

// ==========================
// ENDEREÇO
// ==========================
export interface Address {
  id: string;
  userId: string;
  label?: string | null;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postal?: string | null;
  country: string;

  // relations
  user?: User;
}

// ==========================
// CATÁLOGO
// ==========================
export interface Brand {
  id: string;
  name: string;
  slug: string;

  // relations
  products?: Product[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  path: string; // default "/"

  // relations
  parent?: Category | null;
  children?: Category[];
  products?: ProductCategory[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  status: ProductStatus;
  brandId?: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  // campo denormalizado
  searchText: string; // default ""

  // relations
  brand?: Brand | null;
  variants?: ProductVariant[];
  images?: Image[];
  categories?: ProductCategory[];
  reviews?: Review[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  attrs: Record<string, any>; // Json
  isActive: boolean;

  // relations
  product?: Product;
  price?: Price | null;
  inventory?: Inventory | null;
  cartItems?: CartItem[];
  orderItems?: OrderItem[];
}

export interface Price {
  variantId: string; // PK
  currency: string;  // "USD","BRL"...
  amount: string;    // Decimal como string
  compareAt?: string | null; // Decimal
  effectiveFrom: string; // ISO

  // relations
  variant?: ProductVariant;
}

export interface Inventory {
  variantId: string; // PK
  quantity: number;
  reserved: number;

  // relations
  variant?: ProductVariant;
}

export interface Image {
  id: string;
  productId: string;
  url: string;
  alt?: string | null;
  position: number;

  // relations
  product?: Product;
}

export interface ProductCategory {
  productId: string;
  categoryId: string;

  // relations
  product?: Product;
  category?: Category;
}

// ==========================
// CARRINHO
// ==========================
export interface Cart {
  id: string;
  userId: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO

  // relations
  user?: User;
  items?: CartItem[];
}

export interface CartItem {
  id: string;
  cartId: string;
  variantId: string;
  qty: number;

  // relations
  cart?: Cart;
  variant?: ProductVariant;
}

// ==========================
// PEDIDO / PAGAMENTO / ENVIO
// ==========================
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: string;   // Decimal
  currency: string;
  createdAt: string; // ISO

  // relations
  user?: User;
  items?: OrderItem[];
  payments?: Payment[];
  shipments?: Shipment[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  unitPrice: string; // Decimal
  qty: number;

  // relations
  order?: Order;
  variant?: ProductVariant;
}

export interface Payment {
  id: string;
  orderId: string;
  provider: string; // "stripe","pix",...
  status: string;   // "authorized","captured","failed",...
  amount: string;   // Decimal
  createdAt: string; // ISO

  // relations
  order?: Order;
}

export interface Shipment {
  id: string;
  orderId: string;
  carrier?: string | null;
  code?: string | null;
  status: string; // default "processing"
  createdAt: string; // ISO

  // relations
  order?: Order;
}

// ==========================
// REVIEWS
// ==========================
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number; // default 5
  title?: string | null;
  body?: string | null;
  createdAt: string; // ISO

  // relations
  product?: Product;
  user?: User;
}
