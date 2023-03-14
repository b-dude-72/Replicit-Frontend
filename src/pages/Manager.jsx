import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import AlldrsForManager from '../components/AlldrsForManager';
import AllMrsOfManager from '../components/AllMrsOfManager';


const Manager = () => {

    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    const [drs, SetDrs] = useState([]);
    const [mr, Setmr] = useState([]);
    const [currUser, setCurrUser] = useState();
    let currentUserRole;

    const [page, setPage] = useState(1);
    const [page2, setPage2] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageCount2, setPageCount2] = useState(0);

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
        fetch(`${process.env.REACT_APP_URL}/api/auth/getnewdrs?page=${page2}`, requestOptions)
            .then(response => response.json())
            .then(data => 
                {
                    SetDrs(data.drs);
                    setPageCount2(data.pagination.pageCount)
                }
                );
    }

    const getAllManagers = () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/getmanagermr?page=${page}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                Setmr(data.items)
                setPageCount(data.pagination.pageCount)
            });
    }


    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        document.title="Manager - Replicit"
        getAllDocs();
        getCurrentUserData();
    }, [])

    useEffect(()=>{
        getAllManagers();
        getAllDocs();
    },[page,page2])

    function handlePrevious() {
        setPage((p) => {
            if (p === 1) {
                return 1;
            }
            return p - 1;
        })
    }

    function handleNext() {
        setPage((p) => {
            // if(p===pageCount){
            if (p === Math.ceil(pageCount)) {
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

    // // console.log(drs)
    // console.log(currUser)
    if (currUser) {
        currentUserRole = currUser.user.role;
        console.log(currUser.user._id)
        if ((currentUserRole == 1 || currentUserRole == 3 || currentUserRole == 0)) {
            navigate('/')
        }
    }
    // console.log(currentUserRole)
    const [showMr, setShowMr] = useState(false);
    const [showDr, setShowDr] = useState(true);





    return (
        <>
            <Sidebar />




            {/* only allowd to manager tech and admin not to MR */}
            <div className='flex flex-col w-full'>
                <div className='w-full'>



            


                    <h2 className='text-black text-center text-xl bg-slate-200 capitalize font-serif h-10 items-center justify-center flex  '>
                        All the requests for manager are here
                    </h2>
                    <section className='flex flex-row bg-white w-full justify-around'>
                        <p className='mt-3 text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={() => {
                            setShowDr(true)
                            setShowMr(false)
                        }} >Doctors for Approval</p>
                        <p style={{
                            display: currentUserRole == 2 ? "block" : "none"
                        }} className='mt-3 text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={() => {
                            setShowDr(false)
                            setShowMr(true)
                        }} >My Mr's</p>

                    </section>
                    {currUser && showDr &&
                    <div className="">

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
                                <AlldrsForManager drs={drs} />
                            </tbody>
                        </table>
                        <div className="page_control flex py-2 w-full bg-[#4fbae7] flex-row justify-around rounded-xl">
                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' onClick={handlePrevious2}>Previous</button>
                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' onClick={handleNext2}>Next</button>
                            </div>
                        
                    </div>
                    }
                    {
                        currUser && showMr && <div>
                            <table className='mx-5 mt-5'>
                                <thead class="bg-white border-2">
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
                                    <AllMrsOfManager mrs={mr} />
                                </tbody>
                            </table>
                            {/* Count is {page}
                            PageCount is {pageCount} */}
                            <div className="page_control flex py-2 w-full bg-[#4fbae7] flex-row justify-around rounded-xl">
                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' onClick={handlePrevious}>Previous</button>
                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;