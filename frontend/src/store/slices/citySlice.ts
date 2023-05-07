import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ICity {
    id: string
    name: string
}

export interface CityState {
    selectCity: null | ICity
}

const initialState: CityState = {
    selectCity: null,
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setSelectedCity: (state, action: PayloadAction<ICity>) => {
            state.selectCity = action.payload
        }
    },
})

export const {setSelectedCity} = citySlice.actions

export default citySlice.reducer