import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchResultRow.module.css';
import TextField from '@mui/material/TextField';
import {Box, Paper, Button, Typography} from '@mui/material';
import { useState } from 'react';

const Placeholder = (props) => { 
  const mailingAddress = props.result?.addresses?.find((address => address.address_purpose === "MAILING"));
  const basic = props.result?.basic;
  const result = props.result;
  return (
  <Paper elevation={4} sx={{width: '30%', height: '100%', paddingTop: '50px', paddingBottom: '50px', color}} onClick={() => {props.setSelected(result.npiNo)}}>
  </ Paper>
)};

export default Placeholder;
