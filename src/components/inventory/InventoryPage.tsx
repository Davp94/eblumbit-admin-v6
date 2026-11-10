import { useEffect, useState } from "react";
import { useProductos } from "../../hooks/useProductos";
import { Box, Button, Stack, TextField } from "@mui/material";
import InventoryTable from "./InventoryTable";

function InventoryPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebuncedSearch] = useState("");

    useEffect(() => {
        const timeoutId = window.setTimeout(()=> setDebuncedSearch(search),300);
        return () => window.clearTimeout(timeoutId);
    },[search])

    const { data, isLoading, isError, error, refetch} = useProductos({pageNumber, pageSize, search: debouncedSearch.trim() });
    return (
        <Box sx={{ p:3 }}>
            <Stack
                direction={"row"} spacing={2} sx={{alignItems: "center", justifyContent: "space-between", mb:3}}>
                    <label className="text-2xl">Inventario</label>
                    <div className="flex-row -space-x-2">
                        <TextField 
                            label='Buscar Productos'
                            size="small"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPageNumber(1)
                            }}
                        />
                        <Button variant="contained" onClick={()=>refetch()}>Actualizar</Button>
                    </div>
            </Stack>
            <InventoryTable
                productos={data?.items ?? [] }
                totalCount={data?.totalCount ?? 0}
                pageNumber={pageNumber}
                pageSize={pageSize}
                loading={isLoading}
                error={isError ? error.message : undefined}
                onPageChange={setPageNumber}
                onPageSizeChange={(newPageSize) => {
                    setPageSize(newPageSize);
                    setPageNumber(1);
                }}
            />
        </Box>
    );
}

export default InventoryPage;