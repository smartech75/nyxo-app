import React, { FC } from 'react'
import Svg from 'react-native-svg'
import svgs from '../../assets/svgs'

interface SvgIconProps {
  fill?: string
  fillRule?: string
  height: number | string
  name?: string
  stroke?: string
  strokeWidth?: number | string
  style?: any
  width: number | string
  viewBox?: string
}

const SvgIcon: FC<SvgIconProps> = (props) => {
  const {
    name,
    fill,
    height,
    width,
    style,
    strokeWidth,
    fillRule,
    stroke,
    viewBox
  } = props

  if (!props || !props.name) {
    return null
  }

  const iconName = svgs[name]

  if (!iconName) {
    return null
  }

  const iconHeight = height && height.toString()
  const iconWidth = width && width.toString()
  const iconStrokeWidth = strokeWidth && strokeWidth.toString()

  const isSimple = React.isValidElement(iconName)
  const svgEl = isSimple ? iconName : iconName.svg

  let iconViewBox

  if (props.viewBox) {
    iconViewBox = viewBox
  } else if (!isSimple && iconName.viewBox) {
    iconViewBox = iconName.viewBox
  } else {
    iconViewBox = '0 0 100 100'
  }

  return (
    <Svg
      height={iconHeight}
      width={iconWidth}
      viewBox={iconViewBox}
      style={style}>
      {React.cloneElement(svgEl, {
        fill,
        fillRule,
        stroke,
        strokeWidth: iconStrokeWidth
      })}
    </Svg>
  )
}

export default SvgIcon
