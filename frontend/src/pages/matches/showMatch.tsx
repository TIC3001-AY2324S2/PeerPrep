import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { useShow } from '@refinedev/core';
import { NumberField, Show} from '@refinedev/mui';

export const MatchShow = () => {
  const { queryResult } = useShow({ resource: 'matches' });
  const { data, isLoading } = queryResult;

  const matchRecord = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          ID
        </Typography>
        <NumberField value={matchRecord?.id ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Difficulty
        </Typography>
        <TextField value={matchRecord?.difficulty} />
        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        <TextField value={matchRecord?.category} />
        <Typography variant="body1" fontWeight="bold">
          Time Limit
        </Typography>
        <TextField value={matchRecord?.time_limit ?? 'N/A'} />
        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={matchRecord?.status} />
      </Stack>
    </Show>
  );
};
