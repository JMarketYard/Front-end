import { ModalContextProvider } from './components/Modal/context/ModalContext';
import Router from './routes/router';
//import { UserProvider } from './components/RaffleDetail/context/UserContext';
// import SearchBox from './components/SearchBox';

function App() {
  return (
    <>
      {/* <UserProvider> */}
      <ModalContextProvider>
        <Router />
      </ModalContextProvider>
    </>
  );
}

export default App;
