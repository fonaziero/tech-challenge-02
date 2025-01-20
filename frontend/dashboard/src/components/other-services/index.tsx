import RedirectCard from "../card/redirect";
import LoanIcon from "@shared/images/Ícone empréstimo.png";
import CardIcon from "@shared/images/Ícone cartões.png";
import DonationIcon from "@shared/images/Ícone doações.png";
import PixIcon from "@shared/images/Ícone Pix.svg";
import InsuranceIcon from "@shared/images/Ícone seguros.png";
import CellPhoneCreditIcon from "@shared/images/Ícone Recarga.png";

export default function OtherServicesCard() {
  return (
      <div className="flex flex-col gap-5 h-full w-full">
        <h3 className="text-lg font-bold text-black">Confira os serviços disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          <RedirectCard icon={LoanIcon} title="Empréstimo" />
          <RedirectCard icon={CardIcon} title="Meus cartões" />
          <RedirectCard icon={DonationIcon} title="Doações" />
          <RedirectCard icon={PixIcon} title="Pix" />
          <RedirectCard icon={InsuranceIcon} title="Seguros" />
          <RedirectCard icon={CellPhoneCreditIcon} title="Crédito celular" />
        </div>
      </div>
  );
}
