import React, { forwardRef } from 'react'
import { InputProps, Mask } from './input.props'
import { useIMask } from 'react-imask'
import { useMergeRefs } from '@/hooks/use-merge-refs'

type MaskedInputProps = InputProps & Mask

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (props: MaskedInputProps, ref): JSX.Element => {
    const { options, onAccept, onComplete, onChange, value, defaultValue, mask, ...rest } = props

    const { ref: imaskRef, value: inputMaskedValue } = useIMask(options, {
      onComplete(value, maskRef) {
        onComplete && onComplete(value, maskRef)
      },
      onAccept(value, maskRef) {
        onAccept && onAccept(value, maskRef)
      },
    })

    const mergedRefs = useMergeRefs(imaskRef, ref)

    return <input {...rest} ref={mergedRefs} />
  },
)

MaskedInput.displayName = 'MaskedInput'

export { MaskedInput }
