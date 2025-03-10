import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import NavLink from "./NavLink";

const links = [
    { name: "Home", href: "/" },
    { name: "Journal", href: "/journal" },
    { name: "History", href: "/history" },
];

const Sidebar = () => {
    return (
        <Navbar className="flex flex-col grow items-start py-6 px-4 mt-6">
            <div className="flex flex-col gap-8 items-start">
                <NavbarBrand className="mt-8">
                    <span className="text-md">{">_"} mood</span>
                </NavbarBrand>
                <NavbarContent className="flex flex-col gap-4 items-start">
                    {links.map((link) => {
                        return (
                            <div key={link.href}>
                                <NavLink href={link.href}>
                                    <span>{link.name}</span>
                                </NavLink>
                            </div>
                        );
                    })}
                </NavbarContent>
            </div>
        </Navbar>
    );
};

export default Sidebar;
