import { useAuthStore } from "../../state-management/authStore";

function ProfilePage() {
    const identifier = useAuthStore((state) => state.identifier);
    const roles = useAuthStore((state) => state.roles);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
            <p>Bienvenido, {identifier}!</p>
            <p><strong>Roles:</strong> {roles.join(', ')}</p>
        </div>
    );
}

export default ProfilePage;