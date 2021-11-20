import { CHANGE_ICON } from "../actions/changeIconAction"

const initialState = {
    saveSuccess: null
}

const changeIconReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ICON: 
            return { saveSuccess: action.saveSuccess }
        default:
            return state
    }
}

export default changeIconReducer;