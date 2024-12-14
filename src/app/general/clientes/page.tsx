'use client'

import { CustomerTable } from "@/components/Customers/CustomerTable";
import { UserCreationDialog } from "@/components/Customers/UserCreationDialog/UserCreationDialog";
import { User } from "@/model/User";
import { getUsers } from "@/service/UserService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Clientes() {

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log(' se lanzo el metodo')
        console.log(data)
        setUsers([...data]);
      } catch (err) {
        console.log("algo salio mal ")
      }
    };

    useEffect(() => {
      fetchUsers();
    }, []);

    return(
        <Box sx={{paddingTop: {md: '2%', xs: '7%'}, paddingRight:{xs: '10%', md: '10%'},paddingLeft: {xs: '10%', md: '10%'}, paddingBottom: '2%' }}>
           <Box sx={{width: '100%',display: 'flex', justifyContent: 'flex-end',marginBottom: '20px'}}>
                <UserCreationDialog onUpdate={fetchUsers}/>
           </Box>
            <CustomerTable users={users} onUpdate={fetchUsers}/>
        </Box>
    )
}