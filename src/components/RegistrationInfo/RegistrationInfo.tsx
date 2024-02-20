import { Link } from "react-router-dom";

type RegistrationInfoType = {
  path: string,
  text: string,
  text2: string
}

export const RegistrationInfo = ({path, text, text2}: RegistrationInfoType) =>{
    return(
        <div className="registration">
        <span>
          {text}<Link to={path}>{text2}</Link>
        </span>
        <p>Войти с помощью</p>
        <div className="icons-wrapper">
          <a className="reg__link google-link" href="#">
            <img src="./img/icons/google.svg" alt="Google" />
          </a>
          <a className="reg__link google-plus-link" href="#">
            <img src="./img/icons/google-plus.svg" alt="Google Plus" />
          </a>
          <a className="reg__link yandex-link" href="#">
            <img src="./img/icons/yandex.svg" alt="Yandex" />
          </a>
          <a className="reg__link mail-ru-link" href="#">
            <img src="./img/icons/mail-ru.svg" alt="Mail.ru" />
          </a>
        </div>
      </div>
    );
};