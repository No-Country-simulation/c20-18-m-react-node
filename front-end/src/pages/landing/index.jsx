import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cleanSession } from '../../helpers/auth';

function LandingPage() {
  // limpiamos datos de sesión anterior, en caso la sesión no haya sido cerrada.
  useEffect(() => {
    cleanSession();
  }, []);

  return (
    <>
      <h1>Seguimiento Escolar</h1>
      <Link to='/login'>
        <button type='button'>Ingresar</button>
      </Link>
    </>
  );
}

export default LandingPage;
