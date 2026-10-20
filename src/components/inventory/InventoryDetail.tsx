import { useState } from "react";

function InventoryDetail ({product}) {
    //BUSINESS LOGIC
    const [productName, setProductName] = useState('Laptop Dell');
    const productImage: string = 'https://google.com/dsadkasd';
    const productDescription: string = 'dsadsadsadsadsad sadsadsadsad';
    const productPrecing: number = 13212; 
    const products: any[] = [];

    const addInventory = () => {
        console.log('ADD INVENTORY CLICKED')
    }

    //USER INTERFACE 
    return (
        <div>
            <img src={product.img}></img>
            <h1>{product.descripcion}</h1>
            <p>{product.nombre}</p>

            <button onClick={() => addInventory()}>Create product</button>
        </div>
    )

}

export default InventoryDetail;