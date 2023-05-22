import './App.css';

import PokemonProvider from './context/PokemonProvider';
import Header from './components/Header';
import Gallery from './components/Gallery';

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <Header />
        <Gallery />
      </div>
    </PokemonProvider>
  );
}

export default App;
