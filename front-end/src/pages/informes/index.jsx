import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../assets/components/SideBar';
import { getToken } from '../../helpers/auth';

// TODO: completar
function InformesView() {
  let navigate = useNavigate();

  useEffect(() => {
    const TOKEN = getToken();
    if (!TOKEN) navigate('/');
  }, []);

  return (
    <div>
      <SideBar />
      <h2>InformesView</h2>
    </div>
  );
}

export default InformesView;
