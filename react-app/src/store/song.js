import { loadOneAlbumThunk } from "./album"
import { getSinglePlaylistThunk } from "./playlist"

const LOAD_SONGS = 'songs/LOAD_SONGS'
const SINGLE_SONG = 'songs/SINGLE_SONG'
// const ADD_SONG = 'song/ADD_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'


export const loadSongs = (songs) => {
    return {
        type:LOAD_SONGS,
        songs
    }
}

export const singleSong = (songId, song) => {
    return {
        type: SINGLE_SONG,
        songId,
        song
    }
}

export const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}


// export const addSong = () => {
//     return {
//         type:ADD_SONG,
//         songs
//     }
// }

export const loadSongsThunk = () => async(dispatch) => {
    console.log('inside songs thunk')
    const res = await fetch('/api/songs')
    if(res.ok){
        const data = await res.json()
        dispatch(loadSongs(data))
    } else {
        return false
    }
}

export const singleSongThunk = (songId) => async(dispatch) => {
    const res = await fetch(`/api/songs/${songId}`)
    if (res.ok){
        const data = await res.json()
        dispatch(singleSong(songId, data))
    } else {
        console.log("singleSongThunk Failed", songId)
        return false
    }
}

export const addSongThunk = (song) => async(dispatch) => {
    console.log("song from thunk 👉", song)

    const res = await fetch("/api/songs/new", {
        method : "POST",
        body : song
    })
    if(res.ok){
        const data = await res.json()
        console.log("data 👉", data)
        dispatch(loadOneAlbumThunk(data["album_id"]))
        return data
    }
    else{
        const data = await res.json()
        console.log(data)
        return data
    }
}

export const updateSongThunk = (song, songId) => async(dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(song)
    })
    if (res.ok) {
        // const data = res.json()
        return song
    }
}

export const deleteSongThunk = (songId, categoryId) => async (dispatch) => {
    console.log('inside delete song thunk',songId, categoryId)
    const res = await fetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        console.log('delete song thunk work?', categoryId)
        await dispatch(loadOneAlbumThunk(categoryId))
    } else {
        return false
    }
}

export const deletePlaylistSongThunk = (songId, categoryId) => async (dispatch) => {
    console.log('inside delete playlist song thunk',songId, categoryId)
    const res = await fetch(`/api/songs/${songId}/playlist`, {
        method: 'DELETE'
    })
    if (res.ok) {
        console.log('delete playlist song thunk work?', categoryId)
        await dispatch(getSinglePlaylistThunk(categoryId))
    } else {
        return false
    }
}


const initialState = {}

const songsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD_SONGS:
            newState = {}
            action.songs.Songs.forEach((song)=> {
                newState[song.id] = song;
            })
            return newState
        case SINGLE_SONG:
            newState = {}
            newState[action.songId] = action.song
            return newState

        case DELETE_SONG:
            newState = { ...state };
            delete newState[action.songId];
            return newState;
        default:
            return state
    }
}

export default songsReducer
