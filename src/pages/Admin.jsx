import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import Dashbordtable from '../components/Dashbordtable';
import AdminAllDrs from '../components/AdminAllDrs';
import AdminAllMembers from '../components/AdminAllMembers';

const Admin = () => {

    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    // let toShow  = true
    const [toShow, setToShow] = useState(true);
    // toshow -> True => Doctor
    // toshow -> false => Member

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getAllDocs();
        getAllMembers();
        getCurrentUserData();
    }, [])

    const [drs, SetDrs] = useState([]);
    const [members, SetMembers] = useState([]);
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
        fetch(`${process.env.REACT_APP_URL}/api/auth/getdrs`, requestOptions)
            .then(response => response.json())
            .then(data => SetDrs(data.items));


        setToShow(true);
    }
    const getAllMembers = () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/getmembers`, requestOptions)
            .then(response => response.json())
            .then(data => SetMembers(data.member));
    }


    if (currUser) {
        currentUserRole = currUser.user.role;

    }

    return (
        <div className='flex flex-row'>
            <Sidebar />
            <div>
                {/* Show All users and slow all the form to admin */}
                <div className="w-screen flex h-10 flex-col">
                    <div className="bg-pink-300 w-full px-2 flex flex-col items-center">
                        Adnin page
                    </div>
                    {currUser && currentUserRole == 3 ? <div>
                        <div className="bg-pink-300 px-2 flex flex-row justify-around items-center">
                        <div className="border-2 border-black bg-purple-500 py-1 px-2 text-white cursor-pointer" onClick={() => { setToShow(false) }}>
                            Members
                        </div>
                        <div className="border-2 border-black bg-purple-500 py-1 px-2 text-white cursor-pointer" onClick={() => { setToShow(true); }}>
                            Doctors
                        </div>
                    </div>

                    {/* table */}
                    {toShow ? <div class="flex flex-col">
                        <div className="">All doctors</div>
                        <div class="overflow-x">
                            <div class="py-2 inline-block min-w-full">
                                <div class="overflow-hidden">
                                    <table class="min-w-full">
                                        <thead class="bg-white border-b">
                                            <tr>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Name
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Email
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Status
                                                </th>
                                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Message
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <AdminAllDrs drs={drs} />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> :
                        <div class="flex flex-col">
                            <div className="">All Members</div>
                            <div class="overflow-x">
                                <div class="py-2 inline-block min-w-full">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full">
                                            <thead class="bg-white border-b">
                                                <tr>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Name
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Email
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Role
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Manager
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Admin
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <AdminAllMembers members={members} />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </div>:<p>Not allowd</p>}
                </div>
            </div>
        </div>
    );
};

export default Admin;