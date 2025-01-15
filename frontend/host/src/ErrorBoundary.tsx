import React from 'react';

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
      return <h1>Algo deu errado ao carregar este componente.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
