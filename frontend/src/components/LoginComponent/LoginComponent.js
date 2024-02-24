import {
    Alert,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { loginAccount, registerAccount } from '../../apis/app-api';
import './LoginComponent.scss';
import NavigateButton from '../NavigateButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { withSnackbar } from 'notistack';
import {
    initialLoginPageState,
    snackBarProps,
} from '../../constants/constants';
import axios from 'axios';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initialLoginPageState,
            isRegisterPage: this.props.isRegisterPage,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.isRegisterPage !== nextProps.isRegisterPage) {
            return {
                ...initialLoginPageState,
                isRegisterPage: nextProps.isRegisterPage,
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(
            {
                errorMessage: '',
                isButtonClicked: true,
            },
            () => {
                this.props.setIsLoading(true);
                if (this.props.isRegisterPage) {
                    registerAccount({
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                    }).then((res) => {
                        if (res.error) {
                            // Display register error
                            this.setState({
                                errorMessage: res.data.message,
                                isButtonClicked: false,
                            });
                        } else {
                            // Open snackbar to display register success
                            this.props.enqueueSnackbar(
                                `Successfully registered an account for [${this.state.username}]!`,
                                snackBarProps('success'),
                            );
                            this.props.navigate('/login');
                        }
                        this.props.setIsLoading(false);
                    });
                } else {
                    loginAccount({
                        username: this.state.username,
                        password: this.state.password,
                    }).then((res) => {
                        if (res.error) {
                            // Display login error
                            this.setState({
                                errorMessage: res.data.message,
                                isButtonClicked: false,
                            });
                        } else {
                            // Open snackbar to display login success
                            this.props.enqueueSnackbar(
                                `Successfully logged in to [${this.state.username}]!`,
                                snackBarProps('success'),
                            );
                            localStorage.setItem('token', res.data.token);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                            this.props.setToken(res.data.token);
                            this.props.setIsVerifyDone(true);
                            this.props.navigate('/home');
                            this.props.setUserInfo(res.data.userInfo);
                        }
                        this.props.setIsLoading(false);
                    });
                }
            },
        );
    };

    updateState = (target, value) => {
        this.setState({
            [target]: value,
        });
    };

    inverseState = (target) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                [target]: !prevState[target],
            };
        });
    };

    renderShowPasswordIcon = (target) => {
        return (
            <InputAdornment position="end">
                <IconButton
                    disableRipple
                    aria-label="toggle password visibility"
                    onClick={() => this.inverseState(target)}
                    onMouseDown={(e) => e.preventDefault}
                    edge="end"
                >
                    {this.state[target] ? (
                        <VisibilityOffIcon />
                    ) : (
                        <VisibilityIcon />
                    )}
                </IconButton>
            </InputAdornment>
        );
    };

    renderTextField = (
        isStandard,
        target,
        value,
        label,
        showPassword,
        showPassTarget,
    ) => {
        return (
            <TextField
                size="small"
                className={
                    isStandard
                        ? 'standard-panel-text-field'
                        : 'helper-text-field'
                }
                onChange={(e) => this.updateState(target, e.target.value)}
                value={value}
                label={label}
                type={showPassTarget && !showPassword ? 'password' : 'text'}
                InputProps={{
                    endAdornment: showPassTarget
                        ? this.renderShowPasswordIcon(showPassTarget)
                        : '',
                }}
                helperText={
                    target === 'email' ? "We'll never share your email." : ''
                }
            />
        );
    };

    renderLoginForm = () => {
        return (
            <>
                {this.renderTextField(
                    true,
                    'username',
                    this.state.username,
                    'Username',
                )}
                {this.renderTextField(
                    true,
                    'password',
                    this.state.password,
                    'Password',
                    this.state.showPassword,
                    'showPassword',
                )}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0px 32px 0px 32px',
                    }}
                >
                    <NavigateButton
                        url="/register"
                        disableRipple
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: '12px',
                        }}
                        text="Need an account?"
                    />
                    <Button
                        type="submit"
                        disabled={this.state.isButtonClicked}
                        className={'login-panel-main-button'}
                        variant="contained"
                    >
                        Login
                    </Button>
                </div>
            </>
        );
    };

    renderRegisterForm = () => {
        // helperText="Only alphanumerics, maximum 30 characters. "
        // TODO add username regex validation
        // helperText="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
        // TODO add password regex validation
        return (
            <>
                {this.renderTextField(
                    true,
                    'username',
                    this.state.username,
                    'Username',
                )}
                {this.renderTextField(
                    false,
                    'email',
                    this.state.email,
                    'Email',
                )}
                {this.renderTextField(
                    true,
                    'password',
                    this.state.password,
                    'Password',
                    this.state.showPassword,
                    'showPassword',
                )}
                {this.renderTextField(
                    true,
                    'confirmPassword',
                    this.state.confirmPassword,
                    'Retype password',
                    this.state.showConfirmPassword,
                    'showConfirmPassword',
                )}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0px 32px 0px 32px',
                    }}
                >
                    <NavigateButton
                        url="/login"
                        disableRipple
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: '12px',
                        }}
                        text="Already have an account?"
                    />
                    <Button
                        disabled={this.state.isButtonClicked}
                        type="submit"
                        className={'login-panel-main-button'}
                        variant="contained"
                    >
                        Register
                    </Button>
                </div>
            </>
        );
    };

    render() {
        if (this.props.token || localStorage.getItem('token')) {
            return <></>;
        }
        return (
            <div className={'login-container'}>
                <img
                    draggable={false}
                    src="/static/peerprep_logo.png"
                    className={'main-logo'}
                    alt=""
                />
                <div
                    className={`${
                        this.props.isRegisterPage
                            ? 'register-panel'
                            : 'login-panel'
                    } main-panel`}
                >
                    <Typography className={'login-panel-main-title'}>
                        {this.props.isRegisterPage
                            ? 'Sign up with Peerprep'
                            : 'Login with Peerprep'}
                    </Typography>
                    {this.state.errorMessage !== '' && (
                        <Alert className="main-panel-error" severity="error">
                            {this.state.errorMessage}
                        </Alert>
                    )}
                    <form
                        onSubmit={this.handleSubmit}
                        className={'full-width-class'}
                    >
                        <FormControl className={'full-width-class'}>
                            {this.props.isRegisterPage
                                ? this.renderRegisterForm()
                                : this.renderLoginForm()}
                        </FormControl>
                    </form>
                </div>
            </div>
        );
    }
}

export default withSnackbar(LoginComponent);
