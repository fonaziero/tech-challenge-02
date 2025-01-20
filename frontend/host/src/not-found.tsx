'use client';

import Container from './components/home/container';
import Button from './components/UI/buttons/button/button';
import NotFoundImg from '@shared/images/Ilustração 404.png';
import Footer from './components/home/footer';
import { useNavigate } from 'react-router-dom';
import Header from './components/home/header';

const NotFound = () => {

    const router = useNavigate();
    const handleClick = () => {
        router('/');
    };

    return (
        <>
            <Header />
            <Container className='h-[calc(100vh-268.81px)] overflow-hidden'>
                <div className='flex justify-center items-center flex-col mt-5 space-y-4'>
                    <h1 className='text-black text-lg font-bold '>Ops! Não encontramos a página... </h1>
                    <p className='text-black text-sm '>E olha que exploramos o universo procurando por ela! Que tal voltar e tentar novamente?</p>
                    <Button type='button' bg='bg-red' onClick={handleClick}>Voltar ao início</Button>
                    <img src={NotFoundImg} alt="not found" />
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default NotFound;
