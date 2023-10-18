import { Box, Typography, styled } from "@mui/material";

export const HeaderTypography = styled(Typography)(({}) => ({
  fontSize: '3em',
}));

export const SubHeaderTypography = styled(Typography)(({}) => ({
  fontSize: '1.5em',
  color: 'gray'
}));


export const LoaderContainer = styled(Box)(({}) => ({
  alignContent: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', width: '50%', marginTop: '40%'
}));

export const MessageListContainer = styled(Box)(({}) => ({
  height: '40em',
  width: '50%',
  overflow: 'auto',
  marginTop: 35,
}));

export const PaginationContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '25%',
  marginTop: 15,
}));

export const PaginationTypography = styled(Typography)(({}) => ({
  fontSize: '0.9em',
  marginLeft: 10,
  marginRight: 10,
  cursor: 'pointer',
}));