import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import AlldrsForManager from '../components/AlldrsForManager';
import AlldrsForTech from '../components/AlldrsForTech';

const Tech = () => {

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
        fetch(`${process.env.REACT_APP_URL}/api/auth/approveddrs`, requestOptions)
            .then(response => response.json())
            // .then(data => // console.log(data.doctorsApproved));
            .then(data => SetDrs(data.items));

    }


    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getAllDocs();
        getCurrentUserData();

        

    }, [])


    console.log("length " + (drs.length))

    // // console.log(drs)
    // // console.log(currUser)
    if (currUser) {
        currentUserRole = currUser.user.role;
        // // console.log(currentUserRole)
        if ((currentUserRole == 2 || currentUserRole == 3 || currentUserRole == 0)) {
            navigate('/')
        }
    }   

    // console.log(drs)

    return (
        <>
            <Sidebar />
            {/* only allowd to manager tech and admin not to MR */}
            <div className='flex flex-col w-full'>
                <div className='w-full'>
                    <h2 className='text-black text-center bg-slate-300 capitalize font-serif h-10 items-center justify-center flex  '>
                        All the requests for Tech here
                    </h2>

                    {
                        drs.length == 0 && <div className="">
                            No aproved drs
                        </div>

                    }
                    {currUser && drs.length != 0 && 
                        <table className='mx-5 mt-5'>
                            <thead class="bg-white border-2">
                                <tr>
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
                                        Reject Message
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Approve
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AlldrsForTech drs={drs} />
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Tech;


