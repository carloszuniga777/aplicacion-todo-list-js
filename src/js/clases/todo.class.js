export class Todo{

    /*
      Funcion convierte los objetos recuperados del HTML por medio JSON a instancias Todo,
      con el objetivo de recuperar todos sus metodos
    */
    static fromJson(obj) {
        const temp = new Todo(obj.tarea);
        
        temp.id         = obj.id;
        temp.completado = obj.completado;
        temp.creado     = obj.creado;

        return temp;
    }   

    constructor(tarea){
        this.tarea = tarea;
        this.id         = new Date().getTime(); //123434434
        this.completado = false;
        this.creado     = new   Date();
    }


    imprimirClase(){
        console.log(`Imprimiendo clase: ${this.tarea} - cuyo id es: ${this.id}`);
    }
}