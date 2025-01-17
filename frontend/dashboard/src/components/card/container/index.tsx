
type CardContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const CardContainer = ({children, className}: CardContainerProps) => {
    return (
        <div className={"relative p-6 gap-10 sm:gap-0 rounded-lg min-w-[36vw] min-h-[655px] sm:min-h-[47vh] flex flex-col " + className}>
            {children}
        </div>
    );
};

export default CardContainer;