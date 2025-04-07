import { useAppDispatch } from "../../hooks";
import { logout } from "../../state/auth/authActions.ts";

interface Props extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

const Logout = ({ children, ...props }: Props) => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout()).then(() => window.location.href = '/login');
    };

    return (
        <div {...props} onClick={handleLogout}>
            {children}
        </div>
    );
}

export default Logout;
