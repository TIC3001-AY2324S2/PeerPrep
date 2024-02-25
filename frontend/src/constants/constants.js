import { useParams } from 'react-router-dom';

export const initialLoginPageState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    showPassword: false,
    showConfirmPassword: false,
    isButtonClicked: false,
};

export function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
};