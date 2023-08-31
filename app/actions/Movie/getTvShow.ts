
import {  TvShowModel } from "../../Model/Movie";
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWU0ZWI1ODcxZDE3MTM3NjBkNTk3ZTRjYzVlNGNlOSIsInN1YiI6IjYxMjllYTVjMmM2YjdiMDA4OWJkNzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqvVxw-iSLuWXo99ENYDofcx4-Np5sfpRhHRUOtGPww'
  }
};



export const  getPopularTvShow = async () => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const data = await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  const tvShows : TvShowModel[] = data.results;
  return tvShows;
}

export const getTvShowGenre =async () => {
  const url = "https://api.themoviedb.org/3/genre/tv/list";
  const data = await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  return data;
}