import {
  CAMERAS_ACTION_PENDING,
  GET_CAMERAS_SUCCESS,
  ADD_CAMERA_SUCCESS,
  REMOVE_CAMERA_SUCCESS,
} from '../actions/types'

const initialState = {isLoading: false, cameras: []}

export default (state = initialState, action) => {
  switch (action.type) {
    case CAMERAS_ACTION_PENDING:
      return { ...state, isLoading: true}

    case GET_CAMERAS_SUCCESS:
      const cameras = action.payload.data.sort((a,b)=>a.id-b.id)
      return { isLoading: false, cameras}

    case ADD_CAMERA_SUCCESS:
    case REMOVE_CAMERA_SUCCESS:
      const camera = action.payload.data[0]
      const newCameraArr = [ ...state.cameras.filter(c=>c.id !== camera.id), camera ]
        .sort((a,b)=>a.id-b.id)
      return {
        isLoading: false,
        cameras: newCameraArr
      }

    default:
      return state
  }
}
