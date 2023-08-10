
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWU0ZWI1ODcxZDE3MTM3NjBkNTk3ZTRjYzVlNGNlOSIsInN1YiI6IjYxMjllYTVjMmM2YjdiMDA4OWJkNzI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqvVxw-iSLuWXo99ENYDofcx4-Np5sfpRhHRUOtGPww'
  }
};

export interface Movies {
  id : number,
  name:string,
  poster_path: string,
  vote_average: number,

}

const  getMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const data = await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  const movies : Movies[] = data.results;
  return movies;

}

export default getMovies;