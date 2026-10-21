import React from "react";
import { NavLink, useLocation } from "react-router";

interface NavItem {
    label: string;
    icon: string;
    to: string;
    badge?: string;
    badgeColor?: string;
}
function Sidebar() {

    const gestionNav: NavItem[] = [
        {label: 'Usuarios', icon: 'mat-dsd', to: '/usuarios'},
        {label: 'Sucursales', icon: 'mat-dsd', to: '/sucursales'},
        {label: 'Clientes / Proveedores', icon: 'mat-dsd', to: '/clientes-proveedores'},
    ];
    const location = useLocation();

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-logo">E</div>
                <div className="sidebar-brand-text">
                    <span className="sidebar-brand-name">Eblumbit Amin</span>
                    <span className="sidebar-brand-desc">Admin app</span>
                </div>
            </div>
            {/* Menus */}
            <div className="sidebar-section">
                <div className="sidebar-section-label">Gestion</div>
                {gestionNav.map((item) =>(
                    <NavLink key={item.to} to={item.to}
                        className="sidebar-nav-item"
                    >
                        <span className="sidebar-nav-icon">{item.icon}</span>
                        <span className="sidebar-nav-label">{item.label}</span>
                    </NavLink>
                ))};
            </div>
            {/* Footer */}
            <div className="sidebar-footer">
                <span className="sidebar-footer-icon"></span>
                <span className="sidebar-footer-title">Version 2.4 </span>
                <span className="sidebar-footer-desc">PRO</span>
            </div>
        </aside>
    );
}

export default Sidebar;