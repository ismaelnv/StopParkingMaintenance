import { ParkingSpaces } from './../model/Parkingspaces';
import { ParkingSpacesDto } from "@/model/ParkingEspaceDto";
import Swal from 'sweetalert2'

export const getParkingSpaces = async ():Promise<ParkingSpaces[]> => {
   
  const response = await fetch('http://localhost:8090/espacios/activos'); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};

export const getParkingSpacesId = async (id: number):Promise<ParkingSpaces> => {
   
  const response = await fetch('http://localhost:8090/espacios/'+id); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};

export const updateParkingSpace = async (id: number, parkingSpaces: ParkingSpacesDto):Promise<ParkingSpaces> => {
   
  const response = await fetch('http://localhost:8090/espacios/'+id,{
    method: 'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(parkingSpaces)
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  Swal.fire({
    title: "¡Bien hecho!",
    text: "Piso de estacionamiento actualizado correctamente",
    icon: "success"
  });
  return response.json();
};

export const createParkingSpace = async (parkingSpaces:ParkingSpacesDto):Promise<ParkingSpaces> => {
   
  const response = await fetch('http://localhost:8090/espacios',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parkingSpaces)
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  
  console.log(response)
  
  Swal.fire({
    title: "¡Bien hecho!",
    text: "Espacio de estacionamiento creado Correctamente",
    icon: "success"
  });

  return response.json()
};
