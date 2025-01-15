import { useLocation } from "react-router-dom";

type MenuProps = {
    backgroundColor?: string;
    textColor?: string;
    left?: boolean;
    isMobile?: boolean;
    items: { name: string; link?: string; callBack?: () => void }[];
    isOpen: boolean;
    onClose: () => void;
};

const Menu = ({
    left = true,
    textColor = "red",
    backgroundColor = "white",
    isMobile = true,
    items,
    isOpen,
    onClose,
}: MenuProps) => {
    const location = useLocation(); // Substituto do usePathname
    const contrastColor = backgroundColor === "white" ? "black" : "white";
    const isMoileRender = isMobile ? "md:hidden" : "";

    return (
        <>
            <div
                className={`fixed top-0 w-64 h-full z-50 transform transition-transform duration-300 ease-in-out ${isMoileRender} ${
                    isOpen
                        ? left
                            ? "translate-x-0"
                            : "translate-x-0 right-0"
                        : left
                        ? "-translate-x-full"
                        : "translate-x-full"
                } bg-${backgroundColor} ${left ? "left-0" : "right-0"}`}
            >
                <div className="flex justify-between items-center px-4 py-2">
                    <div></div>
                    <button onClick={onClose} className="text-green">
                        ✕
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                    {items.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            onClick={item.callBack}
                            className={`border-b pb-2 ${
                                location.pathname === item.link
                                    ? `text-${textColor}`
                                    : `text-${contrastColor}`
                            }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>

            {isOpen && (
                <div
                    className={`fixed inset-0 bg-black opacity-50 z-40 ${isMoileRender}`}
                    onClick={onClose}
                ></div>
            )}
        </>
    );
};

export default Menu;
