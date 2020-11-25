import { addHabit } from '@actions/habit/habit-actions'
import { toggleNewHabitModal } from '@actions/modal/modal-actions'
import { HabitSchema } from '@config/Validation'
import { Formik } from 'formik'
import React, { memo, useState } from 'react'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getNewHabitModal } from '@selectors/ModalSelectors'
import styled from 'styled-components/native'
import { Period } from '@typings/state/Periods'
import { StyleProps } from '../../../styles/themes'
import BottomButton from '../../Buttons/BottomButton'
import HabitModalFieldSection from './HabitModalFieldSection'
import HabitModalTimeSection from './HabitModalTimeSection'
import HabitModalTopInfo from './HabitModalTopInfo'
import HabitModalTopRow from './HabitModalTopRow'

export const titleMaxLength = 100
export const descriptionMaxLength = 1000

const NewHabitModal = () => {
  const [message, setMessage] = useState('')
  const show = useSelector(getNewHabitModal)
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(toggleNewHabitModal())
  }

  const saveModal = () => {
    dispatch(toggleNewHabitModal())
  }

  const resetMessage = () => {
    setMessage('')
  }

  const createHabit = (title: string, description: string, period: Period) => {
    dispatch(addHabit(title, description, period))
    closeModal()
  }

  return (
    <StyledModal hideModalContentWhileAnimating isVisible={show}>
      <Formik
        validateOnMount
        initialValues={{ title: '', description: '', period: Period.afternoon }}
        validationSchema={HabitSchema}
        onSubmit={({ title, description, period }) => {
          createHabit(title, description, period)
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values: { description, title, period },
          touched,
          errors,
          isValid
        }) => (
          <>
            <Container>
              <ScrollView>
                <HabitModalTopRow
                  isValid={isValid}
                  closeModal={closeModal}
                  saveModal={handleSubmit}
                  titleValue="HABIT.NEW_HABIT_TITLE"
                />

                <HabitModalFieldSection
                  onBlur={handleBlur('title')}
                  handleChangeText={handleChange('title')}
                  indicatorText="HABIT.TITLE_FIELD_INDICATOR"
                  placeholder="HABIT.TITLE_PLACEHOLDER"
                  inputMaxLength={titleMaxLength}
                  value={title}
                  isTitle
                />

                <HabitModalFieldSection
                  onBlur={handleBlur('description')}
                  handleChangeText={handleChange('description')}
                  indicatorText="HABIT.DESCRIPTION_FIELD_INDICATOR"
                  placeholder="HABIT.DESCRIPTION_PLACEHOLDER"
                  inputMaxLength={descriptionMaxLength}
                  value={description}
                  isTitle={false}
                />

                <HabitModalTimeSection
                  period={period}
                  setPeriod={handleChange('period')}
                />

                <BottomButton
                  title="HABIT.NEW_HABIT_BUTTON"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </ScrollView>
            </Container>

            <HabitModalTopInfo message={message} resetMessage={resetMessage} />
          </>
        )}
      </Formik>
    </StyledModal>
  )
}

export default memo(NewHabitModal)

const StyledModal = styled(Modal)`
  margin: 0px 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`

const Container = styled.SafeAreaView`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex: 1;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  justify-content: space-between;
`
