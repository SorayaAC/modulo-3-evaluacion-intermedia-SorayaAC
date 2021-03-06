import '../styles/App.scss';
import { useState } from 'react';
import pubs from '../data/pubs.json';

function App() {
  const [data, setData] = useState(pubs);

  const [newName, setNewName] = useState('');
  const [newOpenWeek, setNewOpenWeek] = useState(false);
  const [newOpenWeekend, setNewOpenWeekend] = useState(false);

  const [option, setOption] = useState('all');

  // funciones para recoger lo q escribe la usuaria en add
  const handleName = (ev) => {
    setNewName(ev.target.value);
  };
  const handleOpenWeek = (ev) => {
    setNewOpenWeek(ev.target.checked);
  };
  const handleOpenWeekend = (ev) => {
    setNewOpenWeekend(ev.target.checked);
  };

  //función para options

  const handleOptions = (ev) => {
    setOption(ev.target.value);
  };

  // función manejadora del botón
  const handleClick = (ev) => {
    ev.preventDefault();

    const newClub = {
      name: newName,
      openOnWeekdays: newOpenWeek,
      openOnWeekend: newOpenWeekend,
    };
    setData([...data, newClub]);
    console.log(data);
    setNewName('');
    setNewOpenWeek('');
    setNewOpenWeekend('');
  };

  // función para pintar texto en html
  const renderPubsList = () => {
    return data
      .filter((onePub) => {
        if (option === 'onlyWeek') {
          return onePub.openOnWeekdays === true;
        } else if (option === 'onlyWeekend') {
          return onePub.openOnWeekend === true;
        }
        return true;
      })

      .map((onePub, index) => {
        return (
          <li key={index}>
            <p>
              <label>#{index} </label> {onePub.name}
            </p>
            <p>
              <label>Abierto entre semana:</label>
              {onePub.openOnWeekdays ? 'Sí' : 'No'}
            </p>
            <p>
              <label>Abierto el fin de semana:</label>
              {onePub.openOnWeekend ? 'Sí' : 'No'}
            </p>
          </li>
        );
      });
  };

  return (
    <div>
      {/* ///////header////// */}
      <header>
        <h1>Mis clubs</h1>
        <form>
          <label htmlFor="show">Mostrar</label>
          <select value={option} id="show" name="show" onChange={handleOptions}>
            <option value="all">todos</option>
            <option value="onlyWeek">los que abren entre semana</option>
            <option value="onlyWeekend">los que abren el fin de semana</option>
          </select>
        </form>
      </header>
      {/* ///////main////// */}
      <main>
        {/* ///////section render////// */}
        <section>
          <ul>{renderPubsList()}</ul>
        </section>
        {/* ///////section add////// */}
        <section>
          <h2> Añadir un nuevo club </h2>
          <form onSubmit={handleClick}>
            <p>
              <label htmlFor="clubName">Nombre del club</label>
              <input
                id="clubName"
                type="text"
                name="clubName"
                onChange={handleName}
                value={newName}
              />
            </p>
            <p>
              <label htmlFor="clubOpenWeek">¿Abre entre semana?</label>
              <input
                id="clubOpenWeek"
                type="checkbox"
                name="clubOpenWeek"
                onChange={handleOpenWeek}
                value={newOpenWeek}
                checked={newOpenWeek}
              />
            </p>
            <p>
              <label htmlFor="clubOpenWeekend">
                ¿Abre los fines de semana?
              </label>
              <input
                id="clubOpenWeekend"
                type="checkbox"
                name="clubOpenWeekend"
                onChange={handleOpenWeekend}
                value={newOpenWeekend ? 'Sí' : 'No'}
                checked={newOpenWeekend}
              />
            </p>
            <p>
              <input
                type="submit"
                value="Añadir un nuevo club"
                name="btn"
                id="btn"
              />
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
