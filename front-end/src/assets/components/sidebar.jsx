import '../styles/sidebar.css'

function Sidebar({ firstli, secondli, thirdli, fourthli, fifthli}) {

  return (
    <aside className=''>
      <h2>NoCountry</h2>
      <section>
        <ul>
          <li>{firstli}</li>
          <li>{secondli}</li>
          <li>{thirdli}</li>
          <li>{fourthli}</li>
          <li>{fifthli}</li>
        </ul>
        <ul>
          <li className="logout-button">Cerrar Sesion</li>
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;
