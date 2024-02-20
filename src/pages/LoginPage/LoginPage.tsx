import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Heading } from "../../components/Typography/Heading/Heading";
import { RegistrationInfo } from "../../components/RegistrationInfo/RegistrationInfo";
import { AppInput } from "../../components/UI/AppInput/AppInput";
import { LoginStyle } from "./LoginPage.style";
import { useForm, Controller } from "react-hook-form";
import { AppButton } from "../../components/UI/AppButton/AppButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginUserMutation } from "../../store/Api/authApi";


const loginPageFields = {
  userEmail: "",
  userPassword: "",
};

const loginValidationSchema = yup.object({
  userEmail: yup
    .string()
    .required("Обязательное поле")
    .email("Формат должен соответствовать формату email"),
  userPassword: yup
    .string()
    .required("Обязательное поле")
    .min(4, "Пароль должен содержать как минимум 4 символа!"),
});

export const LoginPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: loginPageFields,
    resolver: yupResolver(loginValidationSchema),
  });

  const navigate = useNavigate();

  const [loginUser, {data: userData}] = useLoginUserMutation()

  const onLoginFormSubmit = (data: any) => {
    loginUser({email: data.userEmail, password: data.userPassword})
  };

  useEffect(() => {
    console.log("USER: ", userData);

    if (userData?.user_id) {
      navigate("/profile-page");
    }
  }, [userData, navigate]);

  console.log("errors", errors);

  return (
    <LoginStyle>
      <Heading headingType="h1" headingText="Авторизация" />
      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
        <Controller
          name="userEmail"
          control={control}
          render={({ field }) => (
            <AppInput
              hasError={!!errors.userEmail?.message}
              errorText={errors.userEmail?.message as string}
              placeholder="email"
              {...field}
            />
          )}
        />
        <Controller
          name="userPassword"
          control={control}
          render={({ field }) => (
            <AppInput
              type="password"
              hasError={!!errors.userPassword?.message}
              errorText={errors.userPassword?.message as string}
              placeholder="Пароль"
              {...field}
            />
          )}
        />
        <AppButton type="submit" buttonLabel="Войти" />
      </form>
      <a href="#">Забыли пароль?</a>
      <RegistrationInfo path="/registration-page" text="Нет аккаунта" text2="Зарегистрироваться"/>
    </LoginStyle>
  );
};