import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <h1>Seguimiento Escolar Landing Page</h1>
      <Link to='/login'>
        <button type='button'>Ingresar</button>
      </Link>
    </>
  );
}

export default App;
