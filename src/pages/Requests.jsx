import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alldrs from '../components/Alldrs';
import Sidebar from '../components/Sidebar';

const Requests = () => {
    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    const [alldrs, setAllDrs] = useState([]);
    const [myDrs, setMyDrs] = useState([]);
    const [show, setShow] = useState(false);
    /*
    show = false -> show all docs
    show = true -> show my docs
    */
    const [currUser, setCurrUser] = useState();
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


    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);


    const getAllDocs = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/getdrs?page=${page}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setAllDrs(data.items);
                setPageCount(data.pagination.pageCount);
            }
            );
    }

    const getMyDocs = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/getdrmr`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setMyDrs(data.items);
            }
            );
    }

    // console.log(alldrs)
    // console.log(pageCount + " pageCount")

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getAllDocs()
        getMyDocs();
        getCurrentUserData();
    }, [page])

    let currentUserRole;
    if(currUser){
        currentUserRole = currUser.user.role;
    }

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

    // console.log(myDrs)

    return (
        <>

            <Sidebar />
            <div className="">

                <div className='flex flex-col w-full'>
                    <div className='w-full'>
                        <h2 className='text-black text-center text-xl bg-slate-200 capitalize font-serif h-10 items-center justify-center flex  '>
                            All the requests
                        </h2>
                        <section className='flex flex-row w-full justify-around mt-3'>
                            <p className='text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={()=>{setShow(false)}} >All Requests</p>
                            <p
                            style={{
                                display: currentUserRole > 0 ? "none" : "block",
                            }} 
                            className='text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={()=>{setShow(true)}} >Your Requests</p>
                        </section>
                        {show ==false &&
                        <div>
                            <div class="text-center text-xl ">
                                        <span class="font-bold "> List Of All Requests</span>
                                        </div>
                            <table className='mx-5 mt-5 min-w-full'>
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
                                </tr>
                            </thead>
                            <tbody>
                                <Alldrs drs={alldrs} />
                            </tbody>
                        </table>
                        </div>
                        }
                        {show==true &&
                        <div>
                             <div class="text-center text-xl ">
                                        <span class="font-bold ">List Of Your Requests</span>
                             </div>
                            <table className='mx-5 mt-5 min-w-full' >
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
                                </tr>
                            </thead>
                            <tbody>
                                <Alldrs drs={myDrs} />
                            </tbody>
                        </table>
                        </div>
                        }
                    </div>
                </div>
                {show==false &&

                    <div className="page_control flex py-2 w-full bg-[#4fbae7] flex-row justify-around ml-5 rounded-xl">
                    <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{cursor:page==1?"text":"pointer"}} disabled={page === 1} onClick={handlePrevious}>Previous</button>
                    <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{cursor:page==pageCount?"text":"pointer"}} disabled={page === pageCount} onClick={handleNext}>Next</button>
                    {/* <b>pagge: {page}</b>
                <b>page count: {pageCount}</b> */}
                </div>
                }
            </div>
        </>
    );
};

export default Requests;