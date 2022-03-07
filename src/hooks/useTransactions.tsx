import { createContext, ReactNode, useContext,  useEffect,  useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransactions: (transaction: TransactionInput) => Promise<void>;
}


type TransactionInput = Omit<Transaction, 'id' | 'createdAt' >;

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);


export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const storeTransactions = localStorage.getItem('transactions')

        if(storeTransactions) {
            return JSON.parse(storeTransactions)
        }
        return []
    });

    useEffect(() => { 
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    async function createTransactions(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransactions  }}>
            {children}
        </TransactionsContext.Provider>
    )
}


export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context
}