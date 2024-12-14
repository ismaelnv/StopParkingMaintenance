import { User } from "@/model/User";
import { UserDtoUpdate } from "@/model/UserDtoUpdate";
import Swal from 'sweetalert2'

export const getUsers = async ():Promise<User[]> => {
   
  const response = await fetch('http://localhost:8090/usuarios/activo'); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};


export const getUsersId = async (id: number):Promise<User> => {
   
  const response = await fetch('http://localhost:8090/usuarios/'+id); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};

export const updateUser= async (id: number, user: UserDtoUpdate):Promise<User> => {
   
  const response = await fetch('http://localhost:8090/usuarios/'+id,{
    method: 'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(user)
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  Swal.fire({
    title: "¡Bien hecho!",
    text: "Usuario actualizado correctamente",
    icon: "success"
  });
  return response.json();
};

export const deleteUser= async (id: number):Promise<void> => {
   
  const response = await fetch('http://localhost:8090/usuarios/'+id,{
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
    text: String(text1),
    icon: "success"
  });
};

export const createUser= async (user:UserDtoUpdate):Promise<User> => {
   
  const response = await fetch('http://localhost:8090/usuarios',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  }); 

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json()
};

export const loginUser= async (gmail: string, password: string ):Promise<any> => {
   
  const response = await fetch(`http://localhost:8090/usuarios/login?correo=${gmail}&contraseña=${password}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }); 

  if (!response.ok) {

    const error:string = await response.text()
    
    Swal.fire({
      title: "¡ERROR!",
      text: error,
      icon: "error"
    });
    return; 
  }

  return await response.json()
  
};


