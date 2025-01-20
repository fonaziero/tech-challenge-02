import { ReactComponent as Logo } from '@shared/images/Logo.svg';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto flex flex-col px-10 md:flex-row justify-between items-start md:items-start space-y-6 md:space-y-0">
                <div className="text-start md:text-left">
                    <h3 className="font-bold text-[16px] leading-[19.2px] font-inter mb-4">Serviços</h3>
                    <ul className="space-y-2 text-[16px] leading-[19.2px] font-inter font-normal">
                        <li>Conta corrente</li>
                        <li>Conta PJ</li>
                        <li>Cartão de crédito</li>
                    </ul>
                </div>
                <div className="text-start md:text-left">
                    <h3 className="font-bold text-[16px] leading-[19.2px] font-inter mb-4">Contato</h3>
                    <ul className="space-y-2 text-[16px] leading-[19.2px] font-inter font-normal">
                        <li>0800 004 250 08</li>
                        <li>meajuda@bytebank.com.br</li>
                        <li>ouvidoria@bytebank.com.br</li>
                    </ul>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-gray-400 text-[16px] leading-[19.2px] font-inter font-bold mb-4">Desenvolvido por Victor</h3>
                    <Logo width={145} height={32} className="logo-white" />
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="Instagram" >
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a href="#" aria-label="WhatsApp" >
                            <i className="fab fa-whatsapp fa-lg"></i>
                        </a>
                        <a href="#" aria-label="YouTube" >
                            <i className="fab fa-youtube fa-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
