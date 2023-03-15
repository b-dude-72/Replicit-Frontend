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

    //all your doctors rejected pagination
    const [page1, setPage1] = useState(1);
    const [pageCount1, setPageCount1] = useState(0);
    const [page2, setPage2] = useState(1);
    const [pageCount2, setPageCount2] = useState(0);
    // toshow -> True => Doctor
    // toshow -> false => Member

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        document.title = "Admin - Replicit"
        getAllDocs();
        // getAllMembers();
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
        fetch(`${process.env.REACT_APP_URL}/api/auth/getdrs?page=${page2}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                SetDrs(data.items)  
                setPageCount2(data.pagination.pageCount)
    });


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
        fetch(`${process.env.REACT_APP_URL}/api/auth/getmembers?page=${page1}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                SetMembers(data.member)
                setPageCount1(data.pagination.pageCount)
            }
            );
    }



    function handlePrevious1() {
        setPage1((p) => {
            if (p === 1) {
                return 1;
            }
            return p - 1;
        })
    }

    function handleNext1() {
        setPage1((p) => {
            // if(p===pageCount){
            if (p === Math.ceil(pageCount1)) {
                return p;
            }
            return p + 1;
        })
    }

    function handlePrevious2() {
        setPage2((p) => {
            if (p === 1) {
                return 1;
            }
            return p - 1;
        })
    }

    function handleNext2() {
        setPage2((p) => {
            // if(p===pageCount){
            if (p === Math.ceil(pageCount2)) {
                return p;
            }
            return p + 1;
        })
    }


    useEffect(() => {
        getAllMembers()
    }, [page1])

    useEffect(() => {
        getAllDocs()
    }, [page2])

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
                                        <div className="page_control flex py-2 w-full bg-[#4FBAE7] flex-row justify-around rounded-lg">
                                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page2 == 2} onClick={handlePrevious2}>Previous</button>
                                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page2 == pageCount2} onClick={handleNext2}>Next</button>
                                            </div>
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
                                            {/* page1 {page1} */}
                                            {/* pagecount {pageCount1} */}
                                            <div className="page_control flex py-2 w-full bg-[#4FBAE7] flex-row justify-around rounded-lg">
                                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page1 == 1} onClick={handlePrevious1}>Previous</button>
                                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page1 == pageCount1} onClick={handleNext1}>Next</button>
                                            </div>
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