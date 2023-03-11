import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const AddWebiste = ({ drs }) => {
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
        // console.log(currentUserRole)
    }

    const { _id, name, email, status } = drs;

    const [userWebsite, setUserWebsite] = useState("Default");
    // console.log(userWebsite)

    const submitWebsite = () => {
        // console.log(userWebsite);
        addDoctorWebiste(_id,userWebsite);
    }

    const addDoctorWebiste = async (id, website) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth,
            },
            body: JSON.stringify({
                website: website
            })
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/addwebsite/${id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    console.log("error")
                    setMessage(data.error)
                } else {
                    console.log("success")
                    setMessage("Status Modifed")
                }
            });
    }


    useEffect(() => {
        getCurrentUserData()
    }, [])

    return (
        <>
            <div>
                {
                    <div>
                    <p>{message}</p>
                
                    <input onChange={(e) => { setUserWebsite(e.target.value) }} type="text" placeholder="Enter webiste url" style={{ outline: "none", border: "1px solid black", padding: "1px 5px" }} />

                <p onClick={submitWebsite} style={{ cursor: "pointer", background: "grey", color: "white", width: "30%" }}>Submit</p>
                    </div>
                    
                }
            </div>
        </>
    )
}


export default AddWebiste;