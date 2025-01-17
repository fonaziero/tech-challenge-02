import { Dispatch, SetStateAction, memo } from "react";
import { Section } from "../../types/section";

interface SidebarProps {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
}

const sections = [
  { id: Section.Dashboard, label: "Início" },
  { id: Section.Transactions, label: "Transferências" },
  { id: Section.Investments, label: "Investimentos" },
  { id: Section.OtherServices, label: "Outros serviços" },
];

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const isActive = (section: string) => activeSection === section;

  const getClassNames = (section: string) =>
    `text-sm font-bold border-b-2 text-center cursor-pointer hover:text-green hover:border-green ${
      isActive(section) ? "text-green border-green" : "text-black"
    }`;

  return (
    <div className="hidden sm:block lg:bg-[#F5F5F5] w-full lg:w-1/4 p-8 lg:rounded-lg">
      <ul className="lg:space-y-6 lg:block flex justify-around">
        {sections.map(({ id, label }) => (
          <li
            key={id}
            onClick={() => setActiveSection(id)}
            className={getClassNames(id)}
          >
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Sidebar);
