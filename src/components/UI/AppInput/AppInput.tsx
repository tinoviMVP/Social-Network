import { AppInputErrorText, StyledInput } from "./AppInput.style";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
  errorText: string;
}

export const AppInput = ({
  hasError,
  errorText,
  type,
  required,
  placeholder,
  ...props
}: AppInputProps) => {
  return (
    <>
      <StyledInput type={type} required={required} placeholder={placeholder} $isError={hasError} {...props} />
      {hasError && <AppInputErrorText>{errorText}</AppInputErrorText>}
    </>
  );
};
