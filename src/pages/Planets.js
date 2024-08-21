import React from 'react';

const Planets = () => {
  const [planetData, setPlanetData] = React.useState({
      name: '',
      rotation_period: '',
      orbital_period: '',
      diameter: '',
      climate: '',
      gravity: '',
      terrain: '',
      population: '',
      residents: [],
      films: []
  });
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
      if(count >= 1 && count <= 60){
      fetch(`https://swapi.dev/api/planets/${count}/`)
          .then(res => res.json())
          .then(data => {
              // Fetch resident data
              const residentsFetch = Promise.all(data.residents.map(residentUrl =>
                  fetch(residentUrl).then(res => res.json()).then(residentData => residentData.name)
              ));

              // Fetch film data
              const filmsFetch = Promise.all(data.films.map(filmUrl =>
                  fetch(filmUrl).then(res => res.json()).then(filmData => filmData.title)
              ));

              // Update state with all fetched data
              Promise.all([residentsFetch, filmsFetch])
                  .then(([residentNames, filmTitles]) => {
                      setPlanetData({
                          ...data,
                          residents: residentNames,
                          films: filmTitles
                      });
                  });
          });
      }else{
        alert("Planet count out of range, please try getting a different planet with a different button.");
      }
  }, [count]);
  function getRandomPlanet() {
    const randomId = Math.floor(Math.random() * 60) + 1; // Generates a random number between 1 and 60
    setCount(randomId);
}

return (
    <div className="container">
        <div className="button-container">
            <button onClick={() => setCount(prevCount => prevCount - 1)}>Get Previous Planet</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Get Next Planet</button>
            <button onClick={getRandomPlanet}>Get Random Planet</button>
        </div>
        <h3>{planetData.name}</h3>
        <div className="information">
            <h4 className="rotation_period">Rotation Period: {planetData.rotation_period} standard hours</h4>
            <h4 className="orbital_period">Orbital Period: {planetData.orbital_period} standard days</h4>
            <h4 className="diameter">Diameter: {planetData.diameter} km</h4>
            <h4 className="climate">Climate: {planetData.climate}</h4>
            <h4 className="gravity">Gravity: {planetData.gravity}</h4>
            <h4 className="terrain">Terrain: {planetData.terrain}</h4>
            <h4 className="population">Population: {planetData.population}</h4>
            <div className="residents-section">
                <h4 className="residents-title">Residents:</h4>
                <ul className="residents-list">
                    {planetData.residents && planetData.residents.map((resident, index) => (
                        <li key={index}>{resident}</li>
                    ))}
                </ul>
            </div>
            <div className="films-section">
                <h4 className="films-title">Films:</h4>
                <ul className="films-list">
                    {planetData.films && planetData.films.map((film, index) => (
                        <li key={index}>{film}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);
};

export default Planets;
