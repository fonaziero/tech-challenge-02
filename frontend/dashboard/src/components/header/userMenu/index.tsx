import { User } from "@shared/interfaces/user";

const menuModule = await import('host/Menu');
const Menu = menuModule.default;

type UserMenuProps = {
  user: User;
  isOpen: boolean;
  toggleDropdown: () => void;
  onLogout: () => void;
};

export default function UserMenu({
  user,
  isOpen,
  toggleDropdown,
  onLogout,
}: UserMenuProps) {
  return (
    <div className="flex items-center cursor-pointer relative" onClick={toggleDropdown}>
      <span className="mr-8 text-white text-xs font-semibold hidden sm:flex">
        {user?.name}
      </span>
      <i className="fa-regular fa-circle-user text-red text-2xl"></i>
      <Menu
        isOpen={isOpen}
        onClose={() => toggleDropdown()}
        left={false}
        textColor="green"
        backgroundColor="black"
        isMobile={false}
        items={[
          { name: "Minha conta", link: "/dashboard/my-account" },
          { name: "Configurações", link: "/dashboard/configurations" },
          { name: "Sair", callBack: onLogout },
        ]}
      />
    </div>
  );
}