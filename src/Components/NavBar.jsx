import React, { useContext } from 'react'
import {
  Navbar as HerouiNavBar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/authContext';

export default function NavBar() {

const navigate =useNavigate()
const {isLoading, userToken , userData,setUserToken}=useContext(authContext) 


function logout(){
  localStorage.removeItem("token")
  setUserToken(null)
  navigate("/signin")
}


  return (
    <HerouiNavBar>
      <NavbarBrand>  
        <Link to={"/"}> <p className="font-bold text-inherit">LINKOO </p></Link>
      </NavbarBrand>

     {!isLoading && <NavbarContent as="div" justify="end">
      {userToken ?
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={userData?.name}
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">

            <DropdownItem key="profile">
             <Link  className="h-14" to="/profile">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userData?.email}</p>
             </Link>
            </DropdownItem>
            
            <DropdownItem key="logout" color="danger"onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <></>}
      </NavbarContent>}
    </HerouiNavBar>
  )
}
