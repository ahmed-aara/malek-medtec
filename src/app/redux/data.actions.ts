import { createAction, props } from '@ngrx/store'

export const cart = createAction('cart', props<{ data: { cart: any; } }>());
export const total = createAction('total', props<{ data: { total: any; } }>())
export const cart_count = createAction('cart_count', props<{ data: { cart_count: any; } }>())
