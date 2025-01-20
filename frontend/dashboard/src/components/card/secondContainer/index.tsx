import PixelTop from "@shared/images/Pixels3.png";
import PixelBottom from "@shared/images/Pixels4.png";
import CardContainer from "../container";

type SecondCardContainerProps = {
    children: React.ReactNode;
};

const SecondCardContainer = ({children}: SecondCardContainerProps) => {
    return (
        <CardContainer className='bg-cardGray text-lightGray z-10 items-center sm:items-start'>
        <img
          src={PixelTop}
          alt="Pixels Top Right"
          className="block -z-10 absolute top-0 left-0 sm:right-0 sm:left-auto"
        />
        <img
          src={PixelBottom}
          alt="Pixels Bottom Left"
          className="block -z-10 absolute bottom-0 right-0 sm:left-0"
        />
        {children}
        </CardContainer>
    );
};

export default SecondCardContainer;