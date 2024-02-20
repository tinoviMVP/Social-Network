export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    buttonLabel:string
}

export const AppButton = ({ type, disabled, buttonLabel}: AppButtonProps) =>{
    return (
        <button type= {type} disabled={disabled}>
         {buttonLabel}
        </button>
    );
};