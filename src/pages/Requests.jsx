import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alldrs from '../components/Alldrs';
import Sidebar from '../components/Sidebar';

const Requests = () => {
    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')
    const [alldrs, setAllDrs] = useState([]);

    const [page,setPage]= useState(1);
    const [pageCount,setPageCount]= useState(0);


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

    console.log(alldrs)
    console.log(pageCount + " pageCount")

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getAllDocs()
    }, [page])


    function handlePrevious(){
        setPage((p)=>{
            if(p===1){
                return 1;
            }
            return p - 1;
        })
    }

    function handleNext(){
        setPage((p)=>{
            // if(p===pageCount){
            if(p===Math.ceil(pageCount)){
                return p;
            }
            return p + 1;
        })
    }

    return (
        <>

            <Sidebar />
            <div className="">


            <div className='flex flex-col w-full'>
                <div className='w-full'>
                    <h2 className='text-black text-center bg-slate-300 capitalize font-serif h-10 items-center justify-center flex  '>
                        All the requests
                    </h2>
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
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <Alldrs drs={alldrs} />
                        </tbody>
                    </table>
                </div>
            </div>
        <div className="page_control flex py-2 w-full bg-[#4fbae7] flex-row justify-around">
                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page==1} onClick={handlePrevious}>Previous</button>
                <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page == pageCount } onClick={handleNext}>Next</button>
                {/* <b>pagge: {page}</b>
                <b>page count: {pageCount}</b> */}
            </div>      
</div>
        </>
    );
};

export default Requests;