import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="text-gray-500 font-mono text-sm p-6 text-center">
          // PREVIEW_UNAVAILABLE — odśwież stronę
        </div>
      );
    }
    return this.props.children;
  }
}
