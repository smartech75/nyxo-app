import { RefreshResult, AuthorizeResult } from 'react-native-app-auth'

export interface ApiState {
  fitbit?: ResponseBase
  googleFit?: ResponseBase
  garmin?: ResponseBase
  polar?: ResponseBase
  oura?: ResponseBase
  suunto?: ResponseBase
  withings?: ResponseBase

  loadingFitbit: boolean
  loadingGoogleFit: boolean
  loadingOura: boolean
  loadingGarmin: boolean
  loadingWithings: boolean
  loadingPolar: boolean
}

export interface ResponseBase {
  enabled: boolean
}

export interface GoogleFitResponse extends ResponseBase {
  accessTokenExpirationDate: string
  refreshToken: string
  accessToken: string
}

export interface SuuntoResponse extends ResponseBase {}

export interface GarminResponse extends ResponseBase {}
export interface OuraResponse extends ResponseBase {
  user_id?: string
}

export interface PolarResponse extends ResponseBase {}

export interface FitbitRefreshResult extends RefreshResult {
  refreshToken: string
  additionalParameters: {
    user_id: string
  }
}

export interface FitbitAuthorizeResult extends AuthorizeResult {
  refreshToken: string
  tokenAdditionalParameters: {
    user_id: string
  }
}

export interface OuraAuthorizeResult extends AuthorizeResult {}

export interface WithingsAuthorizeResult extends AuthorizeResult {
  tokenAdditionalParameters: {
    userid: string
  }
}

export interface GarminAuthorizeResult {
  accessToken: string
  accessTokenSecret: string
  oauthTokenSecret: string
}

export interface PolarAuthorizeResult extends AuthorizeResult {
  tokenAdditionalParameters: {
    x_user_id: string
  }
}
