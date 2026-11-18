import type { ReactNode } from "react";
import { NavLink } from "react-router";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import "./Sidebar.css";

interface NavItem {
    label: string;
    icon: ReactNode;
    to: string;
}

interface NavSection {
    label: string;
    items: NavItem[];
}

interface SidebarProps {
    isOpen: boolean;
}

const navSections: NavSection[] = [
    {
        label: "Administración",
        items: [
            { label: "Usuarios", icon: <GroupsOutlinedIcon />, to: "/dashboard/usuarios" },
            { label: "Roles", icon: <AdminPanelSettingsOutlinedIcon />, to: "/dashboard/roles" },
            { label: "Menús", icon: <MenuOutlinedIcon />, to: "/dashboard/permisos" },
        ],
    },
    {
        label: "Gestión",
        items: [
            { label: "Inventario", icon: <Inventory2OutlinedIcon />, to: "/dashboard/inventario" },
            { label: "Almacenes", icon: <WarehouseOutlinedIcon />, to: "/dashboard/almacenes" },
            { label: "Sucursales", icon: <StorefrontOutlinedIcon />, to: "/dashboard/sucursales" },
        ],
    },
    {
        label: "Transacciones",
        items: [
            { label: "Compras", icon: <ShoppingCartOutlinedIcon />, to: "/dashboard/compras" },
            { label: "Proveedores", icon: <LocalShippingOutlinedIcon />, to: "/dashboard/proveedores" },
        ],
    },
];

function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside
            className={`sidebar${isOpen ? "" : " sidebar--closed"}`}
            aria-hidden={!isOpen}
        >
            <div className="sidebar-brand">
                <div className="sidebar-brand-logo">E</div>
                <div className="sidebar-brand-text">
                    <span className="sidebar-brand-name">Eblumbit Admin</span>
                    <span className="sidebar-brand-desc">Panel de administración</span>
                </div>
            </div>

            <nav id="primary-navigation" className="sidebar-navigation" aria-label="Navegación principal">
                {navSections.map((section) => (
                    <section className="sidebar-section" key={section.label}>
                        <h2 className="sidebar-section-label">{section.label}</h2>
                        {section.items.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className="sidebar-nav-item"
                            >
                                <span className="sidebar-nav-icon" aria-hidden="true">
                                    {item.icon}
                                </span>
                                <span className="sidebar-nav-label">{item.label}</span>
                            </NavLink>
                        ))}
                    </section>
                ))}
            </nav>

            <div className="sidebar-footer">
                <span className="sidebar-footer-icon" aria-hidden="true" />
                <span className="sidebar-footer-title">Versión 2.4</span>
                <span className="sidebar-footer-desc">PRO</span>
            </div>
        </aside>
    );
}

export default Sidebar;
