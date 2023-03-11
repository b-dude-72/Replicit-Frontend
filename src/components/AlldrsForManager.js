import { useState } from "react";
import RejectMessage from "./RejectMessage";


const AlldrsForManager = ({ drs }) => {

    let localAuth = localStorage.getItem('auth-token')

    const [message, setMessage] = useState();

    let docId;
    let docRole;

    const handleUpdate = (id, role) => {
        console.log("curr id: " + id + " " + role);
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

    // console.log(role)

    if(message){
        setTimeout(() => {
                setMessage("")
            }, 2000);
    }

    return (
        <>
            <>
                {message && <p>{message}</p>}
                {
                    drs.map((drs) => {
                        const { _id, name, email, status } = drs;
                        const handleOnChange = (e) => {
                            // console.log("clicked handleOnChange");
                            // console.log(userData);
                            handleUpdate(_id, e.target.value)
                        }
                        return (
                            <tr class="bg-gray-100 border-b" key={_id}>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {name}
                                </td>
                                <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                                    {email}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <RejectMessage drs={drs}/>
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <select className="outline-none border border-gray-400 py-1 bg-slate-100" id="role" name="role" onChange={handleOnChange}>
                                        <option value="0" defaultChecked>{status}</option>
                                        <option value="Approved">Approve</option>
                                        {/* <option value="Rejected">Reject</option> */}
                                    </select>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        </>
    )
}


export default AlldrsForManager