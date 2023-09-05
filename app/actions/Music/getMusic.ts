

export const getToken = async () => {
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// Define the URL for obtaining an access token
const tokenUrl = 'https://accounts.spotify.com/api/token';
let accessToken:string | undefined
// Define the data for the request
const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');

// Create a Basic Authentication header by base64 encoding the client ID and client secret
const base64Credentials = btoa(`${clientId}:${clientSecret}`);
const headers = {
  'Authorization': `Basic ${base64Credentials}`,
  'Content-Type': 'application/x-www-form-urlencoded',
};

// Make the POST request to obtain the access token
 await fetch(tokenUrl, {
  method: 'POST',
  headers: headers,
  body: data,
})
.then(response => response.json())
.then(data =>  {
accessToken = data.access_token;

})
.catch(error => {
  console.error('Error:', error);
  return error
});
return accessToken 

}

let headers = {
  "Authorization": `Bearer`
};
let token: string | undefined;
(async () => {
   token = await getToken();
  headers = {
    "Authorization": `Bearer ${token}`
  };
})();


export const getTopTracks = async () => {
  try {
    const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", { method: "GET", headers });
    const data: any = await response.json();
    // Check if the response contains an error message indicating an expired token
    if (response.status === 401 && (data.error.message === "The access token expired" )) {
      // Get a new access token
      token = await getToken();
      // Update the headers with the new access token
      headers.Authorization =  `Bearer ${token}`;

      // Retry the fetch with the new token
      const retryResponse = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", { method: "GET", headers });
      const retryData = await retryResponse.json();

      return (data && token) ? {data:retryData,token}: {data:"", token:""}
    }
    return (data && token) ? {data,token}: {data:"", token:""};
  } catch (error) {
    console.error('Error:', error);
   
  }

};

