export const LOAD_GLOBAL = 'LOAD_GLOBAL';
export const LOAD_GLOBALS = 'LOAD_GLOBALS';

export const reducer = (state, action) => {
    switch (action.type) {
        case LOAD_GLOBAL:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case LOAD_GLOBALS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};