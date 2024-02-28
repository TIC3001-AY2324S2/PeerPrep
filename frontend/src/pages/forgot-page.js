import React from 'react';
import ForgotComponent from '../components/ForgotComponent/ForgotComponent';
import BasePage from './base-page';

class ForgotPage extends React.Component {
    render() {
        return (
            <BasePage
                navigate={this.props.navigate}
                isLoginPage
                component={(props) => {
                    return  (
                        <ForgotComponent
                            {...props}
                        />
                    );
                }}
            />
        );
    }
}

export default ForgotPage;
