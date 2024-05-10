import React from 'react';
import {Paper, Box, Typography} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SearchResultRow = (props) => { 
  const mailingAddress = props.result?.addresses?.find((address => address.address_purpose === "MAILING"));
  const basic = props.result?.basic;
  const result = props.result;
  return (
  <Paper elevation={4} sx={{width: '30%', height: '100%', paddingTop: '50px', paddingBottom: '50px'}} onClick={() => {props.setSelected(result.npiNo)}}>
    <Box
      sx={{display:"flex",
        flexDirection: "row",
        justifyContent:"space-evenly"
      }}
    >
      <Box
          sx={{display:"flex",
            flexDirection: "column",
            flexBasis: "80%"
          }}
          >
          {result.name && <Typography>{result.name}</Typography>}
          <Typography> {result.address_1}</Typography>
          {result.address_2 && <Typography> {result.address_2}</Typography>}
          <Typography>{result.city}, {result.state}</Typography>
        </ Box>
      <Box
        sx={{display:"flex",
          flexDirection: "column",
          justifyContent: "center",
          flexBasis: "20%"
        }}
        >
        <ArrowForwardIosIcon />
      </Box>
    </ Box>
  </ Paper>
)};

export default SearchResultRow;
