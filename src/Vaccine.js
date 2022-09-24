import {useState, useEffect} from 'react';
import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
const Vaccine=()=>
{
    const [pin, setPin]=useState({});


    useEffect(()=>
    {
        const getStateID=async()=>
        {
            await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then(response=>response.json())
            .then((data)=>
            {
                const IDs=data.map((id)=>({
                    state:id.state_name,
                    id:id.state_id
                }))
                setPin(IDs);
            });
        }
        getStateID();

    },[])

    return(
        <div className="vaccine">
            
        </div>
    );
}

export default Vaccine;