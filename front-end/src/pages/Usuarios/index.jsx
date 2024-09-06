import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../helpers/auth';
import SideBar from '../../assets/components/SideBar';

// TODO: completar
function UsuariosView() {
  let navigate = useNavigate();

  useEffect(() => {
    const TOKEN = getToken();
    if (!TOKEN) navigate('/');
  }, []);

  return (
    <main>
      <SideBar />
      UsuariosView
    </main>
  );
}

export default UsuariosView;
