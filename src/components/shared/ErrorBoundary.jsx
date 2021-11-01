import React, { PureComponent } from 'react';

class ErrorBoundary extends PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 这里可以将错误日志上报至服务器
    console.warn(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      // 显示降级后的 UI 并渲染
      return <h1>出错啦</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
