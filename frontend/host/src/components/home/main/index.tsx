import Ilustration from '@shared/images/Ilustração Banner.png';
import Button from '../../UI/buttons/button/button';
import InfoItems from '../info-items';
import Presente from '@shared/images/Ícone Presente.png';
import Saque from '@shared/images/Ícone Saque.png';
import Pontos from '@shared/images/Ícone Pontos.png';
import Dispositivos from '@shared/images/Ícone Dispositivos.png';
import { useState } from 'react';
import Container from '../container';
import RegisterModal from '../modal/register';
import LoginModal from '../modal/login';
import Footer from '../footer';
import HomeHeader from '../header';

const MainContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModalLogin = () => setIsModalLoginOpen(true);
    const handleCloseModalLogin = () => setIsModalLoginOpen(false);

    return (
        <>
            <HomeHeader />
            <Container>
                <section className="container mx-auto flex flex-col md:flex-row items-center pt-12">
                    <div className="text-left md:w-1/2 px-4 pb-7">
                        <h1 className="text-lg font-bold text-black ">
                            Experimente mais liberdade no controle da sua vida financeira.
                            Crie sua conta com a gente!
                        </h1>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src={Ilustration} alt="Gráfico financeiro" className="w-auto h-auto" />
                    </div>
                </section>
                <section className="container mx-auto bg-transparent py-12">
                    <div className="text-center">
                        <div className="flex justify-center space-x-4 py-8 md:hidden">
                            <Button type='button' onClick={handleOpenModal} bg="bg-black" color="text-white" className="hover:bg-lightGreen hover:text-green font-semibold text-[16px] leading-[19.36px] text-center">
                                Abrir conta
                            </Button>
                            <Button type='button' onClick={handleOpenModalLogin} bg="border border-black" color="text-black" className="hover:bg-lightGreen hover:text-green font-semibold text-[16px] leading-[19.36px] text-center">
                                Já tenho conta
                            </Button>
                        </div>
                        <h1 className="font-bold text-lg md:mb-20 text-black">
                            Vantagens do nosso banco:
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                            <InfoItems title={'Conta e cartão gratuitos'} description={'Nossa conta é digital, sem custo fixo e sem tarifa de manutenção.'} icon={Presente} />
                            <InfoItems title={'Saques sem custo'} description={'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.'} icon={Saque} />
                            <InfoItems title={'Programa de pontos'} description={'Acumule pontos com suas compras no crédito sem pagar mensalidade!'} icon={Pontos} />
                            <InfoItems title={'Seguro Dispositivos'} description={'Seus dispositivos móveis protegidos por uma mensalidade simbólica.'} icon={Dispositivos} />
                        </div>
                    </div>
                </section>
                <RegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
                <LoginModal isOpen={isModalLoginOpen} onClose={handleCloseModalLogin} />

            </Container>
            <Footer />
        </>

    );
};

export default MainContent;
