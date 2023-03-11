import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import AlldrsForManager from '../components/AlldrsForManager';

const Manager = () => {

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
        fetch(`${process.env.REACT_APP_URL}/api/auth/getnewdrs`, requestOptions)
            .then(response => response.json())
            .then(data => SetDrs(data.drs));
    }


    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getAllDocs();
        getCurrentUserData();
    }, [])



    // console.log(drs)
    // console.log(currUser)
    if (currUser) {
        currentUserRole = currUser.user.role;

    }

    return (
        <>
            <Sidebar />
            {/* only allowd to manager tech and admin not to MR */}
            <div className='flex flex-col w-full'>
                <div className='w-full'>
                    <h2 className='text-black text-center bg-slate-300 capitalize font-serif h-10 items-center justify-center flex '>
                        All the requests for manager here
                    </h2>
                    {currUser && currentUserRole == 2 ||  currentUserRole == 3 ?
                        <table className='mx-5 mt-5'>
                            <thead class="bg-white border-2">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Email
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Reject message
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AlldrsForManager drs={drs} />
                            </tbody>
                        </table>
                        :
                        <div>
                            <h3>Not Allowed</h3>
                        </div>

                        
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;