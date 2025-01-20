interface RedirectCardProps {
    icon: string;
    title: string;
}

const RedirectCard: React.FC<RedirectCardProps> = ({ icon, title }) => {
    return (
        <div className="flex flex-col items-center justify-center  bg-white p-4 rounded-lg shadow-md w-full max-h-full h-[167px] text-center transition-transform hover:scale-105 cursor-pointer">
            <div className="mb-4 flex ">
                <img src={icon} alt="icon" />
            </div>
            <p className="text-sm font-bold text-black">{title}</p>
        </div>
    );
};

export default RedirectCard;
