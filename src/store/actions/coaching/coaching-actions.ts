import API, { graphqlOperation } from '@aws-amplify/api'
import {
  ListCoachingDatasQuery,
  ModelCoachingDataFilterInput,
  UpdateCoachingDataInput
} from '@API'
import { Auth } from 'aws-amplify'
import { createCoachingData, updateCoachingData } from '@graphql/mutations'
import { listCoachingDatas } from '@graphql/queries'
import moment from 'moment'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import {
  getActiveWeekWithContent,
  getCoachingMonth,
  getCurrentWeekAll,
  WEEK_STAGE
} from '@selectors/coaching-selectors'
import { GetState } from '@typings/GetState'
import { CoachingMonth, STAGE, StateWeek } from '@typings/state/coaching-state'
import { v4 } from 'uuid'
import ReduxAction from '@typings/redux-actions'

/* ACTION TYPES */

export const RESET_COACHING = 'RESET_COACHING'

export const SELECT_WEEK = 'SELECT_WEEK'
export const SELECT_LESSON = 'SELECT_LESSON'

export const START_COACHING = 'START_COACHING'
export const END_COACHING = 'END_COACHING'
export const RESUME_COACHING = 'RESUME_COACHING'

export const START_WEEK = 'START_WEEK'
export const START_LESSON = 'START_LESSON'

export const COMPLETE_LESSON = 'COMPLETE_LESSON'
export const COMPLETE_WEEK = 'COMPLETE_WEEK'
export const COMPLETE_COACHING = 'COMPLETE_COACHING'

export const PREPARE_WEEK_FOR_COMPLETION = 'PREPARE_WEEK_FOR_COMPLETION'

export const SET_ACTIVE_WEEK = 'SET_ACTIVE_WEEK'
export const SET_ACTIVE_MONTH = 'SET_ACTIVE_MONTH'

export const SET_STAGE = 'SET_STAGE'

export const PULL_COACHING_START = 'PULL_COACHING_START'
export const PULL_COACHING_SUCCESS = 'PULL_COACHING_SUCCESS'
export const PULL_COACHING_FAILURE = 'PULL_COACHING_FAILURE'

export const CREATE_COACHING_START = 'CREATE_COACHING_START'
export const CREATE_COACHING_SUCCESS = 'CREATE_COACHING_SUCCESS'
export const CREATE_COACHING_FAILURE = 'CREATE_COACHING_FAILURE'

export const UPDATE_COACHING_START = 'UPDATE_COACHING_START'
export const UPDATE_COACHING_SUCCESS = 'UPDATE_COACHING_SUCCESS'
export const UPDATE_COACHING_FAILURE = 'UPDATE_COACHING_FAILURE'

/* ACTIONS */

export const resetCoaching = (): ReduxAction => ({
  type: RESET_COACHING
})

export const selectWeek = (slug: string): ReduxAction => ({
  payload: slug,
  type: SELECT_WEEK
})

export const selectLesson = (slug: string): ReduxAction => ({
  payload: slug,
  type: SELECT_LESSON
})

export const completeLesson = (slug: string): ReduxAction => ({
  type: COMPLETE_LESSON,
  payload: slug
})

export const completeWeek = (
  completedWeekSlug: string,
  nextWeekSlug?: string
): ReduxAction => ({
  type: COMPLETE_WEEK,
  payload: { completedWeekSlug, nextWeekSlug }
})

/* ASYNC ACTIONS */

export const updateCoaching = (coachingMonths: CoachingMonth[]) => async (
  dispatch: Function,
  getState: GetState
) => {
  const { username } = await Auth.currentUserInfo()
  const updatePromises: Promise<any>[] = []
  try {
    coachingMonths.forEach((month) => {
      const input: UpdateCoachingDataInput = {
        id: month.id,
        userId: username,
        lessons: month.lessons,
        weeks: month.weeks.map((week) => ({
          slug: week.slug,
          started: week.started,
          ended: week.ended
        })),
        started: month.started
      }

      updatePromises.push(
        API.graphql(graphqlOperation(updateCoachingData, { input })) as any
      )
    })
    await Promise.all(updatePromises)
  } catch (error) {
    console.warn(error)
  }
}
