import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import {Box, Paper, Button, Typography, TableContainer, TableCell, TableRow, Table} from '@mui/material';
import { useState } from 'react';
import { useConnection } from '../../utilities/useConnection';
import ClearIcon from '@mui/icons-material/Clear';


const DetailView = (props) => { 
  const conn = useConnection();
  const [details, setDetails] = useState({});

  useEffect(
    () => {
      if (!!props.selected) conn.details(props.selected).then((data) => setDetails(data));
    }, [props.selected]
  )

  console.log('details', details)

  const sortedAddresses = details?.addresses?.sort((a, b) => {
    const upperA = a.address_purpose;
    const upperB = b.address_purpose;
    if (upperA > upperB) return -1
    if (upperA < upperB) return 1
    return 0
  });

  return (
  <Paper elevation={2} sx={{width: '100%', height: '80vh', paddingTop: '50px', paddingBottom: '50px', overflow:"auto"}}>
    <Box sx={{position:"relative"}}>
      <ClearIcon sx={{position:'absolute', top: '-30px', left: '10px', color: 'red'}} onClick={props.clearSelected} />
    </Box>
    <Box>
      {details?.basic?.organization_name && <Typography>{details.basic.organization_name}</Typography>}
      {details?.basic?.first_name && <Typography>{details.basic.first_name} {details.basic.last_name}</Typography>}
      <TableContainer key={"npi"}>
        <Table>
          <TableRow>
            <TableCell>NPI Number:</TableCell><TableCell>{details.number}</TableCell>
          </TableRow>
          </Table>
        </TableContainer>
        <TableContainer key={"specials"}>
          <Table>
            <TableRow>
                <TableCell>Specialties:</TableCell>
              </TableRow>
            {details.taxonomies?.map(taxo => taxo.desc && (
              <TableRow key={taxo.desc+taxo.state}>
                <TableCell>{taxo.desc} {!!taxo.state ?`(${taxo.state})` : ''}</TableCell>{taxo.license && <TableCell>License No. {taxo.license}</TableCell>}
              </TableRow>
            ))}
          </Table>
        </TableContainer>
        <Box sx={{marginTop:'25px'}}>
          <Typography>Addresses</Typography>
        </Box>
        <TableContainer key={"addresses"}>
        <Table>
        {sortedAddresses?.map(addr =>         
          (<><TableRow>
            <TableCell>{addr.address_purpose}</TableCell><TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Street:</TableCell><TableCell>{addr.address_1}</TableCell>
          </TableRow>
          {addr.address_2 && 
            <TableRow>
              <TableCell></TableCell><TableCell>{addr.address_2}</TableCell>
            </TableRow>
          }
          {addr.city &&
            <TableRow>
              <TableCell>City and State:</TableCell><TableCell>{addr.city}, {addr.state}</TableCell>
            </TableRow>
          }
          {addr.fax_number && 
            <TableRow>
              <TableCell>Fax Number:</TableCell><TableCell>{addr.fax_number}</TableCell>
            </TableRow>
          }
          {addr.postal_code &&
            <TableRow>
              <TableCell>Postal Code:</TableCell><TableCell>{addr.postal_code.slice(0,5)}</TableCell>
            </TableRow>
          }
          </>))}
          {details.practiceAddresses?.map(addr =>         
          (<><TableRow>
            <TableCell>PRACTICE</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Street:</TableCell><TableCell>{addr.address_1}</TableCell>
          </TableRow>
          {addr.address_2 && 
            <TableRow>
              <TableCell></TableCell><TableCell>{addr.address_2}</TableCell>
            </TableRow>
          }
          {addr.city &&
            <TableRow>
              <TableCell>City and State:</TableCell><TableCell>{addr.city}, {addr.state}</TableCell>
            </TableRow>
          }
          {addr.fax_number && 
            <TableRow>
              <TableCell>Fax Number:</TableCell><TableCell>{addr.fax_number}</TableCell>
            </TableRow>
          }
          {addr.postal_code &&
            <TableRow>
              <TableCell>Postal Code:</TableCell><TableCell>{addr.postal_code.slice(0,5)}</TableCell>
            </TableRow>
          }
          </>))}
          </Table>
      </TableContainer>

    </Box>
  </ Paper>
)};

export default DetailView;
