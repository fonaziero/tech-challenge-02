type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container = ({ children, className }: ContainerProps) => {

    return (
        <main className={`bg-main-gradient flex flex-col text-black ${className ? className : 'min-h-screen'}`} >
            {children}
        </main>
    );
};

export default Container;
