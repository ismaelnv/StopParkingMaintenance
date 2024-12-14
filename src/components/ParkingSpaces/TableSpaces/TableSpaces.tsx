'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePromotions } from '@/service/PromotionsService';
import { ParkingSpaces } from '@/model/Parkingspaces';
import { FloorUpdateDialog } from '../FloorUpdateDialog';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

interface CustomerTableProps {
  parkingSpaces: ParkingSpaces[]; // Lista de usuarios
  onUpdate: () => void;
}

export function TableSpaces({ parkingSpaces, onUpdate }: CustomerTableProps) {


    const handleDelete = async (id:number) => {
      await deletePromotions(id);
      onUpdate();
    };

    return (
        <TableContainer component={Paper} sx={{boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.9)',height: 620}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <TableRow>
                <StyledTableCell>Codigo Piso</StyledTableCell>
                <StyledTableCell align="right">Numero de Espacios</StyledTableCell>
                <StyledTableCell align="right">Estado</StyledTableCell>
                <StyledTableCell align="right">Mantenimiento</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingSpaces.map((row) => (
                <StyledTableRow key={row.idEspacio}>
                  <StyledTableCell component="th" scope="row">
                    {row.piso.idPiso}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.numeroEspacio}</StyledTableCell>
                  <StyledTableCell align="right">{String(row.estado)}</StyledTableCell>
                  <StyledTableCell align="right">  
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1,alignItems: 'center'}}>
                        <Button onClick={() => handleDelete(row.idEspacio)} variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{width: '150px'}}>
                            Eliminar
                        </Button>
                        <FloorUpdateDialog onUpdate={() => onUpdate()} id= {row.idEspacio}/>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}