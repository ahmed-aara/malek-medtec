import { createReducer, on } from '@ngrx/store';

import { cart, total, cart_count } from './data.actions'

export const cartState = [];
export const totalState = 0;
export const cartCountState = 0;

const _cartReducer = createReducer(
    cartState,
    on(cart, (state, action) => action.data.cart),
)

const _totalReducer = createReducer(
    totalState,
    on(total, (state, action) => action.data.total),
)

const _cartCountReducer = createReducer(
    cartCountState,
    on(cart_count, (state, action) => action.data.cart_count),
)

export function cartReducer(state: any, action: any) {
    return _cartReducer(state, action)
}

export function totalReducer(state: any, action: any) {
    return _totalReducer(state, action)
}

export function cartCountReducer(state: any, action: any) {
    return _cartCountReducer(state, action)
}