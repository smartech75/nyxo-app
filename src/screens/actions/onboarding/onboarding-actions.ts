export const INTERCOM_NEED_HELP_READ = 'INTERCOM_NEED_HELP_READ'
export const DATA_ONBOARDING_COMPLETED = 'DATA_ONBOARDING_COMPLETED'

export const markIntercomHelpAsRead = () => ({
  type: INTERCOM_NEED_HELP_READ
})

export const markDataOnboardingCompleted = () => ({
  type: DATA_ONBOARDING_COMPLETED
})
