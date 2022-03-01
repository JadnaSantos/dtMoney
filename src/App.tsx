import { Dashboard } from "./components/Dashboard";
import Modal from 'react-modal'
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import {NewTransactionModal} from './components/NewTransactionModal'
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root')

export function App() {

  const [isNewModalTransactionOpen, setIsNewModalTransactionOpen] = useState(false)

  const handleOpenTransactionModal = () => {
    setIsNewModalTransactionOpen(true);
  }

  const handleCloseTransactionModal = () => {
    setIsNewModalTransactionOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header 
        onOpenNewTransactionModal={handleOpenTransactionModal}
      />
      <NewTransactionModal 
        isOpen={isNewModalTransactionOpen}
        onRequestClose={handleCloseTransactionModal}
      />
      <Dashboard/>
      <GlobalStyle/>
    </TransactionsProvider>
  );
}


