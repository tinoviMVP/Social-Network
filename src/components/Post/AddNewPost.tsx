import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AddNewPostForm,
  PostFormContent,
  PostFormFooter,
  PostFormHeader,
} from "./AddNewPost.style";
import { AppInput } from "../UI/AppInput/AppInput";
import { AppButton } from "../UI/AppButton/AppButton";
import { useAddNewPostMutation } from "../../store/Api/postApi";
import { Heading } from "../Typography/Heading/Heading";
import { useEffect } from "react";

type AddNewPostProps = {
  isAddPostModalOpen: boolean;
  onClose: () => void
  handleAddPostSuccess: () => void
};

const addNewPostSchema = yup.object({
  newPostText: yup.string().required("Поле обязательно для заполнения"),
});

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

export const AddNewPost = ({ isAddPostModalOpen, onClose, handleAddPostSuccess }: AddNewPostProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(addNewPostSchema),
  });

  const [addNewPost, { isSuccess }] = useAddNewPostMutation();

  useEffect(() => {
    if (isSuccess) {
        onClose()
        handleAddPostSuccess()
    }
  }, [isSuccess])

  const onAddPostFormSubmit = (data: { newPostText: string }) => {
    addNewPost({
      user_id: 57,
      main_text: data.newPostText,
    });
  };

  return (
    <Modal isOpen={isAddPostModalOpen} style={customStyles}>
      <AddNewPostForm onSubmit={handleSubmit(onAddPostFormSubmit)}>
        <PostFormHeader>
          <Heading headingText="Добавить новый пост" headingType="h4" />
        </PostFormHeader>
        <PostFormContent>
          <Controller
            control={control}
            name="newPostText"
            render={({ field }) => (
              <AppInput
                hasError={!!errors.newPostText}
                errorText={errors.newPostText?.message as string}
                {...field}
              />
            )}
          />
        </PostFormContent>
        <PostFormFooter>
          <AppButton buttonLabel="Создать" />
          <AppButton buttonLabel="Закрыть" />
        </PostFormFooter>
      </AddNewPostForm>
    </Modal>
  );
};
