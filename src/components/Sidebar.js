import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


const Sidebar = ({ children }) => {

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/allrequests",
            name: "Requests",
            icon: <FaUserAlt />
        },
        {
            path: "/manager",
            name: "Manager",
            icon: <FaRegChartBar />
        },
        {
            path: "/tech",
            name: "Tech",
            icon: <FaCommentAlt />
        },
        {
            path: "/admin",
            name: "Admin",
            icon: <FaShoppingBag />
        },
        {
            path: "/websites",
            name: "Websites",
            icon: <FaThList />
        },
        {
            path: "/donewebsites",
            name: "Done Websites",
            icon: <FaThList />
        },
    ]


    const navigate = useNavigate();
    const userLogOut = () => {
        localStorage.clear('auth-token');
        navigate('/login', { replace: true });
    }

    return (
        <div className="flex">
            <div className=" bg-[#4fbae7] text-white h-full p-2 border-solid border-r-2 border-black w-[240px]">
                <div class="flex justify-center mt-[-25px] -mb-[10px]">
                    <img class="w-36 h-16 mt-2" src="/Fulllogo.png" alt="" />
                </div>
                <div className="">

                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="flex text-white px-3 py-1 gap-1 my-3 transition-all hover:bg-blue-300 hover:text-black hover:rounded-md" >
                            <div className="mx-2 mt-1">{item.icon}</div>
                            <div className="text-xl">{item.name}</div>
                        </NavLink>
                    ))
                }
                </div>
                <div className=' text-sm text-white px-7 hover:bg-red-600 py-2 mr-2 text-center border-red bg-red-700 border-1 rounded-xl font-bold uppercase border-black cursor-pointer'>
                    <p className='cursor-pointer hover:font-bold hover:text-gray-300 ease-in duration-100' title='Log out' onClick={userLogOut}>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;