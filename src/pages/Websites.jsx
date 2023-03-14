import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import AlldrsForManager from '../components/AlldrsForManager';
import AlldrsForTech from '../components/AlldrsForTech';
import AlldrsForWebsites from '../components/AlldrsForWebsite';

const Websites = () => {

    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    const [drs, SetDrs] = useState([]);
    const [currUser, setCurrUser] = useState();
    let currentUserRole;
    const [page1, setPage1] = useState(1);
    const [pageCount1, setPageCount1] = useState(0);

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
        fetch(`${process.env.REACT_APP_URL}/api/auth/verifieddrs?page=${page1}`, requestOptions)
            .then(response => response.json())
            // .then(data => // console.log(data.doctorsApproved));
            .then(data =>
                {
                    SetDrs(data.doctorsApproved);
                    setPageCount1(data.pagination.pageCount)
                } 
                );

    }


    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        document.title = "Websites - Replicit"
        getCurrentUserData();
    }, [])
    
    useEffect(()=>{
        getAllDocs();

    },[page1])


    // // console.log(drs)
    // // console.log(currUser)
    if (currUser) {
        currentUserRole = currUser.user.role;
        if(!( currentUserRole != 1|| currentUserRole != 3)){
            navigate("/")

        }
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

    function handlePrevious1() {
        setPage1((p) => {
            if (p === 1) {
                return 1;
            }
            return p - 1;
        })
    }

    return (
        <>
            <Sidebar />
            {/* only allowd to manager tech and admin not to MR */}
            <div className='flex flex-col w-full'>
                <div className='w-full'>
                    <h2 className='text-black text-center text-xl bg-slate-200 capitalize font-serif h-10 items-center justify-center flex '>
                        All the request for Tech are here
                    </h2>
                    {currUser && <div>
                        <table className='mx-5 mt-5'>
                            <thead class="bg-white border-2">
                                <tr>
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
                                        Phone
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                        {/* <span>approved by manager</span> */}
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Website URL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AlldrsForWebsites drs={drs} />
                            </tbody>
                        </table>
                        <div className="page_control flex py-2 w-[800px] ml-20 bg-[#4FBAE7] flex-row justify-around rounded-lg">
                                {/* page1: {page1} */}
                                {/* pagecount: {pageCount1} */}
                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page1 == 1} onClick={handlePrevious1}>Previous</button>
                                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page1 == pageCount1} onClick={handleNext1}>Next</button>
                            </div>
                    </div>
                    

                    }
                </div>
            </div>
        </>
    );
};

export default Websites;



