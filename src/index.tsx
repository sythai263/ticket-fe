import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common = {
//   Authorization: `Bearer ${localStorage.getItem(StorageKeys.token)}`,
// };

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
