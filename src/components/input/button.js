import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const Button = ({ href, title, className, ...rest }) => {
    return href ? (
        <Link to={href} className={twMerge(`btn ${className}`)}>{title}</Link>
    ) :
        (
            <button
                className={twMerge(`btn ${className}`)}
                {...rest}
            >
                {title}

            </button>
        )
}

export default Button