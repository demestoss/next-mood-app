import { Navbar, NavbarContent } from "@heroui/react";
import NavLink from "./NavLink";

const links = [
	{ name: "Home", href: "/" },
	{ name: "Journal", href: "/journal" },
];

const Sidebar = () => {
	return (
		<Navbar className="flex items-start py-9 px-4 mt-6">
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
		</Navbar>
	);
};

export default Sidebar;
