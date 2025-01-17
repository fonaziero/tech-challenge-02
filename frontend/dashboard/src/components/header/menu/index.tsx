import { Section } from "../../../types/section";

const menuModule = await import('host/Menu');
const Menu = menuModule.default;

type MainMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  setActiveSection: (section: Section) => void;
};

export default function MainMenu({
  isOpen,
  onClose,
  setActiveSection,
}: MainMenuProps) {
  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      items={[
        { name: "Início", callBack: () => {setActiveSection(Section.Dashboard); onClose() } },
        { name: "Transferências", callBack: () => {setActiveSection(Section.Transactions); onClose() } },
        { name: "Investimentos", callBack: () => {setActiveSection(Section.Investments); onClose() } },
        { name: "Outros serviços", callBack: () => {setActiveSection(Section.OtherServices); onClose() } },
      ]}
    />
  );
}
