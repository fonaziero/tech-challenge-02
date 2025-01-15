import { useState, useCallback, useEffect } from "react";
import BalanceCard from "../balanceCard";
import Sidebar from "../sidebar";
import TransactionHistory from "../transactionalHistory";
import { useNavigate } from "react-router-dom";
import SecondCardContainer from "../card/secondContainer";
import CardContainer from "../card/container";
import TransactionSection from "./transactionSection";
import { User } from "../../../interfaces/user";
import { getStoredUser } from "../../../utils/user";
import { Section } from "../../../types/section";

type DashboardProps = {
  currentSection: Section;
};

export default function Dashboard({ currentSection }: DashboardProps) {
  const router = useNavigate();
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<Section>(currentSection);
  const [transactionHistoryUpdated, setTransactionHistoryUpdated] = useState(false);

  useEffect(() => {
    setStoredUser(getStoredUser(router));
  }, [router]);

  useEffect(() => {
    setActiveSection(currentSection);
  }, [currentSection]);

  const updateUser = useCallback(() => {
    setStoredUser(getStoredUser(router));
  }, [router]);

  const handleTransactionUpdate = useCallback(() => {
    setTransactionHistoryUpdated((prev) => !prev);
    updateUser();
  }, [updateUser]);

  if (!storedUser) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:m-auto">
      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8 gap-y-8">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className="flex-1 flex justify-between flex-col gap-y-8">
            <CardContainer className="bg-darkBlue text-white items-center md:items-start">
              <BalanceCard user={storedUser} />
            </CardContainer>
            <SecondCardContainer>
              <TransactionSection
                activeSection={activeSection}
                user={storedUser}
                onTransactionUpdate={handleTransactionUpdate}
                updateUser={updateUser}
              />
            </SecondCardContainer>
          </div>
          <TransactionHistory
            updateHistoryTrigger={transactionHistoryUpdated}
            updateUser={updateUser}
          />
        </div>
      </main>
    </div>
  );
}
