import { MemoryRouter} from 'react-router-dom';
import Dashboard from "./components/main";
import { Section } from "./types/section";
import DashboardHeader from "./components/header";
import { useState } from 'react';

const DashboardApp = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Dashboard);

  return (
    <>
      <MemoryRouter>
        <DashboardHeader activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex flex-col min-h-screen bg-lightGreen">
          <Dashboard currentSection={activeSection} />
        </div>
      </MemoryRouter>
    </>
  );
};

export default DashboardApp;
