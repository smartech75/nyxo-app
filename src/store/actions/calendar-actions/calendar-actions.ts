import ReduxAction from '@typings/redux-actions'

/* ACTION TYPES */

export const SET_SELECTED_DATE = 'CREATE_DAYS_START'

/* ACTIONS */

export const setSelectedDate = (date: string): ReduxAction => ({
  type: SET_SELECTED_DATE,
  payload: date
})
