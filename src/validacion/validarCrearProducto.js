export default function validarCrearCuenta(valores) {

    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // validar precio
    if(!valores.precio) {
        errores.empresa = "Precio del producto es obligatorio"
    }

    // validar descripción.
    if(!valores.descripcion) {
        errores.descripcion = "Agrega una descripción de tu producto"
    }


    return errores;
}