import HueButton from 'hue-react-component/build/HueButton';
import HueIcon from 'hue-react-component/build/HueIcon/HueIcon';
import React from 'react';
import { MaterialDesignContent, enqueueSnackbar, useSnackbar } from 'notistack';
import { styled } from '@material-ui/core';

/**
 * Custom noti-stack snack bar button and behaviour
 * @param {string} snackbarId Id for snack bar
 * @param {function} callback Optional callback to be executed on closing snackbar
 */
const SnackBarAction = (snackbarId, callback) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <HueButton
      onClick={() => {
        closeSnackbar(snackbarId);
        if (callback) {
          callback();
        }
      }}
      style={{ cursor: 'pointer' }}>
      <HueIcon icon="cancel" color="white" size={12} />
    </HueButton>
  );
};

/**
 * Custom noti-stack snack bar props anchored to bottom right of screen
 * @param {string} variant success or error
 * @param {function} callback Optional callback to be executed on closing snackbar
 */
const snackBarProps = (variant, callback) => {
  return {
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    variant,
    action: snackbarId => SnackBarAction(snackbarId, callback),
  };
};

/**
 * Custom styling for noti-stack snack bar
 */
export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#00B19D !important',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#E91E63 !important',
  },
}));

/**
 * Shows a success snack bar on the bottom right anchor
 * @param {object} msg object containing key (string) and params (object) attributes
 * @param {function} callback Optional callback to be executed on closing snackbar
 */
export const showSuccessBar = (msg, callback) => {
  enqueueSnackbar(
    msg,
    snackBarProps('success', callback),
  );
};

/**
 * Shows a error snack bar on the bottom right anchor
 * @param {object} msg object containing key (string) and params (object) attributes
 * @param {function} callback Optional callback to be executed on closing snackbar
 */
export const showErrorBar = (msg, callback) => {
    enqueueSnackbar(
      msg,
      snackBarProps('error', callback),
    );
};