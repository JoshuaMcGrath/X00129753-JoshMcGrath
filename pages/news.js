// Passing from child to parent
// https://www.robinwieruch.de/react-pass-props-to-component/#react-props

//
// Imports
//

// This is the Link API
import Link from 'next/link';

// Import fetch library
import fetch from 'isomorphic-unfetch';
// mport SearchForm Component
import SearchForm from '../components/SearchForm';
import React from 'react';
import Select from 'react-select';
//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = '070538c76c0a49218bd8996937a4b6e7';
import Dropdown from 'react-dropdown'
// Initial News source
const defaultNewsSource = 'the-irish-times';

const options = [
  { value: 'top-headlines?country=ie', label: 'top-headlines' ,},
  { value: 'business', label: 'Business News',
    value: 'everything?q=technology' ,label: 'Tech news' }
];



//
// async method fetches and returns data from a url
//
async function getNews(url) {

  // try fetch and catch any errors
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return (data);
  } catch (error) {
    // return error if it occurs
    return (error);
  }
}

//
//  The News page defined as an ES6 Class
//
export default class News extends React.Component {

  // Constructor
  // Recieve props and initialise state properties
  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: [],
      selectedOption: null
    }
    
    this.handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }


  }
  
  // This function is passed to the SearchForm and used the get the value entered
  // This value will be used to generate the api url
  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}`
    })
  }

 
  searchNewsAPI = (event) => {
    this.setState({
      newsSource: `${event.target.innerText}`,
      url: `https://newsapi.org/v2/everything?q=${event.target.innerText}&apiKey=${apiKey}`
    })
    console.log(this.state.url);
  }

  //
  // render() method generates the page
  //
  render() {

    // if state.articles is empty copy props to it
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }
    return (
      
      <div>
        
        { }
        { }
        <SearchForm setNewsSource={this.setNewsSource} />
       
        {}
    
    
      
        <ul className="newsMenu">
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=business">Business News Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=technology">Technology News</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=weather">Weather in Ireland</a></li>
        </ul>
      
   

   
   
        { /* Display a title based on source */}
        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>
          { /* Iterate through articles using Array map) */}
          { /* Display author, publishedAt, image, description, and content */}
          { /* for each story. Also a link for more.. */}
          { /* the map index property gives the position in the array for each article - see the link below */}
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author}{this.formatDate( article.publishedAt)}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p>
            </section>
          ))}
        </div>

        <style jsx>{`
              /* CSS for this page */
              section {
                max-width:1485px;  
                border: 1px solid gray;
                background-color:gray;
                padding: 1em;
                margin-top: 10px;
                margin-left: 36px;
                margin-right: 36px;;
                text-align: center;
              }

            .author {
                font-style: italic;
                font-size: 0.8em;
              }
            .img-article {
                max-width: 50%;
              }

            .newsMenu {
              display: flex;
              flex-direction: row;
              margin: 0;
              padding: 0;
              margin-top: 20px;
              margin-left: 30em;
            }
            .newsMenu li {
              display: inline-table;
              padding-left: 20px;
            }

            .newsMenu li a {
              font-size: 1em;
              color: red;
              display: block;
              text-decoration: none;
            }

            .newsMenu li a:hover {
              color: purple;
              text-decoration: underline;
            }
           
           
            
          
            .dropdown .dropbtn {
              font-size: 16px; 
              border: none;
              outline: none;
              color: white;
              padding: 14px 16px;
              background-color: inherit;
              
              margin: 0; 
            }
            
           
            .navbar a:hover, .dropdown:hover .dropbtn {
              background-color: red;
            }
            
            
            .dropdown-content {
              display: none;
              position: absolute;
              background-color: #f9f9f9;
              min-width: 160px;
              box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
              z-index: 1;
            }
            
            
            .dropdown-content a {
              float: none;
              color: black;
              padding: 12px 16px;
              text-decoration: none;
              display: block;
              text-align: left;
            }
            
            
            .dropdown-content a:hover {
              background-color: #ddd;
            }
            
           
            .dropdown:hover .dropdown-content {
              display: block;
            }
            .newsMenu {
              display: flex;
              flex-direction: row;
              margin: 0;
              padding: 0;
              margin-top: 20px;
              margin-left: 30em;
            }
            .newsMenu li {
              display: inline-table;
              padding-left: 20px;
            }
 
            .newsMenu li a {
              font-size: 1em;
              color: red;
              display: block;
              text-decoration: none;
            }
 
            .newsMenu li a:hover {
              color: purple;
              text-decoration: underline;
            }
          `}</style>
      </div>
    );
  }
  
    
  static async getInitialProps(response) {
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data)
   
    }
  }

  async componentDidUpdate(prevProps, prevState) {

    // Check if newsSource url has changed to avoid unecessary updates 
    if (this.state.url !== prevState.url) {

      // Use api url (from state) to fetch data and call getNews()
      const data = await getNews(this.state.url);

      // If the result contains and articles array then it is good so update articles
      if (Array.isArray(data.articles)) {
        // Store articles in state
        this.state.articles = data.articles;
        // Force page update by changing state (make sure it happens!)
        this.setState(this.state);
      }
      // Otherwise it contains an error, log and redirect to error page (status code 400)
      else {
        console.error(data)
       
      }
    }
  } // End componentDidUpdate

  formatDate = (input) => {
    let date = new Date(input);
    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October', 'November', 'December');
    var day  = week[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes().toString().padStart(2,'0');
    let secs = date.getSeconds();
   
    let output =  `${day} ${month} ${year} ${hours}:${mins} ${secs}s`;

   
   return output.toString();
  }

} 


