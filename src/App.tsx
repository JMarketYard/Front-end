import './App.css';
import { ModalContextProvider } from './components/Modal/context/ModalContext';
import ModalProvider from './components/Modal/context/ModalProvider';
import Router from './routes/router';

function App() {
  return (
    <>
      <ModalContextProvider>
        <Router />
      </ModalContextProvider>
    </>
  );
}

export default App;
