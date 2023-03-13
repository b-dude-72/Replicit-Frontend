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
        // Pagination
        fetch(`${process.env.REACT_APP_URL}/api/auth/getdrs?page=7`, requestOptions)
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
                    <h2 className='text-black text-center text-xl bg-slate-200 capitalize font-serif h-10 items-center justify-center flex py-3  '>
                        Admin Page
                    </h2>
                    {currUser && currentUserRole == 3 ? <div>
                        <div className="bg-white px-2 flex flex-row justify-around items-center">
                            <div className="text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mt-2" onClick={() => { setToShow(false) }}>
                                Members
                            </div>
                            <div className="text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mt-2" onClick={() => { setToShow(true); }}>
                                Doctors
                            </div>
                        </div>

                        {/* table */}
                        {toShow ? <div class="flex flex-col">
                            <div class="text-center text-xl mb-2 mt-2">
                                <span class="font-bold"> List of All Doctors</span>
                            </div>
                            <div class="overflow-x">
                                <div class="py-2 inline-block min-w-full">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full">
                                            <thead class="bg-white border-b">
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
                                <div class="text-center text-xl mb-2 mt-2">
                                <span class="font-bold"> List of All Members</span>
                            </div>
                                <div class="overflow-x">
                                    <div class="py-2 inline-block min-w-full">
                                        <div class="overflow-hidden">
                                            <table class="min-w-full">
                                                <thead class="bg-white border-b">
                                                    <tr>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            ID
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            First Name
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Last Name
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Email
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Manager ID
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Admin ID
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
                    </div> : <p>Not allowd</p>}
                </div>
            </div>
        </div>
    );
};

export default Admin;