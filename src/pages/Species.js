import React from 'react';

const Species = () => {
    const[speciesData, setSpeciesData] = React.useState({
        name: '',
        designation: '',
        average_height: '',
        skin_colors: '',
        hair_colors: '',
        average_lifespan: '',
        homeworld: '',
        language: '',
        people: [],
        films: [],
    });
    const [count, setCount] = React.useState(1);

    React.useEffect(() => {
        if(count >= 1 && count <= 37){
        fetch(`https://swapi.dev/api/species/${count}/`)
            .then(res => res.json())
            .then(data => {
                const homeworldFetch = data.homeworld
                    ? fetch(data.homeworld).then(res => res.json()).then(homeworldData => homeworldData.name)
                    : Promise.resolve("Unknown");
                const peopleFetch = Promise.all(data.people.map(peopleUrl =>
                    fetch(peopleUrl).then(res => res.json()).then(peopleData => peopleData.name)
                ));
                const filmsFetch = Promise.all(data.films.map(filmUrl =>
                    fetch(filmUrl).then(res => res.json()).then(filmData => filmData.title)
                ));

                Promise.all([homeworldFetch, peopleFetch, filmsFetch])
                    .then(([homeworldName, peopleNames, filmTitles]) => {
                        setSpeciesData({
                            ...data,
                            homeworld: homeworldName,
                            people: peopleNames,
                            films: filmTitles
                        });
                    });
            });
        }else{
            alert("Species count out of range, please get a different species by using a different button.");
        }
    }, [count]);

    function getRandomSpecies(){
        const randomId = Math.floor(Math.random() * 37) +1;
        setCount(randomId);
    }

    return (
        <div className = 'container'>
            <div className = 'button-container'>
                <button onClick={()=> setCount(prevCount => prevCount-1)}>Get Previous Species</button>
                <button onClick={()=> setCount(prevCount => prevCount+1)}>Get Next Species</button>
                <button onClick={getRandomSpecies}>Get Random Species</button>
            </div>
            <h3>{speciesData.name}</h3>
            <div className = 'information'>
                <h4 className='designation'>Designation: {speciesData.designation}</h4>
                <h4 className='average-height'>Average Height: {speciesData.average_height} m</h4>
                <h4 className='skin-colors'>Skin Colors: {speciesData.skin_colors}</h4>
                <h4 className='hair-color'>Hair Color: {speciesData.hair_colors}</h4>
                <h4 className='average-lifespan'>Average Lifespan: {speciesData.average_lifespan} years</h4>
                <h4 className='homeworld'>Homeworld: {speciesData.homeworld}</h4>
                <h4 className='language'>Language: {speciesData.language}</h4>
                <div className = 'people-section'>
                    <h4 className='people-title'>People:</h4>
                    <ul classname='people-list'>
                        {speciesData.people && speciesData.people.map((people, index) => (
                            <li key={index}>{people}</li>
                        ))}
                    </ul>
                </div>
                <div className="films-section">
                    <h4 className="films-title">Films:</h4>
                    <ul className="films-list">
                        {speciesData.films && speciesData.films.map((film, index) => (
                            <li key={index}>{film}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Species;