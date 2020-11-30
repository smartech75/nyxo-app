/* eslint-disable camelcase */
import { revokePreviousSource } from '@actions/sleep-source-actions/revoke-previous-source'
import { setMainSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { getGarminEnabled } from '@selectors/api-selectors/api-selectors'
import CONFIG from '@config/Config'
import { openAuthSessionAsync, WebBrowserResult } from 'expo-web-browser'
import { GetKeychainParsedValue, SetKeychainKeyValue } from '@helpers/Keychain'
import {
  formatGarminSamples,
  generateSleepApiCall
} from '@helpers/sleep/garmin-helper'
import moment from 'moment'
import queryString from 'query-string'
import { Linking, Platform } from 'react-native'
import { GetState } from '@typings/GetState'
import { AppThunk } from '@typings/redux-actions'
import { GarminSleepObject } from '@typings/Sleep/Garmin'
import { GarminAuthorizeResult, ResponseBase } from '@typings/state/api-state'
import { SOURCE } from '@typings/state/sleep-source-state'
import { captureException } from '@sentry/react-native'
import { fetchSleepSuccess } from '../sleep/health-kit-actions'
import {
  FETCH_SLEEP_GARMIN_FAILURE,
  FETCH_SLEEP_GARMIN_START,
  FETCH_SLEEP_GARMIN_SUCCESS,
  GARMIN_AUTHORIZE_SUCCESS,
  GARMIN_REVOKE_SUCCESS,
  GARMIN_UPDATE_TOKEN,
  ApiActions
} from './types'

/* ACTIONS */

const GARMIN_AUTH_API = 'https://connect.garmin.com/oauthConfirm?oauth_token='

export const garminAuthorizeSuccess = (payload: ResponseBase): ApiActions => ({
  type: GARMIN_AUTHORIZE_SUCCESS,
  payload
})

export const garminRevokeSuccess = (): ApiActions => ({
  type: GARMIN_REVOKE_SUCCESS
})

export const garminUpdateToken = (payload: ResponseBase): ApiActions => ({
  type: GARMIN_UPDATE_TOKEN,
  payload
})

export const fetchSleepGarminStart = (): ApiActions => ({
  type: FETCH_SLEEP_GARMIN_START
})

export const fetchSleepGarminSuccess = (): ApiActions => ({
  type: FETCH_SLEEP_GARMIN_SUCCESS
})

export const fetchSleepGarminFailure = (): ApiActions => ({
  type: FETCH_SLEEP_GARMIN_FAILURE
})

export const toggleGarmin = (): AppThunk => async (
  dispatch,
  getState: GetState
) => {
  try {
    const enabled = getGarminEnabled(getState())
    if (enabled) {
      await dispatch(revokeGarminAccess())
    } else {
      await dispatch(revokePreviousSource())
      if (Platform.OS === 'ios') {
        await dispatch(authorizeGarminIOS())
      } else if (Platform.OS === 'android') {
        await dispatch(getGarminOauthVerifierAndroid())
      }
    }
  } catch (error) {
    captureException(error)
  }
}

export const authorizeGarminIOS = (): AppThunk => async (dispatch) => {
  try {
    const getRequestTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.REQUEST_TOKEN_ENDPOINT
    )

    const {
      oauth_token,
      oauth_token_secret
    } = await getRequestTokenResponse.json()

    const callbackUri = 'nyxo://callback'

    const authorizationUrl = `${GARMIN_AUTH_API}${oauth_token}&oauth_callback=${callbackUri}`

    const authorizedResponse = (await openAuthSessionAsync(
      authorizationUrl,
      CONFIG.GARMIN_CONFIG.redirectUrl
    )) as OpenAuthSessionResponse

    const { url: retrievedAuthorizedUrl } = authorizedResponse

    const parsedAuthorizedQueryString = queryString.parse(
      retrievedAuthorizedUrl.substring(
        retrievedAuthorizedUrl.indexOf('?'),
        retrievedAuthorizedUrl.length
      )
    ) as ParsedAuthorizedResponse

    const getAccessTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.ACCESS_TOKEN_ENDPOINT,
      {
        method: 'POST',
        body: JSON.stringify({
          oauth_token,
          oauth_token_secret,
          oauth_verifier: parsedAuthorizedQueryString.oauth_verifier
        })
      }
    )

    const {
      oauth_token: accessToken,
      oauth_token_secret: accessTokenSecret
    } = await getAccessTokenResponse.json()

    const key = CONFIG.GARMIN_CONFIG.bundleId
    const value = JSON.stringify({
      oauthTokenSecret: oauth_token_secret,
      accessToken,
      accessTokenSecret
    })

    await SetKeychainKeyValue(key, value, CONFIG.GARMIN_CONFIG.bundleId)

    await dispatch(
      garminAuthorizeSuccess({
        enabled: true
      })
    )

    await dispatch(setMainSource(SOURCE.GARMIN))
  } catch (error) {
    captureException(error)
  }
}

export const getGarminOauthVerifierAndroid = (): AppThunk => async (
  dispatch
) => {
  try {
    const getRequestTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.REQUEST_TOKEN_ENDPOINT
    )

    const {
      oauth_token,
      oauth_token_secret
    } = await getRequestTokenResponse.json()

    const { accessToken, accessTokenSecret } = ((await GetKeychainParsedValue(
      CONFIG.GARMIN_CONFIG.bundleId
    )) as unknown) as GarminAuthorizeResult

    const key = CONFIG.GARMIN_CONFIG.bundleId
    const value = JSON.stringify({
      oauthTokenSecret: oauth_token_secret,
      accessToken,
      accessTokenSecret
    })

    await SetKeychainKeyValue(key, value, CONFIG.GARMIN_CONFIG.bundleId)

    const callbackUri = 'nyxo://garmin'

    const authorizationUrl = `${GARMIN_AUTH_API}${oauth_token}&oauth_callback=${callbackUri}`

    await Linking.openURL(authorizationUrl)
  } catch (error) {
    captureException(error)
  }
}

export const getGarminAccessTokenAndroid = (
  oauth_token: string,
  oauth_verifier: string
): AppThunk => async (dispatch) => {
  try {
    const {
      oauthTokenSecret: oauth_token_secret
    } = ((await GetKeychainParsedValue(
      CONFIG.GARMIN_CONFIG.bundleId
    )) as unknown) as GarminAuthorizeResult

    const getAccessTokenResponse = await fetch(
      CONFIG.GARMIN_CONFIG.ACCESS_TOKEN_ENDPOINT,
      {
        method: 'POST',
        body: JSON.stringify({
          oauth_token,
          oauth_token_secret,
          oauth_verifier
        })
      }
    )

    const {
      oauth_token: accessToken,
      oauth_token_secret: accessTokenSecret
    } = await getAccessTokenResponse.json()

    const key = CONFIG.GARMIN_CONFIG.bundleId
    const value = JSON.stringify({
      accessToken,
      accessTokenSecret,
      oauthTokenSecret: oauth_token_secret
    })

    await SetKeychainKeyValue(key, value, CONFIG.GARMIN_CONFIG.bundleId)

    await dispatch(
      garminAuthorizeSuccess({
        enabled: true
      })
    )

    await dispatch(setMainSource(SOURCE.GARMIN))
  } catch (error) {
    captureException(error)
  }
}

export const getGarminSleep = (
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  startDate?: string,
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  endDate?: string
): AppThunk => async (dispatch) => {
  const { accessToken, accessTokenSecret } = ((await GetKeychainParsedValue(
    CONFIG.GARMIN_CONFIG.bundleId
  )) as unknown) as GarminAuthorizeResult

  dispatch(fetchSleepGarminStart())

  if (accessToken && accessTokenSecret) {
    try {
      const garminAPICalls = await Promise.all(
        getRecent7DaysSleepApiCalls(accessToken, accessTokenSecret)
      )

      const combinedSleepData: GarminSleepObject[] = []

      garminAPICalls.forEach((res: Response | undefined) => {
        if (res) {
          const { body } = res as any // Don't know how to properly cast this
          body.forEach((sleep: GarminSleepObject) =>
            combinedSleepData.push(sleep)
          )
        }
      })

      const formattedResponse = formatGarminSamples(combinedSleepData)
      await dispatch(fetchSleepSuccess(formattedResponse))
      await dispatch(fetchSleepGarminSuccess())
    } catch (error) {
      captureException(error)
      dispatch(fetchSleepGarminFailure())
    }
  }
}

export const revokeGarminAccess = (): AppThunk => async (dispatch) => {
  dispatch(garminRevokeSuccess())
  dispatch(setMainSource(SOURCE.NO_SOURCE))
}

const getRecent7DaysSleepApiCalls = (
  accessToken: string,
  accessTokenSecret: string
) => {
  const promiseArray = []

  for (let i = 7; i >= 1; i -= 1) {
    const uploadStartTimeInSeconds = moment()
      .subtract(i, 'days')
      .set({ hour: 16, minute: 0, second: 0, millisecond: 0 }) // set the start & end time of sleep record
      .unix()

    const uploadEndTimeInSeconds = moment()
      .subtract(i - 1, 'days')
      .set({ hour: 16, minute: 0, second: 0, millisecond: 0 })
      .unix()

    promiseArray.push(
      generateSleepApiCall(
        accessToken,
        accessTokenSecret,
        uploadStartTimeInSeconds,
        uploadEndTimeInSeconds
      )
    )
  }

  return promiseArray
}

interface ParsedAuthorizedResponse extends queryString.ParsedQuery {
  oauth_token: string
  oauth_verifier: string
}

interface OpenAuthSessionResponse extends WebBrowserResult {
  url: string
}
