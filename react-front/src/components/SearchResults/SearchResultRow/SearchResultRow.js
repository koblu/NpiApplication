import React from 'react';
import {Paper, Typography} from '@mui/material';

const SearchResultRow = (props) => { 
  const mailingAddress = props.result?.addresses?.find((address => address.address_purpose === "MAILING"));
  const basic = props.result?.basic;
  const result = props.result;
  return (
  <Paper elevation={4} sx={{width: '30%', height: '100%', paddingTop: '50px', paddingBottom: '50px'}} onClick={() => {props.setSelected(result.npiNo)}}>
    {result.name && <Typography>{result.name}</Typography>}
    <Typography> {result.address_1}</Typography>
    {result.address_2 && <Typography> {result.address_2}</Typography>}
    <Typography>{result.city}, {result.state}</Typography>
  </ Paper>
)};

export default SearchResultRow;
