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
import { User } from '@/model/User';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserDialog } from '../UserDialog';
import { deleteUser } from '@/service/UserService';

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
  users: User[]; // Lista de usuarios
  onUpdate: () => void;
}

export function CustomerTable({ users, onUpdate }: CustomerTableProps) {


    const handleDelete = async (id:number) => {
      await deleteUser(id);
      onUpdate();
    };

    return (
        <TableContainer component={Paper} sx={{boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.9)',height: 620}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <TableRow>
                <StyledTableCell>Nombres</StyledTableCell>
                <StyledTableCell align="right">Apellidos</StyledTableCell>
                <StyledTableCell align="right">Correo</StyledTableCell>
                <StyledTableCell align="right">Dirección</StyledTableCell>
                <StyledTableCell align="right">Fecha de Registro</StyledTableCell>
                <StyledTableCell align="right">Rol</StyledTableCell>
                <StyledTableCell align="right">Estado</StyledTableCell>
                <StyledTableCell align="right">Mantenimiento</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <StyledTableRow key={row.idUsuario}>
                  <StyledTableCell component="th" scope="row">
                    {row.nombres}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.apellidos}</StyledTableCell>
                  <StyledTableCell align="right">{row.correo}</StyledTableCell>
                  <StyledTableCell align="right">{row.direccion}</StyledTableCell>
                  <StyledTableCell align="right">{String(row.fechaRegistro)}</StyledTableCell>
                  <StyledTableCell align="right">{row.rolUsuario}</StyledTableCell>
                  <StyledTableCell align="right">{String(row.estado)}</StyledTableCell>
                  <StyledTableCell align="right">  
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1,alignItems: 'center'}}>
                        <Button onClick={() => handleDelete(row.idUsuario)} variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{width: '150px'}}>
                            Eliminar
                        </Button>
                        <UserDialog onUpdate={() => onUpdate()} id= {row.idUsuario}/>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}