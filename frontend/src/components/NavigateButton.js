import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = (props) => {
    const { disableRipple, style, text, url } = props;
    const navigate = useNavigate();

    return (
        <Button
            disableRipple={disableRipple}
            style={style}
            onClick={() => navigate(url)}
        >
            {text}
        </Button>
    );
};

export default NavigateButton;
