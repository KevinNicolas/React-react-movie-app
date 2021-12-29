async function getMovies (endpoint = '/') {
  const response: Promise<Response> = fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: process.env.REACT_APP_TOKEN || '',
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  )

  return response.then(data => data.json()).catch((err) => { console.error(err); throw err })
}

const httpClient = {
  getMovies
}

export default httpClient