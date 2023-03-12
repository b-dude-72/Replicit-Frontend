import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlldrsDoneWebsite from '../components/AlldrsDoneWebsite';
import AlldrsForManager from '../components/AlldrsForManager';
import AlldrsForTech from '../components/AlldrsForTech';
import AlldrsForWebsites from '../components/AlldrsForWebsite';
import Sidebar from "../components/Sidebar"


const DoneWebsites = () => {

    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    const [drs, SetDrs] = useState([]);
    const [currUser, setCurrUser] = useState();
    let currentUserRole;


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


    const getAllDocs = () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/donewebsites`, requestOptions)
            .then(response => response.json())
            // .then(data => // console.log(data.doctorsDone));
            .then(data => SetDrs(data.doctorsDone));

    }

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getAllDocs();
        getCurrentUserData();
    }, [])


    return (
        <>
            <Sidebar />
            {/* only allowd to manager tech and admin not to MR */}
            <div className='flex flex-col w-full'>
                <div className='w-full'>
                    <h2 className='text-black text-center bg-slate-300 capitalize font-serif h-10 items-center justify-center flex  '>
                        Done websites
                    </h2>
                    {currUser &&
                        <table className='mx-5 mt-5'>
                            <thead class="bg-white border-2">
                                <tr>
                                    {/* <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Email
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status */}
                                        {/* <span>approved by manager</span> */}
                                    {/* </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Mr ID
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Manager
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Website
                                    </th> */}
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        First Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Middle Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Last Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Phone
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Email
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Qualification
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Specialty
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Expericence
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Preferred Domain
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Address
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        License
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        webiste
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AlldrsDoneWebsite drs={drs} />
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default DoneWebsites

