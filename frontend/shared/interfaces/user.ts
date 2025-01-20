export interface User {
    id: string;
    accountId: string;
    name: string;
    email: string;
    password: string;
    balance: number;
    type:string;
    token: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
  }
  