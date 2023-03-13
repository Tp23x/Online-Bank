import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
// import axios from 'axios';
import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from './store/store'
import api from './components/api/api'
// import { QueryClient, QueryClientProvider } from 'react-query';

// const queryClient = new QueryClient()

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
      <BrowserRouter>

        <Provider store={store}>
          <AuthProvider>

            <App />

          </AuthProvider>
        </Provider>
      </BrowserRouter>
    {/* </QueryClientProvider> */}

  </React.StrictMode >
);

reportWebVitals();
