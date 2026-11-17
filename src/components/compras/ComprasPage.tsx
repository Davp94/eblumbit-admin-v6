import { useNavigate, useParams } from "react-router";
import { useAlmacenes } from "../../hooks/useAlmacenes";

function ComprasPage () {
    const { almacenId: routeAlmacenId } = useParams<{ almacenId: string }>();
    const navigate = useNavigate();
    const { data: almacenes, isLoading: almacenesError, error: errorAlmacenes} = useAlmacenes();
    return (
        <>
            
        </>
    )
}

export default ComprasPage;