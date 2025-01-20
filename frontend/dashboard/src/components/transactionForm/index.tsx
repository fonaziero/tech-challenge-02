import { useState } from 'react';
import CreditCard from "../../../../shared/images/card.png";
import { User } from '@shared/interfaces/user';
import { options } from '../../types/transactionType';
import { handleRequest } from '@shared/utils/fetch-api';

const ButtonModule = await import('host/Button');
const Button = ButtonModule.default;

const InputModule = await import('host/Input');
const FormInput = InputModule.default;

const SelectModule = await import('host/Select');
const DropdownSelect = SelectModule.default;

type TransactionFormProps = {
  user: User;
  updateUser: () => void;
  onTransactionSubmit: () => void;
};

export default function TransactionForm({ user, updateUser, onTransactionSubmit }: TransactionFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleInputChange = (inputValue: string) => {
    setValue(inputValue);
    setError('');

    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      if (parsedValue < 0) {
        setTransactionType('Transferência');
      } else {
        setTransactionType('Depósito');
      }
    } else {
      setTransactionType('');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!value || !selectedMethod || !transactionType) {
      setError('Preencha todos os campos');
      return;
    }

    const transactionValue = parseFloat(value);
    if (user) {
      try {
        const response = await handleRequest('account/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            accountId: user.accountId,
            value: transactionValue,
            type: 'Debit',
          }),
        });

        if (!response.ok) {
          throw new Error('Falha ao adicionar a transação');
        }

        const newBalance = user.balance - transactionValue;

        // const patchResponse = await fetch(`/api/dashboard/user?userId=${user.id}`, {
        //   method: 'PATCH',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ balance: newBalance }),
        // });

        // if (!patchResponse.ok) {
        //   throw new Error('Falha ao atualizar o saldo do usuário');
        // }

        const updatedUser = {
          ...user,
          balance: newBalance,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        updateUser();
        onTransactionSubmit();

      } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        setError('Erro ao adicionar a transação');
      }
    }
  };

  return (
    <>
    <h3 className="text-xl mb-4">Nova transação</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <DropdownSelect
          placeholder="Selecione o método"
          color="darkBlue"
          options={options}
          onChange={setSelectedMethod}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-5 items-center sm:items-start">
        <div className="w-full max-w-min sm:max-w-fit sm:w-auto flex flex-1 flex-col gap-3">
          <label className="block mb-2 text-sm self-center sm:self-start">Valor</label>
          <FormInput
            type="number"
            value={value}
            onChange={(value: any) => handleInputChange(value)}
            placeholder="00,00"
            required={true}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" bg="bg-darkBlue" className="w-full h-full text-white p-2 rounded">
            Concluir transação
          </Button>
        </div>
        <img src={CreditCard} alt="img" className="lg:hidden -z-10" />
      </div>
    </form>
  </>
  );
}


