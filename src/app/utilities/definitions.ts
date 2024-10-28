// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  export type UserProfile = {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_type : string;
    user_join_date : Date;
    user_profile_picture : string;
    user_bio : string; 
    user_address : string;

  };
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
    image_url: string;
  };
  
  export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'paid';
  };
  
  export type Revenue = {
    month: string;
    revenue: number;
  };
  
  export type LatestInvoice = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
  };
  
  // The database returns a number for amount, but we later format it to a string with the formatCurrency function
  export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
    amount: number;
  };
  
  export type InvoicesTable = {
    id: string;
    customer_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    amount: number;
    status: 'pending' | 'paid';
  };
  
  export type CustomersTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
  };
  
  export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
  };
  
  export type CustomerField = {
    id: string;
    name: string;
  };
  
  export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid';
  };
  export interface ProductDetails {
    product_id: string;
    user_id: string;
    product_title: string;
    product_description: string;
    product_price: number;
    product_stock_quantity: number;
    category_id: string;
    product_created_date: Date;
    product_updated_date: Date;
    product_image_url: string;
}

export interface SellerDetails {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_type: string;
    user_join_date: Date;
    user_profile_picture: string;
    user_bio: string;
    user_address: string;
}


export interface Review {
    user_name: string;
    review_id: string;
    review_comment: string;
    review_rating: string;
    review_created_date: string;
    user_id: string;
    product_id: string;
}