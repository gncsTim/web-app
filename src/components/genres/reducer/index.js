import { SET_GENRES, ADD_GENRE } from 'rdx/constants/actionTypes'

const mapGenresState = item => {
  item.label = item.text
  item.id = item._id
  return item
}

export const genresReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GENRES:
      return action.payload.map(mapGenresState)
    case ADD_GENRE: {
      state = JSON.parse(JSON.stringify(state))
      action.payload.forEach(item => {
        let index = state.findIndex(obj => obj._id === item._id)
        if (index === -1) return state.push(item)
        state.splice(index, 1, item)
      })
      return state.map(mapGenresState)
    }
    default:
      return state
  }
}
