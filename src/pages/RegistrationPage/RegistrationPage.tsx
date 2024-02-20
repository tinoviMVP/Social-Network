import React from "react";
// import "./LoginPage.scss";
import { Heading } from "../../components/Typography/Heading/Heading";
import { RegistrationInfo } from "../../components/RegistrationInfo/RegistrationInfo";
import { AppButton } from "../../components/UI/AppButton/AppButton";
import { AppInput } from "../../components/UI/AppInput/AppInput";
import { RegistrationStyle } from "./RegistrationPage.style";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useRegisterUserMutation } from "../../store/Api/authApi";

const registrationPageFields = {
  userName: "",
  userEmail: "",
  userPhoneNumber: "",
  userPassword: "",
  userCity: "",
};

const registrationValidationSchema = yup.object({
  userName: yup.string().required("Обязательное поле"),
  userEmail: yup
    .string()
    .required("Обязательное поле")
    .email("Формат должен соответствовать формату email"),
  userPassword: yup
    .string()
    .required("Обязательное поле")
    .min(4, "Пароль должен содержать как минимум 4 символа"),
  userPhoneNumber: yup.string().required("Обязательное поле").matches(/^9989\d{8}$/, "Номер не валиден"),
  userCity: yup.string().required("Обязательное поле")
});

export const RegistrationPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: registrationPageFields,
    resolver: yupResolver(registrationValidationSchema),
  });

  const navigate = useNavigate();
  const [registerUser, {data: userData}] = useRegisterUserMutation();

  const onLoginFormSubmit = (data: any) => {
    registerUser({name: data.userName, password: data.userPassword, email: data.userEmail, phone_number: data.userPhoneNumber, user_city: data.userCity})
  };

  useEffect(() => {
    console.log('USER: ', userData)

    if(userData?.user_id) {
      navigate('/')
    }
  }, [userData, navigate])

  return (
    <RegistrationStyle>
      <Heading headingType="h1" headingText="Регистрация" />
      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <AppInput
              hasError={!!errors.userName}
              errorText={errors.userName?.message as string}
              placeholder="Имя"
              {...field}
            />
          )}
        />
        <Controller
          name="userEmail"
          control={control}
          render={({ field }) => (
            <AppInput
              hasError={!!errors.userEmail}
              errorText={errors.userEmail?.message as string}
              placeholder="Эл. почта"
              {...field}
            />
          )}
        />
        <Controller
          name="userPhoneNumber"
          control={control}
          render={({ field }) => (
            <AppInput
              hasError={!!errors.userPhoneNumber}
              errorText={errors.userPhoneNumber?.message as string}
              placeholder="Номер телефона"
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
              hasError={!!errors.userPassword}
              errorText={errors.userPassword?.message as string}
              placeholder="Пароль"
              {...field}
            />
          )}
        />
        <Controller
          name="userCity"
          control={control}
          render={({ field }) => (
            <AppInput
              hasError={!!errors.userCity}
              errorText={errors.userCity?.message as string}
              placeholder="Город"
              {...field}
            />
          )}
        />
        <AppButton type="submit" buttonLabel="Зарегистрироваться" />
      </form>
      <a href="#">Забыли пароль?</a>
      <RegistrationInfo
        text="Уже есть аккаунт?"
        path="/"
        text2=" Войти"
      />
    </RegistrationStyle>
  );
};
