import {Link} from "react-router";

export default function Logo({className, imgClassName}) {
    return (
        <Link to="/" className={className}>
            <img alt="Your Company" src="logo.png" className={imgClassName} />
        </Link>
    );
}
