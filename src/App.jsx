import { FavoritesProvider } from "./components/store/FavoritesProvider";
import Cards from "./components/UI/Cards";
import Header from "./components/UI/Header";
import Main from "./components/UI/Main";

function App() {
  return (
    <FavoritesProvider>
      <Header />
      <Main>
        <Cards />
      </Main>
    </FavoritesProvider>
  );
}

export default App;
