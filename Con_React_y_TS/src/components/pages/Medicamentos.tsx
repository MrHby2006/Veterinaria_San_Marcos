import { useState } from "react";
import CardMedicamento from "../molecules/CardMedicamento";
import FiltroEspecie from "../molecules/FiltroEspecie";
import CampoFormulario from "../molecules/CampoFormulario";

function Medicamentos() {

    // Estados para guardar la especie elegida y lo que se escribe en el buscador
    const [especie, setEspecie] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");

    // Decide si una tarjeta se muestra (true) o se esconde (false)
    const mostrar = (especieMedicamento: string, nombre: string) => {

        // Si se eligió una especie y el medicamento no es para ella, se esconde
        if (especie !== "Todas" && !especieMedicamento.includes(especie)) {
            return false;
        }
        // Si el nombre no contiene lo escrito en el buscador, se esconde
        // (toLowerCase pasa todo a minúsculas para que no importen las mayúsculas)
        if (!nombre.toLowerCase().includes(busqueda.toLowerCase())) {
            return false;
        }
        return true;
    };

    return (
        <div className = "container my-4">
            <h1 className = "fs-2 fw-bold" style = {{ color: "#2F3E46" }}>Medicamentos y Vacunas</h1>

            {/* Filtros: en celular uno debajo del otro, en pantallas medianas lado a lado */}
            <div className = "row justify-content-center text-start mt-3">
                <div className = "col-12 col-md-4">
                    <FiltroEspecie
                        valor = {especie}
                        alCambiar = {setEspecie}
                    />
                </div>

                <div className = "col-12 col-md-4">
                    <CampoFormulario
                        etiqueta = "Buscar por nombre"
                        tipo = "text"
                        nombre = "busqueda"
                        valor = {busqueda}
                        alCambiar = {setBusqueda}
                    />
                </div>
            </div>

            <div className = "d-flex flex-wrap justify-content-center gap-3 mt-4">
                {mostrar("Perro / Gato", "Amoxibay 250mg") && (
                    <CardMedicamento
                        id = {1}
                        categoria = "Antibióticos"
                        nombre_comercial = "Amoxibay 250mg"
                        principio_activo = "Amoxicilina"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro / Gato"
                        stock_actual = {45}
                        precio_unitario = {4200}
                        imagen = "/img/Medicamentos/Amoxibay.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Enrox 50mg") && (
                    <CardMedicamento
                        id = {2}
                        categoria = "Antibióticos"
                        nombre_comercial = "Enrox 50mg"
                        principio_activo = "Enrofloxacino"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro / Gato"
                        stock_actual = {30}
                        precio_unitario = {6800}
                        imagen = "/img/Medicamentos/Ernox.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Metrobay 250mg") && (
                    <CardMedicamento
                        id = {3}
                        categoria = "Antibióticos"
                        nombre_comercial = "Metrobay 250mg"
                        principio_activo = "metronidazol"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro / Gato"
                        stock_actual = {28}
                        precio_unitario = {3900}
                        imagen = "/img/Medicamentos/Metrobay.jpg"
                    />
                )}

                {mostrar("Perro", "Nexgard") && (
                    <CardMedicamento
                        id = {4}
                        categoria = "Antiparasitarios"
                        nombre_comercial = "Nexgard"
                        principio_activo = "Afoxolaner"
                        presentacion = "Masticable 1 unid."
                        especie = "Perro"
                        stock_actual = {60}
                        precio_unitario = {9500}
                        imagen = "/img/Medicamentos/Nexgard.jpg"
                    />
                )}

                {mostrar("Perro", "Bravecto") && (
                    <CardMedicamento
                        id = {5}
                        categoria = "Antiparasitarios"
                        nombre_comercial = "Bravecto"
                        principio_activo = "Fluralaner"
                        presentacion = "Masticable 1 unid."
                        especie = "Perro"
                        stock_actual = {40}
                        precio_unitario = {18900}
                        imagen = "/img/Medicamentos/Bravecto.jpg"
                    />
                )}

                {mostrar("Gato", "Revolution Plus") && (
                    <CardMedicamento
                        id = {6}
                        categoria = "Antiparasitarios"
                        nombre_comercial = "Revolution Plus"
                        principio_activo = "Selamectina + Sarolaner"
                        presentacion = "Pipeta 1 unid."
                        especie = "Gato"
                        stock_actual = {35}
                        precio_unitario = {14500}
                        imagen = "/img/Medicamentos/Revolution_Plus.jpg"
                    />
                )}

                {mostrar("Perro", "Drontal Plus") && (
                    <CardMedicamento
                        id = {7}
                        categoria = "Antiparasitarios"
                        nombre_comercial = "Drontal Plus"
                        principio_activo = "Praziquantel + Pamoato"
                        presentacion = "Comprimido 1 unid."
                        especie = "Perro"
                        stock_actual = {80}
                        precio_unitario = {3200}
                        imagen = "/img/Medicamentos/Drontal_Plus.jpg"
                    />
                )}

                {mostrar("Gato", "Milbemax Gato") && (
                    <CardMedicamento
                        id = {8}
                        categoria = "Antiparasitarios"
                        nombre_comercial = "Milbemax Gato"
                        principio_activo = "Milbemicina + Praziq"
                        presentacion = "Comprimido 2 unid."
                        especie = "Gato"
                        stock_actual = {50}
                        precio_unitario = {6800}
                        imagen = "/img/Medicamentos/Milbemax_Gato.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Meloxicam 1mg") && (
                    <CardMedicamento
                        id = {9}
                        categoria = "Antiinflamatorios"
                        nombre_comercial = "Meloxicam 1mg"
                        principio_activo = "Meloxicam"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro / Gato"
                        stock_actual = {55}
                        precio_unitario = {4500}
                        imagen = "/img/Medicamentos/Meloxicam_1mg.jpg"
                    />
                )}

                {mostrar("Perro", "Carprofen 50mg") && (
                    <CardMedicamento
                        id = {10}
                        categoria = "Antiinflamatorios"
                        nombre_comercial = "Carprofen 50mg"
                        principio_activo = "Carprofeno"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro"
                        stock_actual = {30}
                        precio_unitario = {9800}
                        imagen = "/img/Medicamentos/Carprofen_50mg.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Clorhexidina Shampoo") && (
                    <CardMedicamento
                        id = {11}
                        categoria = "Dermatología"
                        nombre_comercial = "Clorhexidina Shampoo"
                        principio_activo = "Clorhexidina 2%"
                        presentacion = "Frasco 250ml"
                        especie = "Perro / Gato"
                        stock_actual = {25}
                        precio_unitario = {8900}
                        imagen = "/img/Medicamentos/Clorhexidina.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Malaseb Shampoo") && (
                    <CardMedicamento
                        id = {12}
                        categoria = "Dermatología"
                        nombre_comercial = "Malaseb Shampoo"
                        principio_activo = "Miconazol + Clorhex"
                        presentacion = "Frasco 250ml"
                        especie = "Perro / Gato"
                        stock_actual = {20}
                        precio_unitario = {12500}
                        imagen = "/img/Medicamentos/Malaseb.jpg"
                    />
                )}

                {mostrar("Perro", "Apoquel 16mg") && (
                    <CardMedicamento
                        id = {13}
                        categoria = "Dermatología"
                        nombre_comercial = "Apoquel 16mg"
                        principio_activo = "Oclacitinib"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro"
                        stock_actual = {18}
                        precio_unitario = {22000}
                        imagen = "/img/Medicamentos/Apoquel.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Probifor") && (
                    <CardMedicamento
                        id = {14}
                        categoria = "Digestivo"
                        nombre_comercial = "Probifor"
                        principio_activo = "Bacillus clausii"
                        presentacion = "Sobre 5ml x10"
                        especie = "Perro / Gato"
                        stock_actual = {40}
                        precio_unitario = {5600}
                        imagen = "/img/Medicamentos/Probifor.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Omeprazol 10mg vet") && (
                    <CardMedicamento
                        id = {15}
                        categoria = "Digestivo"
                        nombre_comercial = "Omeprazol 10mg vet"
                        principio_activo = "Omeprazol"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro / Gato"
                        stock_actual = {35}
                        precio_unitario = {3800}
                        imagen = "/img/Medicamentos/Omeprazol_10mg.jpg"
                    />
                )}

                {mostrar("Perro", "Vetmedin 2.5mg") && (
                    <CardMedicamento
                        id = {16}
                        categoria = "Cardíaco"
                        nombre_comercial = "Vetmedin 2.5mg"
                        principio_activo = "Pimobendan"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro"
                        stock_actual = {15}
                        precio_unitario = {28000}
                        imagen = "/img/Medicamentos/Vetmedin.jpg"
                    />
                )}

                {mostrar("Perro", "Tramadol 50mg vet") && (
                    <CardMedicamento
                        id = {17}
                        categoria = "Analgésicos"
                        nombre_comercial = "Tramadol 50mg vet"
                        principio_activo = "Tramadol"
                        presentacion = "Blíster 10 comp."
                        especie = "Perro"
                        stock_actual = {22}
                        precio_unitario = {5200}
                        imagen = "/img/Medicamentos/Tramadol.jpg"
                    />
                )}

                {mostrar("Perro", "Nobivac DHPPi") && (
                    <CardMedicamento
                        id = {18}
                        categoria = "Vacunas"
                        nombre_comercial = "Nobivac DHPPi"
                        principio_activo = "Vacuna plivalente"
                        presentacion = "Vial 1 dosis"
                        especie = "Perro"
                        stock_actual = {48}
                        precio_unitario = {8500}
                        imagen = "/img/Medicamentos/Nobivac.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Nobivac Rabies") && (
                    <CardMedicamento
                        id = {19}
                        categoria = "Vacunas"
                        nombre_comercial = "Nobivac Rabies"
                        principio_activo = "Vacuna antirrábica"
                        presentacion = "Vial 1 dosis"
                        especie = "Perro / Gato"
                        stock_actual = {60}
                        precio_unitario = {5800}
                        imagen = "/img/Medicamentos/Rabies.jpg"
                    />
                )}

                {mostrar("Gato", "Felocell CVR") && (
                    <CardMedicamento
                        id = {20}
                        categoria = "Vacunas"
                        nombre_comercial = "Felocell CVR"
                        principio_activo = "Vacuna triple felina"
                        presentacion = "Vial 1 dosis"
                        especie = "Gato"
                        stock_actual = {36}
                        precio_unitario = {7200}
                        imagen = "/img/Medicamentos/Felocell.jpg"
                    />
                )}

                {mostrar("Perro / Gato", "Omega vet 3-6-9") && (
                    <CardMedicamento
                        id = {21}
                        categoria = "Suplementos"
                        nombre_comercial = "Omega vet 3-6-9"
                        principio_activo = "Ácidos grasos omega"
                        presentacion = "Frasco 100ml"
                        especie = "Perro / Gato"
                        stock_actual = {30}
                        precio_unitario = {9900}
                        imagen = "/img/Medicamentos/Omega.jpg"
                    />
                )}

                {mostrar("Perro", "Condrovet forte") && (
                    <CardMedicamento
                        id = {22}
                        categoria = "Suplementos"
                        nombre_comercial = "Condrovet forte"
                        principio_activo = "Condroitín + Glucos"
                        presentacion = "Blíster 30 comp."
                        especie = "Perro"
                        stock_actual = {25}
                        precio_unitario = {14500}
                        imagen = "/img/Medicamentos/Condrovet.jpg"
                    />
                )}
            </div>
        </div>
    )
}

export default Medicamentos
