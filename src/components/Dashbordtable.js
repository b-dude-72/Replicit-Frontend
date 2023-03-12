import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashbordtable = ({drs}) => {
    // console.log("srs: " + drs)
    let localAuth = localStorage.getItem('auth-token');
    let navigate = useNavigate();

    const [message, setMessage] = useState();


    let docId;
    let docRole;

    const handleUpdate = (id, role) => {
        // console.log("curr id: " + id + " " + role);
        docId = id;
        docRole = role;
        changeDoctorStatus(docId, docRole);
    }


    const changeDoctorStatus = async (id, role) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth,
            },
            body: JSON.stringify({
                tochange: role
            })
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/updatedrstatus/${id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    setMessage(data.error)
                } else {
                    setMessage("Status Modifed")
                    
                }
            });

            

    }

    // // console.log(role)

    if(message){
        setTimeout(() => {
                setMessage("")
            }, 2000);
    }




    return (
        <>
            {
                console.log(drs.length)
            }

             {
                
                drs.map((currdr) => {
                    // console.log("currdr " + currdr.firstname)
                    const { firstname,middlename,lastname, email, phone,status,rejectmessage } = currdr;
                    return (
                        <tr class="bg-gray-100 border-b">
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {firstname}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {middlename}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {lastname}
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {email} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {phone} 
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {status}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {rejectmessage}
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}


export default Dashbordtable;
