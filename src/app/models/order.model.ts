// src/app/models/order.model.ts
export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    // Additional fields as necessary
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }
  