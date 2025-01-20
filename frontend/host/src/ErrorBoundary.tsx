import React from 'react';
import Container from './components/home/container';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false } as any;
  }

  static getDerivedStateFromError() {
    // Atualiza o estado para renderizar a interface de fallback.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Você pode registrar o erro em algum serviço de monitoramento, como Sentry.
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Interface de fallback para quando um erro for capturado.
      return (
        <Container>
          <div className="flex justify-center items-center"></div>
          <h1 className='text-white'>Algo deu errado ao carregar este componente.</h1>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
