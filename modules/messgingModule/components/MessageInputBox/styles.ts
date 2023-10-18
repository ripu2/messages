import { Box, Button, OutlinedInput, Typography } from "@mui/material";

import { styled } from "@mui/system";

export const InputBox = styled(OutlinedInput)(({}) => ({
  marginTop: 20,
  width: '20%',
  height: 40,
  backgroundColor: 'white'
}));

export const RowFlex = styled(Box)(({}) => ({
  flexDirection: 'row',
}));

export const CustomButton = styled(Button)(({}) => ({
  marginLeft: 30,
  backgroundColor: 'white',
  color: 'black'
}));