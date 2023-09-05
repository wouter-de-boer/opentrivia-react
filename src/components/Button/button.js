import './button.css';

const Button = (props) => {
    const { label, onClick } = props

    

    return (
        <input type='button' value={label} onClick={onClick} />
    );
}

export default Button;