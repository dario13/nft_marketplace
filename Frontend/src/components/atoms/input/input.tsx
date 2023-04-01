import { FlexBox, Text } from '@/components/atoms'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { InputProps } from './input.props'
import { MaskedInput } from './masked-input'

const inputColor = {
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  success: 'input-success',
  info: 'input-info',
  warning: 'input-warning',
  error: 'input-error',
  ghost: 'input-ghost',
}

const inputPredefinedSize = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
}

const preffixAndSuffixSize = {
  xs: 'input-group-xs',
  sm: 'input-group-sm',
  md: 'input-group-md',
  lg: 'input-group-lg',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (inputProps: InputProps, ref): JSX.Element => {
    const {
      value,
      label,
      prefix,
      suffix,
      placeholder,
      bordered = true,
      color,
      dataTheme,
      className,
      type,
      mask = { options: { mask: '' } },
      onChange,
      inputSize = 'md',
      defaultValue,
      ...props
    } = inputProps

    const inpColor = color ? inputColor[color] : ''

    const conditionalInputClasses = clsx({
      [inpColor]: color,
      [inputPredefinedSize[inputSize]]: inputSize,
      'input-bordered': bordered,
      'focus:outline-offset-0': true,
    })

    const conditionalPrexifAndSuffixClass = clsx({
      [preffixAndSuffixSize[inputSize]]: inputSize,
    })

    const inputClasses = twMerge('input input-group', conditionalInputClasses, className)
    const preffixAndSuffixClasses = twMerge('input-group', conditionalPrexifAndSuffixClass)

    const InputComponent = mask.options.mask ? MaskedInput : 'input'

    return (
      <FlexBox gap="0.2rem">
        {label && <Text size={inputSize} bold={true} text={label} />}
        <FlexBox flexDirection="row" className={preffixAndSuffixClasses} flex={'0'}>
          {prefix && <Text size={inputSize} text={prefix} />}

          <InputComponent
            {...props}
            ref={ref}
            type={type}
            data-theme={dataTheme}
            data-testid="Input"
            className={inputClasses}
            onChange={mask ? undefined : onChange}
            options={mask.options}
            onAccept={mask.onAccept}
            onComplete={mask.onComplete}
            placeholder={placeholder}
            value={mask ? undefined : value}
            defaultValue={mask ? undefined : defaultValue}
          />

          {suffix && <Text size={inputSize} text={suffix} />}
        </FlexBox>
      </FlexBox>
    )
  },
)

Input.displayName = 'Input'

export default React.memo(Input)
