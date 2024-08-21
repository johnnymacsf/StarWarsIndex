import React from 'react';

const People = () => {
    const [starWarsData, setStarWarsData] = React.useState({
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      gender: '',
      birth_year: '',
      homeworld: '',
      films: [],
      starships: [],
      vehicles: [],
    });
    const [count, setCount] = React.useState(1);

    React.useEffect(() => {
        if(count >= 1 && count <= 82){
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json())
            .then(data => {
                // Fetch homeworld data
                const homeworldFetch = data.homeworld
                    ? fetch(data.homeworld).then(res => res.json()).then(homeworldData => homeworldData.name)
                    : Promise.resolve("Unknown");

                // Fetch film data
                const filmsFetch = Promise.all(data.films.map(filmUrl =>
                    fetch(filmUrl).then(res => res.json()).then(filmData => filmData.title)
                ));

                // Fetch starship data
                const starshipsFetch = Promise.all(data.starships.map(starshipUrl =>
                    fetch(starshipUrl).then(res => res.json()).then(starshipData => starshipData.name)
                ));

                // Fetch vehicle data
                const vehiclesFetch = Promise.all(data.vehicles.map(vehicleUrl =>
                    fetch(vehicleUrl).then(res => res.json()).then(vehicleData => vehicleData.name)
                ));

                // Update state with all fetched data
                Promise.all([homeworldFetch, filmsFetch, starshipsFetch, vehiclesFetch])
                    .then(([homeworldName, filmTitles, starshipNames, vehicleNames]) => {
                        setStarWarsData({
                            ...data,
                            homeworld: homeworldName,
                            films: filmTitles,
                            starships: starshipNames,
                            vehicles: vehicleNames
                        });
                    });
            });
        }else{
            alert("Character count out of range, please try again with a different button.")
        }
    }, [count]);

    function getRandomCharacter() {
        const randomId = Math.floor(Math.random() * 83) + 1; // Generates a random number between 1 and 83
        setCount(randomId);
    }

    return (
        <div className="container">
            <div className="button-container">
                <button onClick={() => setCount(prevCount => prevCount - 1)}>Get Previous Character</button>
                <button onClick={() => setCount(prevCount => prevCount + 1)}>Get Next Character</button>
                <button onClick={getRandomCharacter}>Get Random Character</button>
            </div>
            <h3>{starWarsData.name}</h3>
            <div className="information">
                <h4 className="height">Height: {starWarsData.height} cm</h4>
                <h4 className="mass">Mass: {starWarsData.mass} kg</h4>
                <h4 className="hair-color">Hair Color: {starWarsData.hair_color}</h4>
                <h4 className="skin-color">Skin Color: {starWarsData.skin_color}</h4>
                <h4 className="gender">Gender: {starWarsData.gender}</h4>
                <h4 className="birth-year">Birth Year: {starWarsData.birth_year}</h4>
                <h4 className="homeworld">Homeworld: {starWarsData.homeworld}</h4>
                <div className="films-section">
                    <h4 className="films-title">Films:</h4>
                    <ul className="films-list">
                        {starWarsData.films && starWarsData.films.map((film, index) => (
                            <li key={index}>{film}</li>
                        ))}
                    </ul>
                </div>
                <div className="starships-section">
                    <h4 className="starships-title">Starships:</h4>
                    <ul className="starships-list">
                        {starWarsData.starships && starWarsData.starships.map((starship, index) => (
                            <li key={index}>{starship}</li>
                        ))}
                    </ul>
                </div>
                <div className="vehicles-section">
                    <h4 className="vehicles-title">Vehicles:</h4>
                    <ul className="vehicles-list">
                        {starWarsData.vehicles && starWarsData.vehicles.map((vehicle, index) => (
                            <li key={index}>{vehicle}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default People;
