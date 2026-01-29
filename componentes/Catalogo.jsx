import { use, useMemo, useState } from "react";
export default function Catalogo({ catalogo, onAdd }) {
    const [a, setQ]=useState("");
    const [cat, setCat]=useState("Todas")

    const categorias = useMemo(() => {
        const set = new Set(catalogo.map((x) => x.categoria));
        return ["Todas", ...Array.from(set)];
    }, [catalogo]);

    const filtrado = useMemo(() => {
        return catalogo.filter((x) =>{
            const matchQ =
            x.nombre.toLowerCase().includes(a.toLowerCase()) ||
            x.categoria.toLowerCase().includes(a.toLowerCase());    
        const matchCat = cat === "Todas" ? true : x.categoria === cat;
            return matchQ && matchCat;
        })
    }, [catalogo, a, cat]);

    return (
        <div>
            <h3 style= {{marginTop: 0}}>Catalogo de Articulos</h3>
            <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
                <input
                    value={a}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar... (silla, mesa ....)"
                    style={{flex: 1, padding:10, borderRadius: 10, border: "1px solid black" }}
                />

                <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    style={{padding:10, borderRadius: 10, border: "1px solid black" }}
                >
                    {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>

            </div>

            <div>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem"}}>
                    {filtrado.map((a) => (
                        <div key={a.id} style={{border: "1px solid green", borderRadius: 14, padding: 12}}>
                            <div>{a.nombre}</div>
                            <div>{a.categoria}</div>
                            <div>Precio por dia: ${a.precioDia}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
        
       
    )

}