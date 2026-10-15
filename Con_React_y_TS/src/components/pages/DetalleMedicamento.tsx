import { useParams } from "react-router-dom";
import BotonVolverMed from "../atoms/BotonVolverMed";
import BotonAddCarro from "../atoms/BotonAddCarro";

const medicamentos = [
    {
        id: 1,
        categoria: "Antibióticos",
        nombre_comercial: "Amoxibay 250mg",
        principio_activo: "Amoxicilina",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock_actual: 45,
        precio_unitario: 4200,
        imagen: "/img/Medicamentos/Amoxibay.jpg"
    },
    {
        id: 2,
        categoria: "Antibióticos",
        nombre_comercial: "Enrox 50mg",
        principio_activo: "Enrofloxacino",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock_actual: 30,
        precio_unitario: 6800,
        imagen: "/img/Medicamentos/Ernox.jpg"
    },
    {
        id: 3,
        categoria: "Antibióticos",
        nombre_comercial: "Metrobay 250mg",
        principio_activo: "metronidazol",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock_actual: 28,
        precio_unitario: 3900,
        imagen: "/img/Medicamentos/Metrobay.jpg"
    },
    {
        id: 4,
        categoria: "Antiparasitarios",
        nombre_comercial: "Nexgard",
        principio_activo: "Afoxolaner",
        presentacion: "Masticable 1 unid.",
        especie: "Perro",
        stock_actual: 60,
        precio_unitario: 9500,
        imagen: "/img/Medicamentos/Nexgard.jpg"
    },
    {
        id: 5,
        categoria: "Antiparasitarios",
        nombre_comercial: "Bravecto",
        principio_activo: "Fluralaner",
        presentacion: "Masticable 1 unid.",
        especie: "Perro",
        stock_actual: 40,
        precio_unitario: 18900,
        imagen: "/img/Medicamentos/Bravecto.jpg"
    },
    {
        id: 6,
        categoria: "Antiparasitarios",
        nombre_comercial: "Revolution Plus",
        principio_activo: "Selamectina + Sarolaner",
        presentacion: "Pipeta 1 unid.",
        especie: "Gato",
        stock_actual: 35,
        precio_unitario: 14500,
        imagen: "/img/Medicamentos/Revolution_Plus.jpg"
    },
    {
        id: 7,
        categoria: "Antiparasitarios",
        nombre_comercial: "Drontal Plus",
        principio_activo: "Praziquantel + Pamoato",
        presentacion: "Comprimido 1 unid.",
        especie: "Perro",
        stock_actual: 80,
        precio_unitario: 3200,
        imagen: "/img/Medicamentos/Drontal_Plus.jpg"
    },
    {
        id: 8,
        categoria: "Antiparasitarios",
        nombre_comercial: "Milbemax Gato",
        principio_activo: "Milbemicina + Praziq",
        presentacion: "Comprimido 2 unid.",
        especie: "Gato",
        stock_actual: 50,
        precio_unitario: 6800,
        imagen: "/img/Medicamentos/Milbemax_Gato.jpg"
    },
    {
        id: 9,
        categoria: "Antiinflamatorios",
        nombre_comercial: "Meloxicam 1mg",
        principio_activo: "Meloxicam",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock_actual: 55,
        precio_unitario: 4500,
        imagen: "/img/Medicamentos/Meloxicam_1mg.jpg"
    },
    {
        id: 10,
        categoria: "Antiinflamatorios",
        nombre_comercial: "Carprofen 50mg",
        principio_activo: "Carprofeno",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock_actual: 30,
        precio_unitario: 9800,
        imagen: "/img/Medicamentos/Carprofen_50mg.jpg"
    },
    {
        id: 11,
        categoria: "Dermatología",
        nombre_comercial: "Clorhexidina Shampoo",
        principio_activo: "Clorhexidina 2%",
        presentacion: "Frasco 250ml",
        especie: "Perro / Gato",
        stock_actual: 25,
        precio_unitario: 8900,
        imagen: "/img/Medicamentos/Clorhexidina.jpg"
    },
    {
        id: 12,
        categoria: "Dermatología",
        nombre_comercial: "Malaseb Shampoo",
        principio_activo: "Miconazol + Clorhex",
        presentacion: "Frasco 250ml",
        especie: "Perro / Gato",
        stock_actual: 20,
        precio_unitario: 12500,
        imagen: "/img/Medicamentos/Malaseb.jpg"
    },
    {
        id: 13,
        categoria: "Dermatología",
        nombre_comercial: "Apoquel 16mg",
        principio_activo: "Oclacitinib",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock_actual: 18,
        precio_unitario: 22000,
        imagen: "/img/Medicamentos/Apoquel.jpg"
    },
    {
        id: 14,
        categoria: "Digestivo",
        nombre_comercial: "Probifor",
        principio_activo: "Bacillus clausii",
        presentacion: "Sobre 5ml x10",
        especie: "Perro / Gato",
        stock_actual: 40,
        precio_unitario: 5600,
        imagen: "/img/Medicamentos/Probifor.jpg"
    },
    {
        id: 15,
        categoria: "Digestivo",
        nombre_comercial: "Omeprazol 10mg vet",
        principio_activo: "Omeprazol",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock_actual: 35,
        precio_unitario: 3800,
        imagen: "/img/Medicamentos/Omeprazol_10mg.jpg"
    },
    {
        id: 16,
        categoria: "Cardíaco",
        nombre_comercial: "Vetmedin 2.5mg",
        principio_activo: "Pimobendan",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock_actual: 15,
        precio_unitario: 28000,
        imagen: "/img/Medicamentos/Vetmedin.jpg"
    },
    {
        id: 17,
        categoria: "Analgésicos",
        nombre_comercial: "Tramadol 50mg vet",
        principio_activo: "Tramadol",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock_actual: 22,
        precio_unitario: 5200,
        imagen: "/img/Medicamentos/Tramadol.jpg"
    },
    {
        id: 18,
        categoria: "Vacunas",
        nombre_comercial: "Nobivac DHPPi",
        principio_activo: "Vacuna plivalente",
        presentacion: "Vial 1 dosis",
        especie: "Perro",
        stock_actual: 48,
        precio_unitario: 8500,
        imagen: "/img/Medicamentos/Nobivac.jpg"
    },
    {
        id: 19,
        categoria: "Vacunas",
        nombre_comercial: "Nobivac Rabies",
        principio_activo: "Vacuna antirrábica",
        presentacion: "Vial 1 dosis",
        especie: "Perro / Gato",
        stock_actual: 60,
        precio_unitario: 5800,
        imagen: "/img/Medicamentos/Rabies.jpg"
    },
    {
        id: 20,
        categoria: "Vacunas",
        nombre_comercial: "Felocell CVR",
        principio_activo: "Vacuna triple felina",
        presentacion: "Vial 1 dosis",
        especie: "Gato",
        stock_actual: 36,
        precio_unitario: 7200,
        imagen: "/img/Medicamentos/Felocell.jpg"
    },
    {
        id: 21,
        categoria: "Suplementos",
        nombre_comercial: "Omega vet 3-6-9",
        principio_activo: "Ácidos grasos omega",
        presentacion: "Frasco 100ml",
        especie: "Perro / Gato",
        stock_actual: 30,
        precio_unitario: 9900,
        imagen: "/img/Medicamentos/Omega.jpg"
    },
    {
        id: 22,
        categoria: "Suplementos",
        nombre_comercial: "Condrovet forte",
        principio_activo: "Condroitín + Glucos",
        presentacion: "Blíster 30 comp.",
        especie: "Perro",
        stock_actual: 25,
        precio_unitario: 14500,
        imagen: "/img/Medicamentos/Condrovet.jpg"
    }
];

function DetalleMedicamento() {
    const { id } = useParams()

    const medicamento = medicamentos.find(
        medicamento => medicamento.id === Number(id)
    )

    return (
        <div>
            <h1>Detalle del Medicamento</h1>

            <img 
                src={medicamento?.imagen}
                alt={medicamento?.nombre_comercial}
                style={{ width: '300px' }}
            />

            <h2>{medicamento?.nombre_comercial}</h2>

            <p>{medicamento?.categoria}</p>

            <p>{medicamento?.principio_activo}</p>

            <p>{medicamento?.presentacion}</p>

            <p>{medicamento?.especie}</p>

            <p>{medicamento?.stock_actual}</p>
            
            <p>${medicamento?.precio_unitario}</p>

            <div className="mt-auto">
                <BotonAddCarro />
            </div>

            <div className="mt-auto">
                <BotonVolverMed />
            </div>
        </div>
    )
}

export default DetalleMedicamento