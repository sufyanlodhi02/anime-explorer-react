import React, { useEffect, useState } from "react";
import './components/style.css';
import { AnimeInfo } from "./components/AnimeInfo";
import { AnimeList } from "./components/AnimeList";
import AddToList from "./components/AddToList";
import { RemoveFromList } from "./components/RemoveFromList";

function App() {

  const [search]=useState()
  const [animeData,setAnimeData]=useState();
  const [animeInfo,setAnimeInfo]=useState()
  const [myAnimeList,setMyAnimeList]=useState([])

  const addTo=(anime)=>{
    const index=myAnimeList.findIndex((myanime)=>{
        return myanime.mal_id === anime.mal_id
    })
    if(index < 0){
      const newArray=[...myAnimeList,anime]
      setMyAnimeList(newArray);
    }
    
  }
  const removeFrom=(anime)=>{
    const newArray=myAnimeList.filter((myanime)=>{
      return myanime.mal_id !== anime.mal_id
    })
    setMyAnimeList(newArray)
  }
useEffect(() => {
  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/top/anime?sfw${search}&limit=25`);
    const resData = await res.json();
    setAnimeData(resData.data);
  };

  getData();
}, [search]); // Now only runs when `search` changes


  return (
    <>
        <div className="header">
          <h1>AnimeExplorer</h1>
        </div>

        <div className="container">
          <div className="animeInfo">
           {animeInfo && <AnimeInfo animeInfo={animeInfo}/>}
          </div>
          <div className="anime-row">
            <h2 className="text-heading">Top 25 Anime</h2>
            <div className="row">
                <AnimeList 
                animelist={animeData}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime)=>addTo(anime)}
                />
            </div>
            <h2 className="text-heading">My List</h2>
            <div className="row">
                <AnimeList 
                animelist={myAnimeList}
                setAnimeInfo={setAnimeInfo}
                animeComponent={RemoveFromList}
                handleList={(anime)=>removeFrom(anime)}
                />
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
