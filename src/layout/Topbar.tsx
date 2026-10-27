import { useNavigate } from "react-router";
import { useAuthStore } from "../state-management/authStore";
import Button from "@mui/material/Button";

function Topbar() {
    const navigate = useNavigate();
    const clearSession = useAuthStore((state)=> state.clearSession);
    const identifier = useAuthStore((state)=>state.identifier);
    const handleLogout = () => {
        clearSession();
        navigate('/login');
    }

    return (
        <>
            <header className="flex items-center justify-end gap-4 p-4">
                <span className="text-sm text-gray-800">Usuario # {identifier}</span>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleLogout()}
                >Cerrar Sesion</Button>
            </header>
        </>
    )
}

export default Topbar;