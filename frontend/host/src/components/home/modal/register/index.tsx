import React, { useState, useEffect } from "react";
import BannerModal from '@shared/images/Ilustração Login.png';
import Modal from "../../../UI/modal";
import FormInput from "../../../UI/inputs/input";
import { handleRequest } from "@shared/utils/fetch-api";
import { useNavigate } from "react-router-dom";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAction?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();


    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        if (username && email && password && isChecked && isEmailValid(email)) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [username, email, password, isChecked]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isFormValid) {
            try {
                const response = await handleRequest('user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: username, email, password }),
                });

                if (response.ok) {
                    // const { result } = await response.json();
                    const loginResponse = await handleRequest('user/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });
                    
                    const data = await loginResponse.json();

                    if (!response.ok) {
                        console.log(data.message || 'Erro ao fazer login');
                    }
                    if (data.result.token) {
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
                            token: data.result.token
                        }));
                        onClose();
                        navigate('/dashboard');
                    }
                } else {
                    console.error('Erro no registro');
                }
            } catch (error) {
                console.error('Erro na requisição', error);
            }
        }
    };

    const handleBlur = (field: string) => {
        if (field === 'name' && !username) {
            setNameError('Campo obrigatório.');
        } else if (field === 'email' && !isEmailValid(email)) {
            setEmailError('Dado incorreto. Revise e digite novamente.');
        } else if (field === 'password' && !password) {
            setPasswordError('Campo obrigatório.');
        }
    };

    const handleInputChange = (field: string, value: string) => {
        if (field === 'name') {
            setUsername(value);
            setNameError('');
        } else if (field === 'email') {
            setEmail(value);
            setEmailError('');
        } else if (field === 'password') {
            setPassword(value);
            setPasswordError('');
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
                    Preencha os campos abaixo para criar sua conta corrente!
                </h2>

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                        <FormInput
                            label="Nome"
                            type="text"
                            value={username}
                            placeholder="Digite seu nome completo"
                            error={nameError} onChange={(value) => handleInputChange('name', value)}
                            onBlur={() => handleBlur('name')}
                        />
                    </div>

                    <div>
                        <FormInput
                            label="Email"
                            type="email"
                            value={email}
                            placeholder="Digite seu email"
                            error={emailError}
                            onChange={(value) => handleInputChange('email', value)}
                            onBlur={() => handleBlur('email')}
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <FormInput
                            label="Senha"
                            type="password"
                            value={password}
                            placeholder="Digite sua senha"
                            error={passwordError}
                            onChange={(value) => handleInputChange('password', value)}
                            onBlur={() => handleBlur('password')}
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center cursor-pointer relative">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-2 border-green checked:bg-green checked:border-green"
                                id="check"
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <label htmlFor="check" className="ml-2 text-sm text-black">
                            Li e estou ciente quanto às condições de tratamento dos meus
                            dados conforme descrito na Política de Privacidade do banco.
                        </label>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`bg-red text-white p-4 rounded-md ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red'}`}
                            disabled={!isFormValid}
                        >
                            Criar conta
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default RegisterModal;
