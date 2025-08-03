"use client"
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, DarkThemeToggle, Button } from "flowbite-react";
import Link from "next/link";
import useUserStore from "../store/userStore";

export function UserNavbar() {
    const { logout } = useUserStore()
    const logoutButton = async () => {
        await logout()
    }
    return (
        <Navbar fluid rounded className="p-2 bg-stone-50 shadow-xl">
            <NavbarBrand as={Link} href="/">
                <svg className="w-18 h-18 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4 5.78571C4 4.80909 4.78639 4 5.77778 4H18.2222C19.2136 4 20 4.80909 20 5.78571V15H4V5.78571ZM12 12c0-.5523.4477-1 1-1h2c.5523 0 1 .4477 1 1s-.4477 1-1 1h-2c-.5523 0-1-.4477-1-1ZM8.27586 6.31035c.38089-.39993 1.01387-.41537 1.4138-.03449l2.62504 2.5c.1981.18875.3103.45047.3103.72414 0 .27368-.1122.5354-.3103.7241l-2.62504 2.5c-.39993.3809-1.03291.3655-1.4138-.0344-.38088-.4-.36544-1.033.03449-1.4138L10.175 9.5 8.31035 7.72414c-.39993-.38089-.41537-1.01386-.03449-1.41379Z" clipRule="evenodd" />
                    <path d="M2 17v1c0 1.1046.89543 2 2 2h16c1.1046 0 2-.8954 2-2v-1H2Z" />
                </svg>
                <span className="text-3xl font-extrabold dark:text-white">TaskMD</span>
            </NavbarBrand>
            <NavbarToggle aria-hidden="true" />
            <NavbarCollapse aria-hidden="true" className="text-2xl items-center">
                <NavbarLink href="/instructions">
                    Instructions
                </NavbarLink>
                <NavbarLink>
                    <Button color="red" onClick={logoutButton} className="text-xl justify-center flex items-center">Logout</Button>
                </NavbarLink>
                <DarkThemeToggle className="text-xl justify-center flex items-center" />
            </NavbarCollapse>
        </Navbar>
    );
}
