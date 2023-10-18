import { Box, Button, OutlinedInput, Typography } from "@mui/material";

import { styled } from "@mui/system";

export const ParentContainer = styled(Box)(({}) => ({
  padding: 15,
  display: 'flex',
}));

export const RowFlex = styled(Box)(({}) => ({
  flexDirection: 'row',
  display: 'flex',
}));

export const ColumnFlex = styled(Box)(({}) => ({
  flexDirection: 'column',
  marginLeft: 20,
}));

export const HeaderTypography = styled(Typography)(({}) => ({
  fontSize: '1.3em',
  color: 'white',
  marginLeft: 10,
  cursor: 'pointer',
}));

export const MessageBodyTypography = styled(Typography)(({}) => ({
  fontSize: '1em',
  color: 'white',
  cursor: 'pointer',
}));
