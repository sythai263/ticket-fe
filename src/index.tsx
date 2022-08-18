import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
