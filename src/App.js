import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import './App.css';

function App(){
  const[mediaLists, setMediaLists] = useState([]);

  const query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      bannerImage
      description
      title {
        romaji
      }
    }
  }
}`;
const variables = {
  search: "Naruto",
  page: 1,
  perPage: 25
};
const url = 'https://graphql.anilist.co';
const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
 useEffect(()=>{
  fetch(url, options).then((response)=>response.json())
                   .then((data)=>{
                    setMediaLists([...data.data.Page.media]);
                   })
                   .catch((e)=>{
                     console.log(e)
                   });
},[])

console.log(mediaLists);

  return(
    <div className = "cards-container">
      {
        mediaLists.map((item, index)=>(
          <div className = "card-container">
              <img src = {item.bannerImage}/>
              <p>{item.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App;
