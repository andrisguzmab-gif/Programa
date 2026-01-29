
import './App.css';
import { useMemo, useState } from 'react';
import {catalogoInicial} from './data/catalogo';
import Catalogo from './componentes/Catalogo';
import NavBar from './componentes/NavBar';
import Carrito from './componentes/Carrito';
import ClienteForm from './componentes/ClienteForm';
import Checkout from './componentes/Checkout';
import Historial from './componentes/Historial';

 function App() {
  const [vista, setVista] = useState("catalogo");
  const [catalogo] = useState(catalogoInicial);

  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    Fechaevento: "",
    dias:1,
  });
  const [historial, setHistorial] = useState([])

  
  const total = useMemo(() => {
    const dias = Number(cliente.dias || 1);
    return carrito.reduce((acc, item) => acc + item.precioDia * item.cantidad * dias, 0);
  }, [carrito, cliente.dias]);

  

  function agregarAlCarrito(articulos) {
    setCarrito((prev) => {
      const existente = prev.find((x) => x.id=== articulos.id);
      if (existente) {
        return prev.map((x) =>
          x.id === articulos.id ? { ...x, cantidad: x.cantidad + 1 } : x
        );
      }
      return [...prev, { ...articulos, cantidad: 1 }];
    })
  }


  function cambiarCantidad(id, cantidad) {
    const cant = Number(cantidad);
    if (Number.isNaN(cant)) return;
    setCarrito((prev) => prev.map((x=> x.id === id ? { ...x, cantidad: cant } : x
    )).filter((x) => x.cantidad > 0));

  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((x) => x.id !== id));
  }

  function limpiarCarrito() {
    setCarrito([]);
  }

  function confirmarAquiler() {
    const registro = {
      id:crypto.randomUUID(),
      fecha: new Date().toISOString(),
      cliente: { ...cliente },
      items: [...carrito],
      total,
    };

    setHistorial((prev) => [registro, ...prev]);
    limpiarCarrito();
    setCliente({
      nombre: "",
      telefono: "",
      direccion: "",
      Fechaevento: "",
      dias:1,
    });
    setVista("historial");
  }

  return (
    <div className="App">
      <NavBar vista={vista} setVista={setVista} carritoCount={carrito.length} />
      {vista === "catalogo" && (
        <Catalogo 
          catalogo={catalogo} onAdd={agregarAlCarrito} />
      )}
      {vista === "carrito" && (
        <Carrito 
          carrito={carrito}
          onQty={cambiarCantidad}
          onRemove={quitarDelCarrito}
          onClear={limpiarCarrito}
          dias={cliente.dias}
          total={total} 
          onNext={() => setVista("cliente")}
          />
      )}
      
      {vista === "cliente" && (
        <ClienteForm 
          cliente={cliente}
          setCliente={setCliente}
          onBack={() => setVista("carrito")}
          onNext={() => setVista("checkout")}
        />
      )}

      {vista === "checkout" && (
        <Checkout 
          cliente={cliente}
          carrito={carrito}
          total={total}
          onBack={() => setVista("cliente")}
          onconfirm={confirmarAquiler}
        />
      )}

      {vista === "historial" && (
        <Historial historial={historial} />
      )}

    </div>
  );
}

export default App;