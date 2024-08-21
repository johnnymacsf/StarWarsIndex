import React, { useEffect, useState } from 'react';

const Vehicles = () => {
    const [vehicleData, setVehicleData] = useState({
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
        vehicle_class: '',
        pilots: [],
        films: []
    });
    const [count, setCount] = useState(4); // Starting with vehicle ID 4 for example
    const [validIds, setValidIds] = useState([]);

    useEffect(() => {
        // Fetch all vehicles to get valid IDs
        const fetchValidIds = async () => {
            let validIds = [];
            let nextUrl = 'https://swapi.dev/api/vehicles/';
            while (nextUrl) {
                const res = await fetch(nextUrl);
                const data = await res.json();
                validIds = [...validIds, ...data.results.map(vehicle => vehicle.url.split('/').filter(Boolean).pop())];
                nextUrl = data.next;
            }
            setValidIds(validIds);
        };
        fetchValidIds();
    }, []);

    useEffect(() => {
        if (validIds.length === 0) return;
        fetch(`https://swapi.dev/api/vehicles/${validIds[count]}/`)
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
                        setVehicleData({
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

    const getRandomVehicle = () => {
        const randomIndex = Math.floor(Math.random() * validIds.length);
        setCount(randomIndex);
    };

    return (
        <div className='container'>
            <div className='button-container'>
                <button onClick={handlePrevious}>Get Previous Vehicle</button>
                <button onClick={handleNext}>Get Next Vehicle</button>
                <button onClick={getRandomVehicle}>Get Random Vehicle</button>
            </div>
            <h3>{vehicleData.name}</h3>
            <div className='information'>
                <h4 className='model'>Model: {vehicleData.model}</h4>
                <h4 className='manufacturer'>Manufacturer: {vehicleData.manufacturer}</h4>
                <h4 className='cost_in_credits'>Cost in Credits: {vehicleData.cost_in_credits}</h4>
                <h4 className='length'>Length: {vehicleData.length} m</h4>
                <h4 className='max_atmosphering_speed'>Max Atmosphering Speed: {vehicleData.max_atmosphering_speed} km/h</h4>
                <h4 className='crew'>Crew: {vehicleData.crew}</h4>
                <h4 className='passengers'>Passengers: {vehicleData.passengers}</h4>
                <h4 className='cargo_capacity'>Cargo Capacity: {vehicleData.cargo_capacity} kg</h4>
                <h4 className='consumables'>Consumables: {vehicleData.consumables}</h4>
                <h4 className='vehicle_class'>Vehicle Class: {vehicleData.vehicle_class}</h4>
                <div className='pilots-section'>
                    <h4 className='pilots-title'>Pilots:</h4>
                    <ul className='pilots-list'>
                        {vehicleData.pilots && vehicleData.pilots.map((pilot, index) => (
                            <li key={index}>{pilot}</li>
                        ))}
                    </ul>
                </div>
                <div className="films-section">
                    <h4 className="films-title">Films:</h4>
                    <ul className="films-list">
                        {vehicleData.films && vehicleData.films.map((film, index) => (
                            <li key={index}>{film}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Vehicles;
