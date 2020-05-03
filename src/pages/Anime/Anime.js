import React, { setState } from 'react';
import { SectionTitle, Paragraph } from '../../styles';
import {AnimeItem,AnimeName,AnimeDescription} from  './styles';
import Layout from '../../components/Layout';
import { Progress, Segment } from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component';

{/* {
    Object.keys(this.state.edges).map((key,i)=>(
      <p key={i}>
      <span>Key Name: {key}</span>
           <span>Value: {this.state.edges[key]}</span>
      </p>
    ))
    } */}
var query=
`{
  User(id: 478182) {
    favourites {
      anime {
        edges {
          node {
            title {
              romaji
              english
              native
              userPreferred
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            description
            season
            genres
            meanScore
          }
        }
      }
    }
    statistics {
      anime {
        episodesWatched
        count
        genres {
          genre
          count
          minutesWatched
        }
      }
    }
  }
}`
var url = 'https://graphql.anilist.co',
options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
    })
};




class Anime extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading:true,
      favourites:{},
      statistics:{},
      total_count:0,
      edges:[],

    }
    this.handleData=this.handleData.bind(this);
    this.handleFetch=this.handleFetch.bind(this);
    this.handleError=this.handleError.bind(this);
    this.handleResponse=this.handleResponse.bind(this);
  }

componentWillMount(){
  this.handleFetch();
}
handleFetch(){
  fetch(url, options).then(this.handleResponse)
  .then(this.handleData)
  .catch(this.handleError);



}
 handleResponse(response) {
  return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
  });
  }

handleError(error) {
  alert('Error, check console');
  console.error(error);
  }

  handleData(data) {
    var animeData=data.data.User;
    this.setState({favourites:animeData.favourites.anime})
    this.setState({statistics:animeData.statistics.anime})
    this.setState({total_count:animeData.statistics.anime.count})
    this.setState({edges:animeData.favourites.anime.edges})
    console.log(this.state.edges)
    console.log(typeof this.state.edges[0].node.coverImage.large)
    console.log(this.state.statistics.count)
    console.log(this.state.statistics);
   
 
 }

  render() {
    const {user} = this.props;
    const animeData=this.state.edges
    const animeFavs=animeData.map((d)=> <ul><AnimeItem><li key={d}>
     
        <div>
        <AnimeName>{d.node.title.english}</AnimeName>
       <AnimeName>{d.node.title.native}</AnimeName>
       
       
       <div className="Stars" margin-left="10px">
         
         
         <StarRatingComponent 
    name={"String"} /* name of the radio input, it is required */
    value={Math.round(d.node.meanScore/10)} /* number of selected icon (`0` - none, `1` - first) */
    starCount={10} /* number of icons in rating, default `5` */
    starColor={"#ffb400"} /* color of selected icons, default `#ffb400` */
    emptyStarColor={"#FFFFFF"} /* color of non-selected icons, default `#333` */
    editing={false} /* is component available for editing, default `true` */
/>
</div>
</div>
     
       <img src={d.node.coverImage.large} alt="Anime Cover Images"></img>
       <AnimeDescription>{d.node.description}</AnimeDescription>
        </li>
        </AnimeItem></ul>);

        
    // Define the config we'll need for our Api request
    return(
      
          <Layout user={user}>
        <div>
            <SectionTitle>My favourites</SectionTitle>   
    <h1>Total Anime watched:{this.state.statistics.count}</h1>
   <div>
     
     {animeFavs}
     
    </div>
    
    <h2>  </h2>
        </div>
        
        </Layout>
    );
  }
}

export default Anime;