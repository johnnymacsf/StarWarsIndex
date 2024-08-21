import React from 'react';

const Films = () => {
    const [filmData, setFilmData] = React.useState({
        title: '',
        episode_id: null,
        opening_crawl: '',
        director: '',
        producer: '',
        release_date: '',
    });
    const [count, setCount] = React.useState(1);

    React.useEffect(() => {
        if(count >= 1 && count <= 6){
        fetch(`https://swapi.dev/api/films/${count}/`)
            .then(res => res.json())
            .then(data => {
                setFilmData(data);
            })
        }else{
            alert("Unable to display that episode ID information, we only have information for episode 1-6.")
            
        }
    }, [count]);

    function getRandomFilm() {
        const randomId = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
        setCount(randomId);
    }

    return (
        <div className="container">
            <div className="button-container">
                <button onClick={() => setCount(prevCount => prevCount - 1)}>Get Previous Film</button>
                <button onClick={() => setCount(prevCount => prevCount + 1)}>Get Next Film</button>
                <button onClick={getRandomFilm}>Get Random Film</button>
            </div>
            <h3>{filmData.title}</h3>
            <div className="information">
                <h4 className="episode_id">Episode ID: {filmData.episode_id}</h4>
                <p className="opening_crawl">Opening Crawl: {filmData.opening_crawl}</p>
                <h4 className="director">Director: {filmData.director}</h4>
                <h4 className="producer">Producer: {filmData.producer}</h4>
                <h4 className="release_date">Release Date: {filmData.release_date}</h4>
            </div>
        </div>
    );
}

export default Films;