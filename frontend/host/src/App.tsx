import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import MainContent from './components/home/main';
import Footer from './components/home/footer';
import HomeHeader from './components/home/header';
import ErrorBoundary from './ErrorBoundary';
import Container from './components/home/container';
import DashboardApp from 'dashboard/DashboardApp';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <HomeHeader />
        <Suspense fallback={<Container><div className='text-white'>Carregando o Dashboard...</div></Container>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/dashboard/*" element={<DashboardApp />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;