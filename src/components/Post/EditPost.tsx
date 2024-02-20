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
import { useEditPostMutation } from "../../store/Api/postApi";
import { Heading } from "../Typography/Heading/Heading";
import { useEffect } from "react";
import { PostItem } from "../../Types/post";

type EditPostProps = {
  post: PostItem;
  isEditPostModalOpen: boolean;
  handleEditPostSuccess: () => void;
  onClose: () => void;
};

const editNewPostSchema = yup.object({
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

export const EditPost = ({
  post,
  isEditPostModalOpen,
  onClose,
  handleEditPostSuccess,
}: EditPostProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(editNewPostSchema),
  });

  const [editPost, { isSuccess }] = useEditPostMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      handleEditPostSuccess();
    }
  }, [isSuccess]);

  const onEditPostFormSubmit = (data: { newPostText: string }) => {
    editPost({
      post_id: post.id,
      new_text: data.newPostText,
    });
  };

  return (
    <Modal isOpen={isEditPostModalOpen} style={customStyles}>
      <AddNewPostForm onSubmit={handleSubmit(onEditPostFormSubmit)}>
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
