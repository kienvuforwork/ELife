import { MusicModel } from "../../Model/Music"



const url = 'https://genius-song-lyrics1.p.rapidapi.com/chart/songs/?per_page=10&page=1';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '5978f7904amsh9a4bc67da5e17c5p124e7djsn178b75d1f47f',
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
  }
};

  
 


const getSongs = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
      
        return result.chart_items;
    } catch (error) {
        console.error(error);
    }
  }

 

  export default getSongs;