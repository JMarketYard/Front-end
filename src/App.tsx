import { ModalContextProvider } from './components/Modal/context/ModalContext';
import Router from './routes/router';
// import SearchBox from './components/SearchBox';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <ModalContextProvider>
          <Router />
        </ModalContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
