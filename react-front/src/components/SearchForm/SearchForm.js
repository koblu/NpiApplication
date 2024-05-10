import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';
import TextField from '@mui/material/TextField';
import {Box, Paper, Button, Typography, Alert, Card, AppBar} from '@mui/material';
import { useState } from 'react';

const SearchForm = (props) => { 
  const [npiNumber, setNpiNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [taxoDesc, setTaxoDesc] = useState('')

  const doSearch = () => {
    props.handleInitSearch (
      {
        npiNo: npiNumber,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        zip: zip,
        taxoDesc: taxoDesc
      }
    )
  };

  return (
  <Paper elevation={2} sx={
    {
      width: '100%', 
      height: '80vh', 
      paddingTop: '50px', 
      paddingBottom: '50px', 
      overflow:'auto'
    }}>
    <Box
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' }
    }}>
      <TextField id="outlined-basic" label="NPI Number" variant="outlined" value={npiNumber} onInput={(e) => {setNpiNumber(e.target.value)}}/>
      <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onInput={(e) =>  {setFirstName(e.target.value)}}/>
      <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onInput={(e) =>  {setLastName(e.target.value)}}/>
      <TextField id="outlined-basic" label="City" variant="outlined" value={city} onInput={(e) =>  {console.log(city); setCity(e.target.value)}}/>
      <TextField id="outlined-basic" label="State" variant="outlined" value={state} onInput={(e) =>  {setState(e.target.value)}}/>
      <TextField id="outlined-basic" label="Zip Code" variant="outlined" value={zip} onInput={(e) =>  {setZip(e.target.value)}}/>
      <TextField id="outlined-basic" label="Taxonomy Description" variant="outlined" value={taxoDesc} onInput={(e) =>  {setTaxoDesc(e.target.value)}}/>
      <Button variant="contained" onClick={() => {doSearch();}}>Search</Button>
      </Box>
  </ Paper>
)};

export default SearchForm;
