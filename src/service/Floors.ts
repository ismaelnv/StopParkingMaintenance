import { Floor } from "@/model/Floor";

export const getFloors = async ():Promise<Floor[]> => {
   
  const response = await fetch('http://localhost:8090/pisos'); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};