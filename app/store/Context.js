import { createContext, useContext, useState } from "react";

const Context = createContext();

  // Esimerkki viimeisimmistä tapahtumista
const sampleTransactions = [
    { id: '1', type: 'Tulo', amount: 500, date: '01.12.2024', category: 'palkka' },
    { id: '2', type: 'Kulu', amount: 150, date: '30.11.2024', category:'asuminen' },
    { id: '3', type: 'Tulo', amount: 300, date: '29.11.2024', category:'lahja'  },
];

const ContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(sampleTransactions);

  const addTransaction = (isIncome, amount, date, category) => {
    const nextId = transactions[transactions.length - 1].id + 1; //if we get firebase DB this should be changed
    const transaction = {
      id: nextId,
      type: isIncome ? 'Tulo' : 'Kulu',
      amount: amount,
      date: date.toLocaleDateString("fi-FI"),
      category: category
    };
    setTransactions((prev) => [...prev, transaction]);
  }

  return (
    <Context.Provider value={{ transactions, addTransaction }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useAppContext = () => useContext(Context);