import { useNavigate } from "react-router";
import { useAuthStore } from "../state-management/authStore";
import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

function Topbar() {
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
            <header className="flex items-center justify-end gap-4 p-4">
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