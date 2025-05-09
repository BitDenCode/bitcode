import CoinTable from "./components/MemecoinTable";
import Header from './components/Header';
import Footer from './components/Footer';
import MainSection from './components/MainSection';
import MemecoinOverview from './components/MemecoinOverview';
import Meme from './components/Meme';

function App() {
  return (
    <div>
      <Header />
      <MainSection />
      <CoinTable />
      <MemecoinOverview />
      <Meme />
      <Footer />
    </div>
  );
}

export default App;
