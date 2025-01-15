import { create } from 'zustand';


interface AppState {
  balance: number;
  transactions: Array<{ id: string; type: string; amount: number }>;
  addTransaction: (transaction: { id: string; type: string; amount: number }) => void;
  removeTransaction: (id: string) => void;
}

export const useGlobalState = create<AppState>((set) => ({
  balance: 2500,
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
      balance: state.balance + (transaction.type === 'deposit' ? transaction.amount : -transaction.amount),
    })),
  removeTransaction: (id) =>
    set((state) => {
      const transaction = state.transactions.find((t) => t.id === id);
      if (!transaction) {
        return state;
      }

      return {
        transactions: state.transactions.filter((t) => t.id !== id),
        balance: state.balance - (transaction.type === 'deposit' ? transaction.amount : -transaction.amount),
      };
    }),
}));
