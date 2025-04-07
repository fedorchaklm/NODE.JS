import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPizza} from "../../interfaces/IPizza";
import {pizzaService} from "../../services/pizza.service";

type pizzaSlice = {
    pizzas: Array<IPizza>,
    trigger: boolean | null
}
const pizzaSliceInitialState: pizzaSlice = {
    pizzas: [],
    trigger: null
}

const getAll = createAsyncThunk<Array<IPizza>, void>("pizzaSlice/getAll", async (_, thunkAPI) => {
    try {
        const {data} = await pizzaService.getAll();
        return thunkAPI.fulfillWithValue(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

const create = createAsyncThunk<IPizza, { pizza: Omit<IPizza, "_id"> }>(
    'pizzaSlice/create',
    async ({pizza}, thunkAPI) => {
        try {
            const {data} = await pizzaService.create(pizza);
            return thunkAPI.fulfillWithValue(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState: pizzaSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.pizzas = action.payload;
            })
            .addCase(create.fulfilled, (state, _) => {
                state.trigger = !state.trigger;
            })

})

export const pizzaSliceActions = {...pizzaSlice.actions, getAll, create}