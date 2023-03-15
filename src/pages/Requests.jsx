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
        //all your doctors rejected pagination
        const [page2, setPage2] = useState(1);
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
        fetch(`${process.env.REACT_APP_URL}/api/auth/getdrmr?page=${page2}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setMyDrs(data.items);
                setPageCount2(data.pagination.pageCount)
            }
            );
    }

    // console.log(alldrs)
    // console.log(pageCount + " pageCount")

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        document.title = "Requests- Replicit"
        getCurrentUserData();
    }, [page])
    
    useEffect(()=>{
        getAllDocs()

    },[page])
    
    useEffect(()=>{
        getMyDocs();

    },[page2])

    let currentUserRole;
    if (currUser) {
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


    // console.log(myDrs)

    return (
        <>

            <Sidebar />
            <div className="">

                <div className='flex flex-col w-full'>
                    <div className='w-full'>
                        <section className='flex flex-row w-full justify-around mt-3'>
                            <p className='text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={()=>{setShow(false)}} style={{display:(currentUserRole==1 || currentUserRole==2 || currentUserRole==3)?"none":"block"}} >All Requests</p>
                            <p
                            style={{
                                display: currentUserRole > 0 ? "none" : "block",
                            }} 
                            className='text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={()=>{setShow(true)}} >Your Requests</p>
                        </section>

                        {show == false &&

                            <div style={{ overflowX: "scroll", overflowY: "scroll" }} class="h-[37.5em] max-w-[72em]">
                                <div class="text-center text-xl ">
                                    <span class="font-bold "> List Of All Requests</span>
                                </div>
                                <table className='mt-5 min-w-full'>
                                    <thead class="bg-white border-2">
                                        <tr class="">
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                First Name
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left ">
                                                Middle Name
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left ">
                                                Last Name
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left ">
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
                                <div className="page_control flex py-2 w-[1000px] bg-[#4fbae7] flex-row justify-around ml-44 rounded-xl ">
                        <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{ cursor: page == 1 ? "text" : "pointer" }} disabled={page === 1} onClick={handlePrevious}>Previous</button>
                        <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{ cursor: page == pageCount ? "text" : "pointer" }} disabled={page === pageCount} onClick={handleNext}>Next</button>
                        {/* <b>pagge: {page}</b>
                <b>page count: {pageCount}</b> */}
                    </div>
                                
                            </div>
                        }
                        {show == true && 
                            <div style={{ overflowX: "scroll", overflowY: "scroll" }}>
                                <div class="text-center text-xl ">
                                    <span class="font-bold ">List Of Your Requests</span>
                                </div>
                                <table className='mx-5 mt-5 min-w-full' >
                                    <thead class="bg-white border-2">
                                        <tr class="">
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
                                <div className="page_control flex py-2 w-[1000px] bg-[#4fbae7] flex-row justify-around ml-44 rounded-xl ">
                        <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{ cursor: page == 1 ? "text" : "pointer" }} disabled={page2 === 1} onClick={handlePrevious2}>Previous</button>
                        <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{ cursor: page2 == pageCount2 ? "text" : "pointer" }} disabled={page2 === pageCount2} onClick={handleNext2}>Next</button>
                        {/* <b>pagge: {page}</b>
                <b>page count: {pageCount}</b> */}
                    </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Requests;