import { Dispatch, SetStateAction } from "react";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./userMenu";
import MainMenu from "./menu";
import { getStoredUser } from "@shared/utils/user";
import { User } from "@shared/interfaces/user";
import { Section } from "../../types/section";

const HeaderModule = await import('host/Header');
const Header = HeaderModule.default;

type DashboardHeaderProps = {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
};

export default function DashboardHeader({ setActiveSection }: DashboardHeaderProps) {
  const router = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser(router));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router("/");
  };

  return (
    <Header color="darkBlue">
      <div className="flex items-center justify-between w-full sm:hidden">
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} color="red" />
      </div>

      <div className="flex items-center justify-around w-full relative">
        <div></div>
        {user && (
          <UserMenu
            user={user}
            isOpen={isUserDropdownOpen}
            toggleDropdown={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            onLogout={handleLogout}
          />
        )}
        <MainMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          setActiveSection={setActiveSection}
        />
      </div>
    </Header>
  );
}
