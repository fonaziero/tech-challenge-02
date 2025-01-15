// import { MemoryRouter, Routes, Route } from 'react-router-dom';

const DashboardHome = () => <div>Dashboard Home</div>;
console.log("Renderizando DashboardApp...");

const DashboardApp = () => {
  return (
    // <MemoryRouter>
    //   <Routes>
    //     <Route path="/" element={} />
    //   </Routes>
    // </MemoryRouter>
    <DashboardHome />
  );
};

export default DashboardApp;
