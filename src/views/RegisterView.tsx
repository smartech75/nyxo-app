import Disclaimer from '@components/AuthSpecific/Disclaimer'
import BackToAppButton from '@components/Buttons/BackToAppButton'
import BottomButton from '@components/Buttons/BottomButton'
import { Container, H1, SafeAreaView } from '@components/Primitives/Primitives'
import SCTextInput from '@components/TextField'
import TopInfo from '@components/TopInfo'
import TranslatedText from '@components/TranslatedText'
import { RegisterSchema } from '@config/Validation'
import { WIDTH } from '@helpers/Dimensions'
import { getLoading } from '@selectors/auth-selectors/auth-selectors'
import colors from '@styles/colors'
import { fonts, StyleProps } from '@styles/themes'
import { Formik } from 'formik'
import React, { FC } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

type Props = {
  register: (email: string, password: string) => Promise<void>
  back: () => void
  goToLogin: () => void
}

export const RegisterView: FC<Props> = ({ register, back, goToLogin }) => {
  const loading = useSelector(getLoading)

  const signUp = async (email: string, password: string) => {
    await register(email, password)
  }

  const navigateToSignIn = () => {
    goToLogin()
  }

  return (
    <SafeAreaView>
      <Circle />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          signUp(values.email, values.password)
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          touched,
          errors,
          isValid
        }) => (
          <>
            <Container>
              <TopInfo />
              <ScrollView>
                <TitleRow>
                  <H1>TITLE_REGISTER</H1>
                </TitleRow>
                <SCTextInput
                  fieldName="INPUT_EMAIL"
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  value={values.email}
                  key="email"
                  autoCorrect={false}
                  placeholder="INPUT_EMAIL"
                  icon="emailUnread"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  enablesReturnKeyAutomatically
                />

                <SCTextInput
                  fieldName="INPUT_PASSWORD"
                  textContentType="newPassword"
                  key="password"
                  value={values.password}
                  autoCompleteType="password"
                  placeholder="INPUT_PASSWORD"
                  secureTextEntry
                  error={touched.password && errors.password}
                  icon="lockCircle"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  enablesReturnKeyAutomatically
                />
                <PasswordRequirement>PASSWORD_REQUIREMENT</PasswordRequirement>

                <Disclaimer />
                <LoginButton onPress={navigateToSignIn}>
                  MOVE_TO_SIGNIN
                </LoginButton>

                {loading && <ActivityIndicator />}
              </ScrollView>
            </Container>

            <BottomButton
              loading={loading}
              disabled={!isValid}
              onPress={handleSubmit}
              title="BUTTON_REGISTER"
            />
          </>
        )}
      </Formik>
      <BackToAppButton back={back} />
    </SafeAreaView>
  )
}

const PasswordRequirement = styled(TranslatedText)<StyleProps>`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.medium};
  font-size: 13px;
`

const Circle = styled.View`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
  background-color: ${colors.darkBlueTransparent};
  border-radius: ${WIDTH}px;
  position: absolute;
  left: ${WIDTH / -2}px;
  top: ${WIDTH / -2}px;
`

const TitleRow = styled.View`
  margin: 30px 0px;
`

const LoginButton = styled(TranslatedText)`
  font-family: ${fonts.medium};
  text-align: center;
  font-size: 15px;
  color: ${colors.darkBlue};
`
