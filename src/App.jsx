import { FavouritesProvider } from './components/store/FavouritesProvider';
import Cards from './components/UI/Cards';
import Header from './components/UI/Header';
import Main from './components/UI/Main';

function App() {
  return (
    <FavouritesProvider>
      <Header />
      <Main>
        <Cards />
      </Main>
    </FavouritesProvider>
  );
}

export default App;
