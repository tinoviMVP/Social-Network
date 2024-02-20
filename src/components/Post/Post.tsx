import { PostItem } from "../../Types/post";
import { format } from "date-fns";
import { PostConfigDropdown } from "./PostConfigDropdown";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPostPhotoMutation } from "../../store/Api/fileApi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


type PostProps = {
  post: PostItem;
  handleEditPost: (post: PostItem) => void;
  onDeletePostClick?: () => void;
  onPhotoAddedToPost?: () => void;
};

export const Post = ({
  post,
  handleEditPost,
  onDeletePostClick,
  onPhotoAddedToPost,
}: PostProps) => {
  const [isDropdownOpen, toggleDropdown] = useState<boolean>(false);
  const navigate = useNavigate();
  const [ uploadFile, { isSuccess, isError} ] = useAddPostPhotoMutation()

  const onEditPostClick = () => {
    handleEditPost(post);
    toggleDropdown(false);
  };

  useEffect (() => {
    if (isSuccess) {
      toast.success("Файл загружен успешно")
      if (typeof onPhotoAddedToPost === 'function') {
        onPhotoAddedToPost()
      }
    } 
    if (isError) {
      toast.error ('Произошла ошибка')
    }
  }, [isSuccess, isError])

  const onPostClick = () => {
    navigate(`/post/${post.id}`);
  };
  
  const handleFileupload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.files?.length){
      const formData = new FormData();

      const photoFile = event.target.files[0]

      formData.append('post_id', `${post.id}` )
      formData.append('photo_file', photoFile)

      uploadFile(formData)
    }
  }

  return (
    <div className="Post _liked _marked">
      <div className="UserElem">
        <img src="./img/users/aleksandr-maykov.jpeg" alt="User" />
        <div className="user__description">
          <a href="#" className="main__text">
            {post.user_fk.name}
          </a>
          <p className="secondary__text">
            {format(new Date(post.reg_date), "yyyy MM do EEEE")}
          </p>
        </div>
      </div>
      <p className="Post__text" onClick={() => onPostClick()}>
        {post.main_text}
      </p>
      {!!post.photos.length && (
        <div className="media-container">
          {post.photos.map((photo) => (
            <img
              key={photo.photo_id}
              className="media-item"
              src={`http://161.35.153.209:5430${photo.photo_url}`}
              alt="Post-item"
            />
          ))}
        </div>
      )}
      <div className="PostControls">
        <div className="icon-wrapper comment">
          <input type="file" placeholder="Загрузить изображение" onChange={handleFileupload}/>
        </div>
        <div className="icon-wrapper repost">
          <svg
            className="icon icon-repost"
            viewBox="0 0 32 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="icon"
              d="M31.1767 11.6881L20.105 0.818783C19.9503 0.666682 19.753 0.563052 19.5383 0.520999C19.3235 0.478945 19.1009 0.500357 18.8985 0.582526C18.6962 0.664696 18.5232 0.803931 18.4014 0.982625C18.2797 1.16132 18.2146 1.37144 18.2145 1.58643V7.06864C14.6246 7.37026 10.6595 9.09577 7.39755 11.8117C3.46988 15.0834 1.02443 19.2993 0.510988 23.6824C0.470864 24.0231 0.541243 24.3676 0.712109 24.6669C0.882976 24.9661 1.14562 25.2048 1.46267 25.349C1.77972 25.4932 2.13502 25.5355 2.47801 25.47C2.82099 25.4044 3.13418 25.2344 3.37301 24.984C4.89536 23.393 10.3122 18.3619 18.2145 17.9189V23.3251C18.2146 23.54 18.2797 23.7502 18.4014 23.9289C18.5232 24.1075 18.6962 24.2468 18.8985 24.329C19.1009 24.4111 19.3235 24.4325 19.5383 24.3905C19.753 24.3484 19.9503 24.2448 20.105 24.0927L31.1767 13.2234C31.3837 13.0196 31.5 12.7436 31.5 12.4557C31.5 12.1679 31.3837 11.8919 31.1767 11.6881ZM20.4289 20.7015V16.8035C20.4289 16.5152 20.3122 16.2387 20.1046 16.0349C19.897 15.831 19.6153 15.7165 19.3217 15.7165C15.4356 15.7165 11.6504 16.7124 8.07153 18.6784C6.24879 19.6841 4.55049 20.8932 3.01041 22.2816C3.8131 19.0425 5.83645 15.9625 8.82994 13.4693C12.0435 10.7941 15.9656 9.19495 19.3217 9.19495C19.6153 9.19495 19.897 9.08043 20.1046 8.87659C20.3122 8.67275 20.4289 8.39629 20.4289 8.10802V4.21137L28.8281 12.4557L20.4289 20.7015Z"
              fill="#6D6F7A"
            />
          </svg>
        </div>
        <div className="icon-wrapper mark">
          <svg
            className="icon icon-mark"
            viewBox="0 0 21 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="mark"
              d="M2.5 24.8819C2.02381 25.0725 1.57143 25.031 1.14286 24.7574C0.714285 24.4838 0.5 24.0844 0.5 23.5591V2.85999C0.5 2.07349 0.78 1.39996 1.34 0.839407C1.9 0.278851 2.57238 -0.0009509 3.35714 2.42783e-06H17.6429C18.4286 2.42783e-06 19.1014 0.280281 19.6614 0.840837C20.2214 1.40139 20.5009 2.07444 20.5 2.85999V23.5591C20.5 24.0834 20.2857 24.4829 19.8571 24.7574C19.4286 25.032 18.9762 25.0735 18.5 24.8819L10.5 21.4499L2.5 24.8819Z"
            />
          </svg>
        </div>
      </div>
      {!!post.comments.length && (
        <div className="CommentBlock">
          <img src="./img/users/aleksandr-maykov.jpeg" alt="User" />
          <div className="comment__description">
            <a href="#" className="comment__owner">
              Карина Савина
            </a>
            <p className="comment__text">Это текст комментария...</p>
            <a href="#" className="reply">
              Ответить
            </a>
          </div>
          <span className="date">25 марта</span>
          <svg
            className="icon icon-like"
            viewBox="0 0 23 23"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="icon"
              d="M11.5 23L9.8325 21.3455C3.91 15.4921 0 11.6191 0 6.89373C0 3.02071 2.783 0 6.325 0C8.326 0 10.2465 1.01526 11.5 2.60708C12.7535 1.01526 14.674 0 16.675 0C20.217 0 23 3.02071 23 6.89373C23 11.6191 19.09 15.4921 13.1675 21.3455L11.5 23Z"
            />
          </svg>
        </div>
      )}
      <svg
        className="icon icon-more"
        viewBox="0 0 25 5"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => toggleDropdown(!isDropdownOpen)}
      >
        <g id="more">
          <circle id="ellipse" cx="22.5" cy="2.5" r="2.5" />
          <circle id="ellipse_2" cx="12.5" cy="2.5" r="2.5" />
          <circle id="ellipse_3" cx="2.5" cy="2.5" r="2.5" />
        </g>
      </svg>
      {typeof onDeletePostClick === "function" && (
        <PostConfigDropdown
          isDropdownOpen={isDropdownOpen}
          onEditPostClick={onEditPostClick}
          onDeletePostClick={onDeletePostClick}
        />
      )}
      <ToastContainer/>
    </div>
  );
};
