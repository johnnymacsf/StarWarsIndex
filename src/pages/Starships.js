import React from 'react';

const Starships = () => {
    const [starshipData, setStarshipData] = React.useState({
        name: '',
        model: '',
        manufacturer: '',
        cost_in_credits: '',
        length: '',
        max_atmosphering_speed: '',
        crew: '',
        passengers: '',
        cargo_capacity: '',
        consumables: '',
        hyperdrive_rating: '',
        starship_class: '',
        pilots: [],
        films: []
    });
    const [count, setCount] = React.useState(2);
    const [validIds, setValidIds] = React.useState([]);

    React.useEffect(() => {
        // Fetch all starships to get valid IDs
        const fetchValidIds = async () => {
            let validIds = [];
            let nextUrl = 'https://swapi.dev/api/starships/';
            while (nextUrl) {
                const res = await fetch(nextUrl);
                const data = await res.json();
                validIds = [...validIds, ...data.results.map(starship => starship.url.split('/').filter(Boolean).pop())];
                nextUrl = data.next;
            }
            setValidIds(validIds);
        };
        fetchValidIds();
    }, []);

    React.useEffect(() => {
        if (validIds.length === 0) return;
        fetch(`https://swapi.dev/api/starships/${validIds[count]}/`)
            .then(res => res.json())
            .then(data => {
                const pilotsFetch = Array.isArray(data.pilots)
                    ? Promise.all(data.pilots.map(pilotUrl =>
                        fetch(pilotUrl).then(res => res.json()).then(pilotData => pilotData.name)
                    ))
                    : Promise.resolve([]);

                const filmsFetch = Array.isArray(data.films)
                    ? Promise.all(data.films.map(filmUrl =>
                        fetch(filmUrl).then(res => res.json()).then(filmData => filmData.title)
                    ))
                    : Promise.resolve([]);

                Promise.all([pilotsFetch, filmsFetch])
                    .then(([pilotNames, filmTitles]) => {
                        setStarshipData({
                            ...data,
                            pilots: pilotNames,
                            films: filmTitles
                        });
                    });
            });
    }, [count, validIds]);

    const handlePrevious = () => {
        setCount(prevCount => Math.max(prevCount - 1, 0));
    };

    const handleNext = () => {
        setCount(prevCount => (prevCount + 1) % validIds.length);
    };

    const getRandomStarship = () => {
        const randomIndex = Math.floor(Math.random() * validIds.length);
        setCount(randomIndex);
    };

    return (
        <div className='container'>
            <div className='button-container'>
                <button onClick={handlePrevious}>Get Previous Starship</button>
                <button onClick={handleNext}>Get Next Starship</button>
                <button onClick={getRandomStarship}>Get Random Starship</button>
            </div>
            <h3>{starshipData.name}</h3>
            <div className='information'>
                <h4 className='model'>Model: {starshipData.model}</h4>
                <h4 className='manufacturer'>Manufacturer: {starshipData.manufacturer}</h4>
                <h4 className='cost_in_credits'>Cost In Credits: {starshipData.cost_in_credits}</h4>
                <h4 className='length'>Length: {starshipData.length} m</h4>
                <h4 className='max_atmosphering_speed'>Max Atmospheric Speed: {starshipData.max_atmosphering_speed} km/h</h4>
                <h4 className='crew'>Crew: {starshipData.crew}</h4>
                <h4 className='passengers'>Passengers: {starshipData.passengers}</h4>
                <h4 className='cargo_capacity'>Cargo Capacity: {starshipData.cargo_capacity} metric tons</h4>
                <h4 className='consumables'>Consumables: {starshipData.consumables}</h4>
                <h4 className='hyperdrive_rating'>Hyperdrive Rating: {starshipData.hyperdrive_rating}</h4>
                <h4 className='MGLT'>MGLT: {starshipData.MGLT}</h4>
                <h4 className='starship_class'>Starship Class: {starshipData.starship_class}</h4>
                <div className='pilots-section'>
                    <h4 className='pilots-title'>Pilots:</h4>
                    <ul className='pilots-list'>
                        {starshipData.pilots && starshipData.pilots.map((pilot, index) => (
                            <li key={index}>{pilot}</li>
                        ))}
                    </ul>
                </div>
                <div className="films-section">
                    <h4 className="films-title">Films:</h4>
                    <ul className="films-list">
                        {starshipData.films && starshipData.films.map((film, index) => (
                            <li key={index}>{film}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
} 
export default Starships;