import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashbordtable from '../components/Dashbordtable';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')

    // to store user data
    const [currUser, setCurrUser] = useState();
    const [createNewDoctor, setCreateNewDoctor] = useState(false);
    const [drs, SetDrs] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [newMember, setNewMember] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })
    const [newDoc, setNewDoc] = useState({
        name: "",
        email: ""
    })
    const [error, setError] = useState();
    let currentUserId;
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
        fetch(`${process.env.REACT_APP_URL}/api/auth/notapproveddrs`, requestOptions)
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



    // // console.log(currUser)
    // // console.log(typeof(currUser))
    // // console.log(currUser.user.name)
    // 3 -> admin
    // 2 -> manager
    // 1 -> tech 
    // 0 -> mr
    let currentUserRole;
    let currentUseradminID;
    let currentUserManagerID;
    const role_mapping = (role) => {
        // // console.log(role)
        const roles = {
            0: 'mr',
            1: 'Tech',
            2: 'Manager',
            3: 'Admin',
        }

        return roles[role]
    }


    // // console.log(drs)
    // // console.log(currUser)
    if (currUser) {
        currentUserRole = currUser.user.role;
        
    }




    // // console.log(currUser.user)
    const handleOnChange = (e) => {
        // // console.log("clicked handleOnChange");
        // // console.log(userData);
        setNewMember({ ...newMember, [e.target.name]: e.target.value })
    }
    const handleOnChangenewDoc = (e) => {
        // // console.log("clicked handleOnChange");
        // // console.log(userData);
        setNewDoc({ ...newDoc, [e.target.name]: e.target.value })
    }
    // // console.log(currentUserId)


    const submitToDb = (admin, name, email, password, role, manager, endpoint) => {
        // POST request using fetch inside useEffect React hook

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localAuth}`,
            },
            body: JSON.stringify({
                adminID: admin,
                name: name,
                email: email,
                password: password,
                role: role,
                managerID: manager
            })
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/${endpoint}`, requestOptions)
            .then(response => response.json())
            // .then(data => // console.log(data));
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError("User Created")
                    setNewMember({
                        name: "",
                        email: "",
                        password: "",
                        role: ""
                    })
                }
            });
        // Here the auth token returnd by the seevr wil no use coz 
        // we wil give tech or manager their user name and password not auth token

    }

    const createnewMemeber = (e) => {
        e.preventDefault();
        let endpoint = "createmember" // to create mr
        // // console.log("Form submit Clicked");
        // here we will do  api submit call
        // // console.log(newMember)
        let manager = "currentadmin"; // coz we are creating again and tech memeber
        submitToDb(currentUserId, newMember.name, newMember.email, newMember.password, newMember.role, manager, endpoint)
        setNewMember({
            name: "",
            email: "",
            password: "",
            role: ""
        })
        setTimeout(() => {
            setError("")
        }, 4000);
    }

    const createnewMr = (e) => {
        e.preventDefault();
        let endpoint = "createmr"
        // // console.log("Form submit Clicked");
        // here we will do  api submit call
        // we are sending name email passwod role and admin id from the body// // console.log(newMember)
        // getting curent manager id

        // here th curent user wil be manager so teh current manager id will be the curent id of user and wil will also send the admin id in the body
        // which be the adminId of current user at manager will have a adin id with it
        let adminID = currentUseradminID;

        submitToDb(adminID, newMember.name, newMember.email, newMember.password, newMember.role, currentUserId, endpoint)


    }

    const submitToDbnewDoc = (mr, manager, admin, name, email) => {
        // POST request using fetch inside useEffect React hook

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localAuth}`,
            },
            body: JSON.stringify({
                mrID: mr,
                manager: manager,
                adminID: admin,
                name: name,
                email: email,
            })
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/createdr`, requestOptions)
            .then(response => response.json())
            // .then(data => // console.log(data));
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError("Doc Created")

                }
            });
        // Here the auth token returnd by the seevr wil no use coz 
        // we wil give tech or manager their user name and password not auth token
        setNewMember({
            name: "",
            email: "",
            password: "",
            role: ""
        })
        setTimeout(() => {
            setError("")
        }, 4000);

    }

    const createDoctor = () => {
        // console.log("createDoctor")
        let admin = currentUseradminID;
        let mr = currentUserId;
        let manager = currentUserManagerID;

        // console.log(admin + " " + mr + " " + manager + " " + newDoc.name + " " + newDoc.email);

        submitToDbnewDoc(mr, manager, admin, newDoc.name, newDoc.email);

    }


    if (currUser) {
        currentUserRole = currUser.user.role;
        currentUserId = currUser.user._id
        currentUseradminID = currUser.user.adminID
        currentUserManagerID = currUser.user.managerID
    }
    // // console.log(currentUseradminID)
    // console.log(currUser)
    // // console.log("new member "  +  newMember.name)
    return (
        <>
            <Sidebar />
            <div className="flex flex-col w-full">

                <section className="header_dashboard bg-[#4fbae7] h-12 w-full px-2 flex">
                    <div className="flex flex-row items-center h-full justify-between w-full font-sans text-xl text-black  ">
                    <div className="username ">
                            {currUser && <p className='text-xs '><span className='font-bold text-base text-grey-700  text-black mr-1'>User:</span><span className='hover:underline capitalize text-base font-serif text-white'>{currUser.user.name}</span></p>}
                        </div>
                        <div className="userrole">
                            {currUser && <p className='text-xs'><span className='font-bold text-base text-grey-700  text-black mr-1'>Role:</span> <span className='hover:underline uppercase text-base text-grey-700 font-serif text-white'>{role_mapping(currUser.user.role)}</span></p>}
                        </div>
                        {currentUserRole == 3 || currentUserRole == 2 ?
                            <div>
                                <div className="actionbutton">
                                    <a className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer'
                                        onClick={() => {
                                            if (showForm) {
                                                setShowForm(false)
                                            } else {
                                                setShowForm(true);
                                            }
                                        }
                                        }
                                    >create</a>
                                </div>
                            </div>
                            :
                            <div>

                            </div>
                        }
                        {currentUserRole == 0 ?
                            <div>
                                <div className="actionbutton">
                                    <a className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer'
                                        onClick={() => {
                                            if (createNewDoctor) {
                                                setCreateNewDoctor(false)
                                            } else {
                                                setCreateNewDoctor(true);
                                            }
                                        }
                                        }
                                    >create</a>
                                </div>
                            </div>
                            :
                            <div>

                            </div>
                        }

                    </div>
                </section>

                {/* This is for if current use is admin or he is manager no form for tech*/}
                {(currentUserRole == 3 || currentUserRole == 2) && showForm && <div>
                    <div className="flex flex-col content-center justify-center">
                        <section id='form' className='justify-center flex w-full items-center mt-20'>
                            <div className="form_container">
                                <div className="w-full py-16 px-12 border-3 border-black bg-gray-100">
                                    <h2 className="text-2xl mb-4">Create Member</h2>

                                    <form action="#">
                                        <div className="grid grid-cols-2 gap-5">
                                            <input type="text" placeholder="Name" className="outline-none border border-gray-400 py-1 px-2" name='name' onChange={handleOnChange} />
                                            <input type="text" placeholder="Email" name='email' onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-5 mt-6">
                                            <input type="password" name='password' onChange={handleOnChange} placeholder="Password" className="outline-none border border-gray-400 py-1 px-2 w-full" />
                                            {currentUserRole && currentUserRole == 3 ? <div>
                                                <select onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2 w-full bg-slate-100" id="role" name="role">
                                                    <option value="1">Tech</option>
                                                    <option value="2" defaultValue>Manager</option>
                                                </select>
                                            </div> : <div>
                                                <select onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2 w-full bg-slate-100" id="role" name="role">
                                                    <option value="0">Choose Role</option>
                                                    <option value="0" >Mr</option>
                                                </select>
                                            </div>
                                            }

                                        </div>
                                        <div className="mt-5">
                                            <h3 className="text-red-700 font-bold text-xl capitalize">
                                                {error}
                                            </h3>
                                        </div>
                                        <div className="mt-7">
                                            {currentUserRole == 3 ? <a onClick={createnewMemeber} className="text-sm text-white px-7 hover:bg-purple-700 py-3  border-red bg-purple-900 border-1 rounded-xl font-bold uppercase border-black cursor-pointer">
                                                Create Member</a> :
                                                <a onClick={createnewMr} className="cursor-pointer w-1/3 align-baseline content-center  bg-purple-800 px-2 py-3 text-center text-white">
                                                    Create Mr</a>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section >
                    </div>
                </div>}
                {/* To create new doctor */}
                {currentUserRole == 0 && createNewDoctor && <div>
                    <div className="flex flex-col content-center justify-center">
                        <section id='form' className='justify-center flex w-full items-center mt-20'>
                            <div className="form_container">
                                <div className="w-full py-16 px-12 border-3 border-black bg-gray-100">
                                    <h2 className="text-3xl mb-4">Create New Doctor</h2>

                                    <form action="#">
                                        <div className="grid grid-cols-2 gap-5">
                                            <input type="text" placeholder="Name" className="outline-none border border-gray-400 py-1 px-2" name='name' onChange={handleOnChangenewDoc} />
                                            <input type="text" placeholder="Email" name='email' onChange={handleOnChangenewDoc} className="outline-none border border-gray-400 py-1 px-2" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-5 mt-6">
                                            {/* {currentUserRole && currentUserRole == 3 ? <div>
                                                <select onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2 w-full bg-slate-100" id="role" name="role">
                                                    <option value="1">Tech</option>
                                                    <option value="2" defaultValue>Manager</option>
                                                </select>
                                            </div> : <div>
                                                <select onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2 w-full bg-slate-100" id="role" name="role">
                                                    <option value="0">Choose Role</option>
                                                    <option value="0" >Mr</option>
                                                </select>
                                            </div>
                                            } */}

                                        </div>
                                        <div className="mt-5">
                                            <h3 className="text-red-700 font-bold text-xl capitalize">
                                                {error}
                                            </h3>
                                        </div>
                                        <div className="mt-5">

                                            <a onClick={createDoctor} className="cursor-pointer w-1/3 align-baseline content-center bg-purple-800 px-2 py-3 text-center text-white">
                                                Create Doctor</a>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section >
                    </div>
                </div>}

                {/* Dashboard section start */}

                <div class="flex items-center  bg-gray-200 text-gray-800">
                    <div class="p-4 w-full">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                                <div class="flex flex-row bg-white shadow-sm rounded p-4">
                                    <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                    <div class="flex flex-col flex-grow ml-4">
                                        <div class="text-sm text-gray-500">Users</div>
                                        <div class="font-bold text-lg">1259</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                                <div class="flex flex-row bg-white shadow-sm rounded p-4">
                                    <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    </div>
                                    <div class="flex flex-col flex-grow ml-4">
                                        <div class="text-sm text-gray-500">Orders</div>
                                        <div class="font-bold text-lg">230</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                                <div class="flex flex-row bg-white shadow-sm rounded p-4">
                                    <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                    </div>
                                    <div class="flex flex-col flex-grow ml-4">
                                        <div class="text-sm text-gray-500">New Clients</div>
                                        <div class="font-bold text-lg">190</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-12 sm:col-span-6 md:col-span-3">
                                <div class="flex flex-row bg-white shadow-sm rounded p-4">
                                    <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div class="flex flex-col flex-grow ml-4">
                                        <div class="text-sm text-gray-500">Revenue</div>
                                        <div class="font-bold text-lg">$ 32k</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* table */}
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
                                        <Dashbordtable drs={drs} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
