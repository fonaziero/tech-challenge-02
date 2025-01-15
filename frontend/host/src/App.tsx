import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import MainContent from './components/home/main';
import Footer from './components/home/footer';
import HomeHeader from './components/home/header';
// import ErrorBoundary from './ErrorBoundary';
// import DashboardApp from 'dashboard/DashboardApp';

// Lazy loading do DashboardApp com tratamento de erro
const DashboardApp = lazy(() =>
  import('dashboard/DashboardApp').catch((err) => {
    console.error("Erro ao carregar o DashboardApp:", err);
    return { default: () => <div>Erro ao carregar o Dashboard</div> };
  })
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <HomeHeader />
        <DashboardApp />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
