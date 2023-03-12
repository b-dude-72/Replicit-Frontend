import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const RejectMessage = ({drs}) => {

    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    const [currUser, setCurrUser] = useState();
    let currentUserRole;
    const [message, setMessage] = useState("");

    const getCurrentUserData = () => {


        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth,
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/getmemberdetails`, requestOptions)
            .then(response => response.json())
            .then(data => setCurrUser(data));
    }

    if (currUser) {
        currentUserRole = currUser.user.role;
        // // console.log(currentUserRole)
    }

    const { _id, name, email, status } = drs;

    const [userWebsite, setUserWebsite] = useState("");
    // // console.log(userWebsite)

    const submitWebsite = () => {
        // // console.log("subit website")
        // // console.log(userWebsite);
        addRejectMessage(_id,userWebsite);
    }

    const addRejectMessage = async (id, message) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth,
            },
            body: JSON.stringify({
                message: message
            })
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/setrejectmessage/${id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    // console.log("error")
                    setMessage(data.error)
                    setTimeout(() => {
                    }, 1000);
                } else {
                    // console.log("success")
                    setMessage("Status Modifed")
                    navigate("/tech")
                }
            });
    }


    useEffect(() => {
        getCurrentUserData()
    }, [])




    return (
        <>
            <div className="reject_message flex flex-col items-center justify-center">
                <textarea onChange={(e) => { setUserWebsite(e.target.value) }} className="py-1 px-2 outline-none" />
                <p onClick={submitWebsite} style={{ cursor: "pointer", background: "grey", color: "white", width: "30%",marginTop:"5px" }}>Reject</p>
            </div>
        </>
    )
}
export default RejectMessage;
