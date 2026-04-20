   


class DateTimeHelper {

 
  isDate = (fecha) => {
   
    return fecha instanceof Date && !Number.isNaN(fecha.getTime());
  };

  
  getOnlyDate = (fecha = new Date()) => {
    
    if (!this.isDate(fecha)) {
      return null;
    }
    
   
    const copia = new Date(fecha);
    copia.setHours(0, 0, 0, 0);
    return copia;
  };

 
  getEdadActual = (fechaNacimiento) => {
    
    if (!this.isDate(fechaNacimiento)) {
      return -1;
    }

    const hoy = new Date();
    const anoActual = hoy.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    const anoNac = fechaNacimiento.getFullYear();
    const mesNac = fechaNacimiento.getMonth();
    const diaNac = fechaNacimiento.getDate();

   
    let edad = anoActual - anoNac;

    
    if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
      edad--;
    }

    return edad;
  };

  
  getDiasHastaMiCumple = (fechaNacimiento) => {
    if (!this.isDate(fechaNacimiento)) {
      return -1;
    }

    
    const hoy = this.getOnlyDate(new Date()); 
    
    const mesNac = fechaNacimiento.getMonth();
    const diaNac = fechaNacimiento.getDate();
    
    
    let proximoCumple = new Date(hoy.getFullYear(), mesNac, diaNac);

    
    if (proximoCumple < hoy) {
      proximoCumple.setFullYear(hoy.getFullYear() + 1);
    }

    
    const diferenciaMs = proximoCumple.getTime() - hoy.getTime();
    
    
    const diasFaltantes = Math.round(diferenciaMs / (1000 * 60 * 60 * 24));

    return diasFaltantes;
  };

  
  getDiaTexto = (fecha, retornarAbreviacion = false) => {
    if (!this.isDate(fecha)) {
      return null;
    }

    const diasArray = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const diaNombre = diasArray[fecha.getDay()];

    if (retornarAbreviacion) {
       
        return diaNombre.substring(0, 3);
    }

    return diaNombre;
  };

 
  getMesTexto = (fecha, retornarAbreviacion = false) => {
    if (!this.isDate(fecha)) {
      return null;
    }

    const mesesArray = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const mesNombre = mesesArray[fecha.getMonth()];

    if (retornarAbreviacion) {
      return mesNombre.substring(0, 3);
    }

    return mesNombre;
  };

}

export default new DateTimeHelper();