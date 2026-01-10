import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import SearchArtistForm from './components/SearchArtistForm'
import LoginButton from './components/Login'
import ArtistAlbums from './components/ArtistAlbums'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<LoginButton />} />
        <Route path="/" element={<SearchArtistForm />} />
        <Route path='/artist/:id' element={<ArtistAlbums />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
