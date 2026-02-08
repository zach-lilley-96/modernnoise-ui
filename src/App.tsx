import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import SearchArtistForm from './components/SearchArtistForm'
import LoginButton from './components/Login'
import ArtistAlbums from './components/ArtistAlbums'
import SavedArtists from './components/SavedArtists'
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Navbar from "./components/Navbar";
import SavedFriends from "./components/SavedFriends";
import Home from "./components/Home";
import SavedRatings from "./components/SavedRatings.tsx";
import FriendSavedArtists from "./components/FriendSavedArtists.tsx";

function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={
                        <LoginButton/>
                }/>
                <Route path="/" element={
                    <Home/>
                }/>
                <Route path="/search" element={
                    <ProtectedRoute>
                    <SearchArtistForm/>
                    </ProtectedRoute>
                }/>
                <Route path='/artist/:id' element={
                    <ProtectedRoute>
                    <ArtistAlbums/>
                    </ProtectedRoute>
                }/>
                <Route path='/saves' element={
                    <ProtectedRoute>
                        <SavedArtists/>
                    </ProtectedRoute>
                }/>

                <Route path='/my-ratings/:id' element={
                    <ProtectedRoute>
                        <SavedRatings/>
                    </ProtectedRoute>
                }/>

                <Route path='/friend-ratings/:id' element={
                    <ProtectedRoute>
                        <SavedRatings/>
                    </ProtectedRoute>
                }/>

                <Route path='/friends/:friendCode/artists/:id' element={
                    <ProtectedRoute>
                        <SavedRatings/>
                    </ProtectedRoute>
                }/>

                <Route path='/friends/:friendCode/artists' element={
                    <ProtectedRoute>
                        <FriendSavedArtists/>
                    </ProtectedRoute>
                }/>

                <Route path='/friends/:friendCode/artists/:id' element={
                    <ProtectedRoute>
                        <SavedRatings/>
                    </ProtectedRoute>
                }/>


                <Route path="/saved-friends" element={
                    <ProtectedRoute>
                        <SavedFriends />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App
