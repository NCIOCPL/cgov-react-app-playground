import { LOAD_GLOBAL, LOAD_GLOBALS, reducer } from '../reducer';

describe('global reducer', () => {
    const initialState = {
        appId: "mockAppId",
        analyticsHandler: data => {},
        dictionaryEndpoint: "",
        dictionaryTitle: "NCI Dictionary of Cancer Terms",
        dictionaryIntroText: "",
        language: "en", // en|es (English|Spanish)
        rootId: "NCI-app-root"
    };

    it('should return the initial state', () => {

       expect(reducer(initialState, {})).toEqual(initialState);
    });

    it(`it should handle ${LOAD_GLOBAL}`, () => {
        const action = {
            payload: {
                field: 'test_field',
                value: 'dumb test'
            },
            type: LOAD_GLOBAL
        };
        const expectedState = {
            ...initialState,
            test_field: 'dumb test'
        };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it(`it should handle ${LOAD_GLOBALS}`, () => {
        const action = {
            payload: {
                field: 'test_field',
                value: 'dumb test'
            },
            type: LOAD_GLOBALS
        };
        const expectedState = {
            ...initialState,
            ...action.payload
        };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});