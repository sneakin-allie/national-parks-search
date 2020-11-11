'use strict';

const API_KEY = "l0ks33aeHEv3ZVJNRy9mlv1zlv6pBWjRAsIaqdDN";

function displayParks( responseJSON ){
  
  // Loop through the list of parks
  let results = '<ul>';
  for ( let i = 0; i < responseJSON.data.length; i++ ) {
    results += `<li>${responseJSON.data[i].fullName} - ${responseJSON.data[i].description} - ${responseJSON.data[i].url}</li>`;
    
  // Target the results <div> and add the parks information (full name, description, website URL)
  }
  results += '</ul>';
  $( '.results' ).html(results);
}

function fetchNationalParks( states, maxResults ){
  //const url = `https://developer.nps.gov/api/v1/parks?api_key=${API_KEY}&stateCode=${states}&limit=${maxResults}`;
  const url = 'https://developer.nps.gov/api/v1/parks?api_key=' + API_KEY + '&stateCode=' + states + "&limit=" + maxResults ;

  fetch( url )
    .then( response => {
      if( response.ok ){
        return response.json();
      }

      throw new Error( "Something went wrong!" );
    })
    .then( responseJSON => {
      console.log( responseJSON );
      displayParks( responseJSON );
      // Display results in displayParks function
      
    })
    .catch( error => {
      console.log( error.message );
    });
}

function watchForm(){
  $( '.national-parks-form' ).on( 'submit', function( event ){
    event.preventDefault();
    const states = $( '#state-codes' ).val();
    const maxResults = $( '#max-results' ).val();

    fetchNationalParks( states, maxResults );
  });
}

function init(){
  watchForm();
}

$( init );