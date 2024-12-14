import { Promotion } from "@/model/Promotion";
import { PromotionDtoCreate } from "@/model/PromotionDtoCreate";
import Swal from 'sweetalert2'

export const getPromotions = async ():Promise<Promotion[]> => {
   
  const response = await fetch('http://localhost:8090/api/promocion/activo'); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};

export const deletePromotions = async (id: number):Promise<void> => {
   
  const response = await fetch('http://localhost:8090/api/promocion/'+id,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  
  const text1 = await response.text()

  Swal.fire({
    title: "¡Bien hecho!",
    text: text1,
    icon: "success"
  });
};


export const getPromotionId = async (id: number):Promise<Promotion> => {
   
  const response = await fetch('http://localhost:8090/api/promocion/'+id); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};

export const updatePromotion = async (id: number, promotion: Promotion):Promise<Promotion> => {
   
  const response = await fetch('http://localhost:8090/api/promocion/'+id,{
    method: 'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(promotion)
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  Swal.fire({
    title: "¡Bien hecho!",
    text: "Promocion Actulizada correctamente",
    icon: "success"
  });
  return response.json();
};

export const createPromotion = async (promotion:PromotionDtoCreate):Promise<Promotion> => {
   
  const response = await fetch('http://localhost:8090/api/promocion',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotion)
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  
  console.log(response)
  
  Swal.fire({
    title: "¡Bien hecho!",
    text: "Promocion Creada Correctamente",
    icon: "success"
  });

  return response.json()
};