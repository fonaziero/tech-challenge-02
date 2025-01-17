
import TransactionForm from "../../transactionForm";
import InvestmentsCard from "../../investments";
import OtherServicesCard from "../../other-services";
import { User } from "@shared/interfaces/user";
import { Section } from "../../../types/section";

type TransactionSectionProps = {
  activeSection: Section;
  user: User;
  onTransactionUpdate: () => void;
  updateUser: () => void;
};

export default function TransactionSection({ activeSection, user, onTransactionUpdate, updateUser }: TransactionSectionProps) {
  switch (activeSection) {
    case Section.Dashboard:
    case Section.Transactions:
      return (
        <TransactionForm
          user={user}
          updateUser={updateUser}
          onTransactionSubmit={onTransactionUpdate}
        />
      );
    case Section.Investments:
      return <InvestmentsCard />;
    case Section.OtherServices:
      return <OtherServicesCard />;
    default:
      return null;
  }
}
