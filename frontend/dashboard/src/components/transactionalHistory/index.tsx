import { useEffect, useState, useRef } from 'react';
import { Header } from './header';
import History from './history';
import { Transaction } from '@shared/interfaces/transaction';
import { handleFetchError } from '../../utils/formatters';
import { handleScroll } from '../../utils/scroll';
import { User } from '@shared/interfaces/user';
import { handleRequest } from '@shared/utils/fetch-api';
import { formatDate, getMonth } from '@shared/utils/date';

interface TransactionHistoryProps {
  user: User;
  updateHistoryTrigger: boolean;
  updateUser: () => void;
}

export default function TransactionHistory({ user, updateHistoryTrigger, updateUser }: TransactionHistoryProps) {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  const LIMIT = 10;

  useEffect(() => {
    const loadHistory = async () => {
      setHistory([]);
      setOffset(0);
      setHasMore(true);
      await loadMoreHistory(0);
    };
    loadHistory();
  }, [updateHistoryTrigger, updateTrigger]);

  const loadMoreHistory = async (newOffset: number) => {
    setLoading(true);
    try {
      const response = await handleRequest(`account/${user.accountId}/statement`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar o extrato');
      }

      const data = await response.json();
      const allTransactions = data.result.transactions;
      const paginatedTransactions = allTransactions.slice(newOffset, newOffset + LIMIT);

      if (paginatedTransactions.length < LIMIT) {
        setHasMore(false);
      }

      setHistory((prevHistory) => [
        ...prevHistory,
        ...paginatedTransactions.filter(
          (transaction: any) => !prevHistory.some((item) => item.id === transaction.id)
        ),
      ]);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (offset > 0 && hasMore) {
      loadMoreHistory(offset);
    }
  }, [offset]);

  return (
    <div className="flex-1 flex p-0">
      <div
        ref={containerRef}
        onScroll={() => handleScroll(containerRef, loading, hasMore, setOffset, LIMIT)}
        className="bg-white rounded-lg shadow-md w-full p-8 pt-0 lg:min-w-[282px] lg:h-full lg:min-h-screen overflow-y-auto"
        style={{ maxHeight: '500px' }}
      >
        <Header
          history={history}
          onUpdateHistory={() => setUpdateTrigger((prev) => !prev)}
          updateUser={updateUser}
        />
        <ul className="space-y-4">
          {history.length > 0 ? (
            history.map((item) => (
              <li key={item.id}>
                <History
                  {...item}
                  date={formatDate(item.date)} 
                  month={getMonth(item.date)}
                />
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma transação disponível.</p>
          )}
        </ul>
        {loading && <p className="text-center text-gray-500 mt-4">Carregando mais transações...</p>}
      </div>
    </div>
  );
}
