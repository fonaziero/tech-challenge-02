

import { format } from "date-fns";
import { Transaction } from "@shared/interfaces/transaction";

export function formatTransactionData(item: any): Transaction | null {
    try {
        const parsedDate = new Date(item.date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Data inválida');
        }
        const formattedDate = format(parsedDate, 'dd/MM/yyyy');
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const monthName = monthNames[parsedDate.getMonth()];

        return {
            id: item.id,
            date: formattedDate,
            month: monthName,
            type: item.type,
            value: `R$ ${item.value.toFixed(2)}`,
        };
    } catch (error) {
        console.error('Erro ao converter data:', error);
        return null;
    }
}

export const formatCurrencyBRL = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const parseCurrencyToFloat = (valueString: string) => {
    let sanitizedValue = valueString.replace(/[^\d,.-]/g, '');
  
    sanitizedValue = sanitizedValue.replace(',', '.');
  
    const value = parseFloat(sanitizedValue);
  
    if (isNaN(value)) {
      throw new Error('Valor inválido.');
    }
  
    return value;
  };


export function handleFetchError(error: unknown) {
    if (error instanceof Error) {
        if (error.name !== 'AbortError') {
            console.error('Erro ao buscar o extrato:', error.message);
        }
    } else {
        console.error('Erro desconhecido ao buscar o extrato:', error);
    }
}