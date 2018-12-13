//
// Imports
//
import {withRouter} from 'next/router'

// Import fetch library
import fetch from "isomorphic-unfetch";

//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = "070538c76c0a49218bd8996937a4b6e7";

// Initial News source
const defaultNewsSource = "the-irish-times";

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
    return data;
  } catch (error) {
    // return error if it occurs
    return error;
  }
}

//
//  The News page defined as an ES6 Class
//
class Article extends React.Component {
  // Constructor
  // Recieve props and initialise state properties
  constructor(props) {
    super(props);
    this.state = {};
  }

  //
  // render() method generates the page
  //
  render() {


    var currentArticle = window.location.href.split("/").pop();;
    // Position in articles array to use 
    let id = currentArticle;

    // Get single article
    let article = this.props.articles[id];

    return (
      
      <div >
        <section>
        <h3>{article.title}</h3>
              <p className="author">{article.author}{this.formatDate( article.publishedAt)}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              </section>
 
        <style jsx>{`
          /* CSS for this page */
          section {
            max-width: 1485px;   
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
         
        `}</style>
      </div>
    );
  }

  //
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page
  //
  static async getInitialProps(res) {
    // Build the url which will be used to get the data
    // See https://newsapi.org/s/the-irish-times-api
    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
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
} // End class

// export withRouter - enables this class to access React Router properties, e.g. to get the URl parameters
export default withRouter(Article)
