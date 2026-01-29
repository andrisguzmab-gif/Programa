export default function NavBar({vista, setVista, carritoCount}) {
    const btn= (id, Text,)=>(
        <button onClick={()=>setVista(id)} style={{
            padding: "10px 20p",
            borderRadius: 10,
            backgroundColor: vista === id ? "blue" : "red",
            cursor: "pointer",
        }}
        >
            {Text}
        </button>
    );

    return (
        <div style={{display: "flex", gap: 10, alignItems: "center", marginBottom: 20, }}>
            <h2 style={{margin: 0, marginRight: 10}}>Alquiler Fiesta</h2>
            {btn("catalogo", "Catalogo")}
            {btn("carrito", `Carrito (${carritoCount})`)}
            {btn("historial", "Historial")}
            
        </div>
    )
}