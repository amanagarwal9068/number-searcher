import Card from './components/Card';
import Navbar from './components/Navbar';
import WorkersState from './context/WorkersState';

function App() {
  return (
    <>
      <WorkersState>
        <Navbar />
        <Card />
      </WorkersState>
    </>
  );
}

export default App;
