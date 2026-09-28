import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjlhMTc5YjNlNTk2ZmNjMTJiNGUwYzVhN2NlMjk2MyIsIm5iZiI6MTc4OTk3Mzk5MS40Nywic3ViIjoiNmFiMGQ1ZTc5NWZiNTYwNzA1ZjY2YjFhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CZ0d82-_9vt6U2m5fLEhApci7kns0Lojt9E5fZ8c3Yw`,
    accept: 'application/json',
  },
})

export default http
