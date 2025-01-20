import { useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { ReactComponent as Logo } from '@shared/images/Logo.svg';
import Button from '../../UI/buttons/button/button';
import RegisterModal from '../modal/register';
import LoginModal from '../modal/login';
import Menu from '../../UI/menu';
import Header from '../../UI/header';

const HomeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <Header color='black'>
      <div className="flex items-center justify-between w-full md:hidden">
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} color={'green'} />
        <div className="ml-auto">
          <Logo className="h-10 logo-green" width={145} height={32} />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-around w-full">
        <div className="flex items-center space-x-6">
          <Logo className="h-10 logo-green" width={145} height={32} />
          <nav className="flex space-x-6">
            <a href="#" className="text-green hover:text-lightGreen font-semibold text-[18px] leading-[21.78px] text-center">Sobre</a>
            <a href="#" className="text-green hover:text-lightGreen font-semibold text-[18px] leading-[21.78px] text-center">Serviços</a>
          </nav>
        </div>
        <div className="flex space-x-4">
          <Button type={'button'} onClick={handleOpenModal} bg="bg-green" color="text-white" className="hover:bg-lightGreen hover:text-black font-semibold text-[16px] leading-[19.36px] text-center">
            Abrir minha conta
          </Button>
          <Button type={'button'} onClick={handleOpenLoginModal} bg="border border-green" color="text-green" className="hover:bg-lightGreen hover:text-black font-semibold text-[16px] leading-[19.36px] text-center">
            Já tenho conta
          </Button>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} items={[{ name: 'Início', link: '#' },]} />
      <RegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Header>
  );
};

export default HomeHeader;
