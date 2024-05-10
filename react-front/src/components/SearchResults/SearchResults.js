import React from 'react';
import {Box, Paper, Card, Typography} from '@mui/material';
import SearchResultRow from './SearchResultRow/SearchResultRow';
import ClearIcon from '@mui/icons-material/Clear';

const SearchResults = (props) => { 
  return (
  <Paper elevation={2} sx={{width: '100%', height: '80vh', paddingTop: '50px', paddingBottom: '50px', overflow: "auto"}}>
    <Box sx={{position:'relative'}}>
      <ClearIcon sx={{position:'absolute', top: '-30px', left: '10px', color: 'red'}} onClick={props.clearResults} />
    </Box>
    <Box
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center'}}
    >
      {props.results.map(result => (<SearchResultRow key={result.npiNo} result={result} setSelected={props.setSelected}/>))}
      {!props.resultsDone && <Card sx={{padding:'20px', backgroundColor:'lightblue'}} onClick={props.handleExtraSearch}>
        <Typography>Load More Records</Typography>
      </Card>}
    </Box>

  </ Paper>
)};

export default SearchResults;
