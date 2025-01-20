import React, { useState } from "react";
import BannerModal from '@shared/images/Ilustração cadastro.png';
import { useNavigate } from "react-router-dom";
import Modal from "../../../UI/modal";
import FormInput from "../../../UI/inputs/input";
import { handleRequest } from "@shared/utils/fetch-api";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAction?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isFormValid = email && password;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setError('');
        
        try {
            const response = await handleRequest('user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erro ao fazer login');
            }
            if(data.result.token){
                const userInfo = await handleRequest('account', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.result.token}`,
                    },
                })
                const dataInfo = await userInfo.json();

                localStorage.setItem('user', JSON.stringify({
                    id: dataInfo.result.account[0].userId,
                    accountId: dataInfo.result.account[0].id,
                    name: dataInfo.result.cards[0].name,
                    email: email,
                    balance: +dataInfo.result.cards[0].cvc,
                    transationType: dataInfo.result.cards[0].type,
                    token: data.result.token
                }));
                onClose();
                navigate('/dashboard');
            }

        } catch (err) {
            console.error('Erro ao fazer a requisição:', err);
            setError('Erro ao conectar ao servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} height="100vh" width="792px" hasFooter={false}>
            <div className="flex items-center justify-center bg-gray-100 p-5 md:pb-6">
                <img
                    src={BannerModal}
                    alt="Ilustração"
                    className="w-auto h-auto"
                />
            </div>

            <div className="w-full px-4 md:px-24">
                <h2 className="text-md font-bold mb-4 ">
                    Preencha os campos abaixo para acessar sua conta!
                </h2>

                {error && <div className="text-red mb-4">{error}</div>}

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                        <FormInput
                            label="Email"
                            type="email"
                            value={email}
                            placeholder="Digite seu email"
                            onChange={(value) => setEmail(value)}
                        />
                    </div>

                    <div className="w-full md:w-1/2 lg:w-full">
                        <FormInput
                            label="Senha"
                            type="password"
                            value={password}
                            placeholder="Digite sua senha"
                            onChange={(value) => setPassword(value)}
                        />
                    </div>

                    <div>
                        <a href="#" className="text-green text-sm font-normal decoration-green hover:underline">Esqueci minha senha</a>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`bg-green text-white py-4 px-12 rounded-md ${!isFormValid || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green'}`}
                            disabled={!isFormValid || loading}
                        >
                            {loading ? 'Carregando...' : 'Acessar'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default LoginModal;

