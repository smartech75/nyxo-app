import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { State } from './State'

interface ReduxAction {
  type: string
  payload?: unknown
  error?: unknown
}

export default ReduxAction

export type ThunkResult<R> = ThunkAction<R, State, void, ReduxAction>

export type Thunk = ThunkResult<Promise<void | string | null>>

export type Dispatch = ThunkDispatch<unknown, unknown, Action>
