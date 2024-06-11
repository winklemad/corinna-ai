import dynamic from 'next/dynamic'
import { Spinner } from '@/components/spinner'

// Wrapper function to match the expected type
const LoadingSpinner = () => <Spinner />

const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: LoadingSpinner, // Use the wrapper function here
})

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: LoadingSpinner, // Use the wrapper function here
})

type Props = {}

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()
  const { currentStep } = useAuthContextHook()
  const [onOTP, setOnOTP] = useState<string>('')
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

  setValue('otp', onOTP)

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      )
    case 2:
      return (
        <DetailForm
          errors={errors}
          register={register}
        />
      )
    case 3:
      return (
        <OTPForm
          onOTP={onOTP}
          setOTP={setOnOTP}
        />
      )
  }

  return <div>RegistrationFormStep</div>
}

export default RegistrationFormStep
