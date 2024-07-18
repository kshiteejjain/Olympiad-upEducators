import PropTypes from 'prop-types';
import './Button.css';
type Props = {
    title?: string;
    onClick?: () => void;
    type?: string;
    isSecondary?: boolean;
    isDangerous?: boolean;
    isSocial?: boolean;
    isGoBack?: boolean;
    isImage?: boolean;
    imagePath?: string
    isDisabled?: boolean
}
const Button = ({ title, onClick, isSecondary, isDangerous, isImage, imagePath, isSocial, isDisabled }: Props) => {
    const buttonClass = isDangerous
        ? 'buttonDangerous'
        : isSecondary
            ? 'buttonSecondary'
            : isSocial
                ? 'buttonSocial'
                : 'button';

    return (
        <button className={buttonClass} onClick={onClick} disabled={isDisabled}>
            {isImage && <img src={imagePath} />}
            {title}
        </button>
    )
};

export default Button;

Button.propTypes = {
    title: PropTypes.string
};