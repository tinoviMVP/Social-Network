import { Link } from "react-router-dom";
import { AppButton, AppButtonProps } from "../AppButton/AppButton";

type LinkType = {
    path: string
} & AppButtonProps;

export const LinkButton = ({path, buttonLabel, ...buttonProps}: LinkType) => {
    return(
        <Link to={path}><AppButton buttonLabel={buttonLabel} {...buttonProps}/></Link>
    )
}