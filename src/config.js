export default {
  API_ENDPOINT:     process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_ENDPOINT
  : 'http://localhost:8080/api', //WHEN YOU EDIT THIS MAKE SURE YOU UPDATE THE URL LOCATIONS FOR THE CALLS //pbtag
  // API_TOKEN: process.env.REACT_APP_API_TOKEN
}
