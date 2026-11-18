import { useNavigate } from "react-router";
import { useAuthStore } from "../state-management/authStore";
import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface TopbarProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

function Topbar({ isSidebarOpen, onToggleSidebar }: TopbarProps) {
    const navigate = useNavigate();
    const clearSession = useAuthStore((state)=> state.clearSession);
    const identifier = useAuthStore((state)=>state.identifier);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const handleLogout = () => {
        setMenuAnchor(null);
        clearSession();
        navigate('/login');
    }

    const handleProfile = () => {
        setMenuAnchor(null);
        navigate('/dashboard/profile');
    }

    return (
        <>
            <header className="flex items-center justify-between gap-4 border-b border-black/10 bg-white px-4 py-2">
                <Tooltip title={isSidebarOpen ? "Ocultar menú" : "Mostrar menú"}>
                    <IconButton
                        onClick={onToggleSidebar}
                        color="primary"
                        aria-label={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
                        aria-expanded={isSidebarOpen}
                        aria-controls="primary-navigation"
                    >
                        {isSidebarOpen ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
                    </IconButton>
                </Tooltip>
                <div className="flex items-center gap-3">
                    <label className="text-lg font-medium">Usuario: {identifier}</label>
                    <IconButton
                        onClick={(event) => setMenuAnchor(event.currentTarget)}
                        size="small"
                    >
                        <Avatar>
                            {identifier}
                        </Avatar>
                    </IconButton>
                </div>
                
                <Menu
                    id="profile-menu"
                    anchorEl={menuAnchor}
                    open={!!menuAnchor}
                    onClose={() => setMenuAnchor(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >                  
                    <MenuItem onClick={()=> handleProfile()}>
                        Mi Perfil
                    </MenuItem>
                    <MenuItem onClick={() => handleLogout()}>
                        Logout
                    </MenuItem>
                </Menu>
            </header>
        </>
    )
}

export default Topbar;