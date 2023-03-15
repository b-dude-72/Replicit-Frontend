import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashBoardStats from '../components/DashboardStats';
import Dashbordtable from '../components/Dashbordtable';
import Sidebar from '../components/Sidebar';



function checkpassword(){
    let password1 = document.getElementById('password').value;
    let password2 = document.getElementById('cpassword').value;

    let btn1= document.getElementById('createmember')
    if(password1 != password2){
        btn1.innerHTML = `<a className="text-md text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-[] font-bold capitalize border-black cursor-pointer">Check Password</a>`
        btn1.style.opacity = (0.4);
    }else{
        btn1.innerText = "Create Member"
        btn1.style.opacity = (1);

    }

}

const Dashboard = () => {
    let navigate = useNavigate();
    let localAuth = localStorage.getItem('auth-token')

    // to store user data
    const [currUser, setCurrUser] = useState();
    const [createNewDoctor, setCreateNewDoctor] = useState(false);
    const [drs, SetDrs] = useState([]);
    const [mydrs, setMyDrs] = useState([]);
    const [notPassword, setNotPassword] = useState();
    const [showForm, setShowForm] = useState(false)
    /*
    show = true -> show your docs
    show = false -> show all docs
   */

    //all rejected doctors pagination
    const [page1, setPage1] = useState(1);
    const [pageCount1, setPageCount1] = useState(0);

    //all your doctors rejected pagination
    const [page2, setPage2] = useState(1);
    const [pageCount2, setPageCount2] = useState(0);

    const [newMember, setNewMember] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
        role: ""
    })

    const [newDoc, setNewDoc] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        phone: "",
        email: "",
        qualification: "",
        specialty: "",
        experience: "",
        license: "",
        domain: "",
        address: ""
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
        fetch(`${process.env.REACT_APP_URL}/api/auth/notapproveddrs?page=${page1}`, requestOptions)
            .then(response => response.json())
            .then(data => SetDrs(data.drs));
    }


    const getAllDocsMr = () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localAuth
            },
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/notapproveddrsmr?page=${page2}`, requestOptions)
            .then(response => response.json())
            .then(data => setMyDrs(data.drs));
    }

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        document.title="Dashboard - Replicit"
        getCurrentUserData();
        getAllDocs();
        getAllDocsMr();
    }, [page1])

    useEffect(() => {
        if (!localAuth) {
            navigate('/login')
        }
        getCurrentUserData();
        getAllDocs();
        getAllDocsMr();
    }, [page2])

    function handlePrevious1() {
        setPage1((p1) => {
            if (p1 === 1) {
                return 1;
            }
            return p1 - 1;
        })
    }

    function handleNext1() {
        setPage1((p1) => {
            // if(p===pageCount){
            if (p1 === Math.ceil(pageCount1)) {
                return p1;
            }
            return p1 + 1;
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

    // // console.log(currUser)
    // // console.log(typeof(currUser))

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
        currentUserManagerID = currUser.user.managerID
        // console.log(currUser.user.firstname + " firstname")
        // console.log(currUser.user.managerID + " managerid")

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
        // // console.log(newDoc);
        setNewDoc({ ...newDoc, [e.target.name]: e.target.value })
    }
    // // console.log(currentUserId)


    const createnewMr = (e) => {
        // console.log("createnewmr")
        e.preventDefault();
        let endpoint = "createmr"
        // // console.log("Form submit Clicked");
        // here we will do  api submit call
        // we are sending name email passwod role and admin id from the body// // console.log(newMember)
        // getting curent manager id

        // here th curent user wil be manager so teh current manager id will be the curent id of user and wil will also send the admin id in the body
        // which be the adminId of current user at manager will have a adin id with it
        let adminID = currentUseradminID;

        // // console.log(newMember)



        submitToDb(adminID, newMember.firstname, newMember.lastname, newMember.email, newMember.password, newMember.role, currentUserId, endpoint)
        setNewMember({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword:"",
            role: ""
        })
        setTimeout(() => {
            setError("")
        }, 5000);
    }


    const submitToDb = (admin, firstname, lastname, email, password, role, manager, endpoint) => {
        // POST request using fetch inside useEffect React hook
        // console.log("Subtodb")
        // console.log(endpoint  + " endpoint")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localAuth}`,
            },
            body: JSON.stringify({
                adminID: admin,
                firstname: firstname,
                lastname: lastname,
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
                    // console.log("Error")
                    // console.log(data.error)
                    // setError(data.error)
                    setError("Check all the fileds")
                    setNewMember({
                        firstname: newMember.firstname,
                        lastname: newMember.lastname,
                        email: newMember.email,
                        password: newMember.password,
                        cpassword:"",
                        role: ""
                    })
                } else {
                    setError("Created Member")
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
        let manager = currUser.user.managerID; // coz we are creating again and tech memeber
        submitToDb(currentUserId, newMember.firstname, newMember.lastname, newMember.email, newMember.password, newMember.role, manager, endpoint)
        // setNewMember({
        //     firstname: "",
        //     email: "",
        //     password: "",
        //     role: "",
        //     lastname: ""
        // }
        setNewMember({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword:"",
            role: ""
        })
        setTimeout(() => {
            setError("")
        }, 5000);
    }




    const createDoctor = (e) => {
        // // console.log("createDoctor")
        e.preventDefault()
        let admin = currentUseradminID;
        let mr = currentUserId;
        let manager = currUser.user.managerID;
        // console.log("current user manager id: " + manager)

        // // console.log(admin + " " + mr + " " + manager + " " + newDoc.name + " " + newDoc.email);
        // // console.log(newDoc)
        submitToDbnewDoc(mr, manager, admin);

    }

    const submitToDbnewDoc = (mr, manager, admin,) => {
        // POST request using fetch inside useEffect React hook

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localAuth}`,
            },
            body: JSON.stringify({
                mrID: mr,
                managerID: currUser.user.managerID,
                adminID: admin,
                firstname: newDoc.firstname,
                middlename: newDoc.middlename,
                lastname: newDoc.lastname,
                phone: newDoc.phone,
                email: newDoc.email,
                qualification: newDoc.qualification,
                specialty: newDoc.specialty,
                experience: newDoc.experience,
                license: newDoc.license,
                domain: newDoc.domain,
                address: newDoc.address,
            })
        };
        fetch(`${process.env.REACT_APP_URL}/api/auth/createdr`, requestOptions)
            .then(response => response.json())
            // .then(data => // console.log(data));
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                    setNewDoc({
                        firstname: newDoc.firstname,
                        middlename: newDoc.middlename,
                        lastname: newDoc.lastname,
                        phone: newDoc.phone,
                        email: newDoc.email,
                        qualification: newDoc.qualification,
                        speciality: newDoc.specialty,
                        experience: newDoc.experience,
                        license: newDoc.license,
                        domain: newDoc.domain,
                        address: newDoc.address,
                        role: newDoc.role
                    })
                } else {
                    setError("Doc Created")

                }
            });
        // Here the auth token returnd by the seevr wil no use coz 
        // we wil give tech or manager their user name and password not auth token
        setNewDoc({
            firstname: "",
            middlename: "",
            lastname: "",
            phone: "",
            email: "",
            qualification: "",
            speciality: "",
            experience: "",
            license: "",
            domain: "",
            address: ""
        })
        setTimeout(() => {
            setError("")
        }, 5000);

    }


    if (currUser) {
        currentUserRole = currUser.user.role;
        // console.log("currsent user role: " + currentUserRole)
        // console.log("current user manager id: " + currUser.user.managerID)
        currentUserId = currUser.user._id
        currentUseradminID = currUser.user.adminID
        currentUserManagerID = currUser.user.managerID
    }
    // // console.log(currentUseradminID)
    // console.log(currUser)
    // // console.log("new member "  +  newMember.name)

    const [show, setShow] = useState(false);
    /*
    show = false -> show all docs
    show = true -> show my docs
    */



    // console.log(currUser)
    return (
        <>
            <Sidebar />
            <div className="flex flex-col w-full">

                <section className="header_dashboard bg-[#4FBAE7] h-12 w-full px-2 flex border-b border-b-black">
                    <div className="flex flex-row items-center h-full justify-between w-full font-sans text-xl text-black ">
                        <div className="username" class="mb-1">
                            {currUser && <p className='uppercase text-sm font-bold '>User : <span className=' font-bold text-sm text-[#00171F] hover:underline  uppercase'>{currUser.user.firstname}</span></p>}
                        </div>
                        <div className="userrole">
                            {currUser && <p className='uppercase text-sm font-bold '>Role : <span className='font-bold text-sm text-[#00171F] hover:underline  uppercase'>{role_mapping(currUser.user.role)}</span></p>}
                        </div>
                        {(currentUserRole == 3 || currentUserRole == 2) &&
                            <div class="mb-1">
                                <div className="actionbutton">
                                    <a className='text-sm text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer '
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
                        }
                        {currentUserRole == 0 &&
                            <div>
                                <div className="actionbutton">
                                    <a className='text-sm text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer'
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
                        }
                        {currentUserRole == 1 &&
                            <div>
                                <div className="actionbutton">
                                    <a className='text-sm text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer'
                                    >create</a>
                                </div>
                            </div>

                        }

                    </div>
                </section>

                {/* This is to show message */}
                {error && <section className='bg-red-300 font-bold  h-7 flex flex-row justify-center'>
                    {error}
                </section>
                }

                {/* This is for if current use is admin or he is manager no form for tech*/}
                {/* {(currentUserRole == 3 || currentUserRole == 2) && showForm && <div>
                    <div className="flex flex-col content-center justify-center">
                        <section id='form' className='justify-center flex w-full items-center mt-20'>
                            <div className="form_container">
                                <div className="w-full py-16 px-12 border-3 border-black bg-gray-100">
                                    <h2 className="text-3xl mb-4">Create Member</h2>

                                    <form action="#">
                                        <div className="grid grid-cols-2 gap-5">
                                            <input type="text" placeholder="Name" className="outline-none border border-gray-400 py-1 px-2" name='name' onChange={handleOnChange} />
                                            <input type="text" placeholder="Email" name='email' onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-5 mt-6">
                                            <input type="text" name='password' onChange={handleOnChange} placeholder="Password" className="outline-none border border-gray-400 py-1 px-2 w-full" />
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
                                        <div className="mt-5">
                                            {currentUserRole == 3 ? <a onClick={createnewMemeber} className="cursor-pointer w-1/3 align-baseline content-center bg-purple-800 px-2 py-3 text-center text-white">
                                                Create Member</a> :
                                                <a onClick={createnewMr} className="cursor-pointer w-1/3 align-baseline content-center bg-purple-800 px-2 py-3 text-center text-white">
                                                    Create Mr</a>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section >
                    </div>
                </div>} */}
                {
                    (currentUserRole == 3 || currentUserRole == 2) && showForm &&

                    <div class="w-100 bg-[#4fbae7]">
                        <div class="max-w-md mx-auto mt-6 w-full">
                            <div class="bg-[#4fbae7] shadow-lg rounded px-14 pt-10 pb-8 mb-2 ">
                                <h2 class="text-2xl font-bold mb-4 text-white text-center -mt-4">Member Registration</h2>
                                <div class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4">
                                    <h5 className='text-red-600'>{error}</h5>
                                    <div class="mb-4">
                                        <label class="block font-bold mb-2" for="firstname">
                                            First Name
                                        </label>
                                        <input onChange={handleOnChange}
                                            class="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="firstname" name='firstname' value={newMember.firstname} type="text" placeholder="First Name" />
                                    </div>
                                    <div class="mb-4">
                                        <label class="block font-bold mb-2" for="lastname">
                                            Last Name
                                        </label>
                                        <input name="lastname" onChange={handleOnChange}
                                            class="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastname" type="text" value={newMember.lastname} placeholder="Last Name" />
                                    </div>
                                    <div class="mb-4">
                                        <label class="block font-bold mb-2" for="position">
                                            Position
                                        </label>
                                        {/* <select
                                    class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="position">
                                    <option>Select a Specialty</option>
                                    <option>MR</option>
                                    <option>Manager</option>
                                    <option>Tech</option>
                                </select> */}
                                        {currentUserRole && currentUserRole == 3 ? <div>
                                            <select onChange={handleOnChange} className="outline-none border border-gray-400 py-1 px-2 w-full bg-slate-100" id="role" name="role">
                                                <option value="">Select Member Role</option>
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
                                    <div class="mb-4">
                                        <label class="block font-bold mb-2" for="email">
                                            Email ID
                                        </label>
                                        <input name='email' onChange={handleOnChange}
                                            class="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email" value={newMember.email
                                            } type="email" placeholder="Email ID" />
                                    </div>
                                    <div class="mb-4">
                                        <label class="block font-bold mb-2" for="password">
                                            Password
                                        </label>
                                        <input  name='password' onChange={handleOnChange}
                                            class="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password" value={newMember.password} type="password" placeholder="Password" />
                                    </div>
                                    <div class="mb-4">
                                        <label class="block font-bold mb-2" for="password">
                                            Confirm Password
                                        </label>
                                        <input name='cpassword'  onChange={handleOnChange} onKeyUp={checkpassword}
                                            class="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                                            id="cpassword" value={newMember.cpassword} type="password" placeholder="Confirm Password" />
                                    </div>
                                    <span className='text-red-500 text-sm font-bold'>{notPassword}</span>
                                    {/* <button type="submit"
                                class="text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                                Member</button> */}
                                    <div class="px-9 mt-6 -mb-3">
                                        {currentUserRole == 3 ? <a onClick={createnewMemeber} id="createmember" className="text-md text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-[] font-bold capitalize border-black cursor-pointer">
                                            Create Member</a> :
                                            <a onClick={createnewMr}  id="createmember"  className="text-md text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-[] font-bold capitalize border-black cursor-pointer">
                                                Create MR</a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* To create new doctor */}
                {/* {currentUserRole == 0 && createNewDoctor && <div>
                    <div className="flex flex-col content-center justify-center">
                        <section id='form' className='justify-center flex w-full items-center mt-20'>
                            <div className="form_container">
                                <div className="w-full py-16 px-12 border-3 border-black bg-gray-100">
                                    <h2 className="text-3xl mb-4">Create New Doctor</h2>

                                    <form action="#">
                                        <div className="grid grid-cols-2 gap-5">
                                            <input type="text" placeholder="Name" className="outline-none border border-gray-400 py-1 px-2" name='name'  name= "" onChange={handleOnChangenewDoc} />
                                            <input type="text" placeholder="Email" name='email'  name= "" onChange={handleOnChangenewDoc} className="outline-none border border-gray-400 py-1 px-2" />
                                        </div> */}

                {/* <div className="grid grid-cols-2 gap-5 mt-6"> */}
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

                {/* </div>
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
                </div>} */}

                {currentUserRole == 0 && createNewDoctor &&
                    <div class="w-full bg-[#4fbae7]">
                        <div class="flex justify-center bg-gray-100">
                            <div class="w-50 p-6 bg-[#4fbae7] rounded-md shadow-lg my-4">
                                <h2 class="text-2xl font-bold mb-4 text-center text-white font-serif">Doctor Registration</h2>
                                <div class="flex justify-center">
                                    <div class="max-w-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 pr-10 pl-10">
                                        <h2 class="text-xl font-bold mb-4">Contact Details</h2>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="firstname">
                                                First Name
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="firstname" type="text" name="firstname" onChange={handleOnChangenewDoc} placeholder="First Name" value={newDoc.firstname} />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="middlename">
                                                Middle Name
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="middlename" type="text" name="middlename" onChange={handleOnChangenewDoc} value={newDoc.middlename} placeholder="Middle Name" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="lastname">
                                                Last Name
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="lastname" type="text" name="lastname" onChange={handleOnChangenewDoc} value={newDoc.lastname} placeholder="Last Name" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="email">
                                                Email
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="email" type="email" name="email" onChange={handleOnChangenewDoc} value={newDoc.email} placeholder="Email" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="phoneno">
                                                Phone Number
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="phoneno" name="phone" onChange={handleOnChangenewDoc} value={newDoc.phone} type="number" placeholder="Phone Number" />
                                        </div>
                                        {/* <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="profilephoto">Upload Profile
                                            Picture</label>
                                        <input
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="profilephoto" type="file" />
                                    </div> */}
                                    </div>
                                    <div class="max-w-screen mx-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <h2 class="text-xl font-bold mb-4 ">Career Details </h2>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="qualification">
                                                Qualification
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded py-2 pr-32 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="qualification" name="qualification" onChange={handleOnChangenewDoc} value={newDoc.qualification} type="text" placeholder="Qualificaiton" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="specialty">
                                                Specialty
                                            </label>
                                            <select value={newMember.specialty} name="specialty" onChange={handleOnChangenewDoc}
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="specialty">
                                                <option value="" >Select a Specialty</option>
                                                <option value="cardiology" >Cardiology</option>
                                                <option value="dermatology" >Dermatology</option>
                                                <option value="endocrinology" >Endocrinology</option>
                                                <option value="gastroenterology" >Gastroenterology</option>
                                                <option value="hematology" >Hematology</option>
                                            </select>
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="experience">
                                                Experience
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="experience" name="experience" onChange={handleOnChangenewDoc} value={newDoc.experience} type="number" placeholder="Years of Experience" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="license-number">
                                                License Number
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="license-number" name="license" onChange={handleOnChangenewDoc} value={newDoc.license} type="text" placeholder="License Number" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="address">
                                                Address
                                            </label>
                                            <textarea
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="address" name="address" onChange={handleOnChangenewDoc} value={newDoc.address} placeholder="Address"></textarea>
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 font-bold mb-2" for="license-number">
                                                Preffered Domain
                                            </label>
                                            <input
                                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
                                                id="license-number" type="text" placeholder="Preferred Domain" name="domain" onChange={handleOnChangenewDoc} value={newDoc.domain} />
                                        </div>
                                        <div class="mx-24">
                                            <button onClick={createDoctor} type="submit"
                                                class="text-md text-white px-7 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-[] font-bold capitalize border-black cursor-pointer">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Dashboard section start */}
                <DashBoardStats/>
                

                <section className='flex flex-row w-full justify-around bg-slate-200'>
                    <p className={`text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3`}
                        style={{
                            display: currentUserRole > 0 ? "none" : "block",
                        }}
                        onClick={() => { setShow(true) }} >Your Doctors</p>
                    <p className='text-sm text-white px-4 py-2 border-red bg-purple-700 hover:bg-purple-600 border-1 rounded-xl font-bold uppercase border-black cursor-pointer mb-3' onClick={() => { setShow(false) }} >All Doctors</p>
                </section>
                {/* table */}
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                {show == true &&
                                    <div>
                                        <div class="text-center text-xl mb-2">
                                            <span class="font-bold"> List of All Your Rejected Doctors</span>
                                        </div>
                                        <table class="min-w-full">
                                            <thead class="bg-white border-b">
                                                <tr>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Firstname
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        MiddleName
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Lastname
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Email
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Phone
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
                                                <Dashbordtable drs={mydrs} />
                                            </tbody>
                                        </table>
                                        <div className="page_control flex py-2 w-full bg-[#4fbae7] flex-row justify-around">
                                            <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{ cursor: page2 == 1 ? "text" : "pointer" }} disabled={page2 === 1} onClick={handlePrevious2}>Previous</button>
                                            <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black' style={{ cursor: page2 == pageCount2 ? "pointer" : "text" }} disabled={page2 === pageCount2} onClick={handleNext2}>Next</button>
                                        </div>
                                    </div>
                                }
                                {show == false &&
                                    <div>
                                        <div class="text-center text-xl mb-2">
                                            <span class="font-bold "> List of All Rejected Doctors</span>
                                        </div>
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
                                        <div className="page_control flex py-2 w-full bg-[#4FBAE7] flex-row justify-around rounded-lg">
                                            <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page1 == 1} onClick={handlePrevious1}>Previous</button>
                                            <button className='text-sm text-white px-7 hover:bg-blue-700 py-2 border-red bg-blue-800 border-1 rounded-xl font-bold uppercase border-black cursor-pointer' disabled={page1 == pageCount1} onClick={handleNext1}>Next</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
