// Import Dependencies
import React, { Component } from "react";


import Select from 'react-select';




// Array for dropdown
const options = [
  { value: 'top-headlines?country=ie', label: 'top-headlines' ,},
  { value: 'business', label: 'Business News',
    value: 'everything?q=technology' ,label: 'Tech news' }
];

//
// Define SearchForm Class
//
export default class SearchForm extends Component {
  // constructor accepts props and initialises state
  constructor(props) {
    super(props);

    this.state = {selectedOption: null};
 
    
    this.handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
}

  //
  // an event handler for form submit
  //
  formSubmitted = event => {
    // Validate input value
    if (event.target.newsSource.value != "") {
      this.props.setNewsSource(event.target.newsSource.value);
    }
    // prevent page reload (prevent submit)
    event.preventDefault();
  };

  // Render the form
  render() {
    const {selectedOption} = this.state;
    return (
      

      <div>
        {/* Search Input */}
        <div id="search">
          {/* Note event handler */}
          <form onSubmit={this.formSubmitted}>
            {/* The input field */}

            


            <input
              name="newsSource"
              placeholder="News Source name"
              type="text"
            />
            {/* Button click will trigger submit */}
            <button>Update News</button>
          </form>
        </div>
        <style jsx>{`
           input {
                
               margin-top:10px;
               margin-left:100px;
               text-align:center;
            }
            
        `}</style>
      </div>
      
    );
    
  }
}
