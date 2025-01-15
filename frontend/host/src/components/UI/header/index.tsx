
type HeaderProps = {
    color: string;
    children: React.ReactNode;
};

const Header = ({color, children}: HeaderProps) => {
  return (
    <header className={"h-[96px] flex items-center justify-between px-6 bg-" + color}>
        {children}
    </header>
  );
};

export default Header;
