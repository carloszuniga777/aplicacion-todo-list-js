import { Todo } from ".";
import { todoList } from "../..";

export class TodoList{
    constructor(){
       // this.todos = [];
       this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

   
   
    eliminarTodo(id){
      this.todos = this.todos.filter(elemento => elemento.id != id);  //filter crea un nuevo array basado en una condicion | en este caso crea un nuevo array con todos los ids que sean diferentes al id recibido
      this.guardarLocalStorage();  
    }


    marcarCompletado(id){
       for(const todo of this.todos){
            //console.log(id, todo.id);

           if(todo.id == id){
               todo.completado = !todo.completado;
               this.guardarLocalStorage();  
               break;
           }
       }     
    }
    

    eliminarCompletados(){
       // this.todos = this.todos.filter(elemento => elemento.completado === false);  
       this.todos = this.todos.filter(elemento => !elemento.completado);                 //regresa solo las listas que no estan completadas, es decir, los que son false
       this.guardarLocalStorage();   
    }


    /* 
       El localstorage puede almacenar de manera permanente en el navegador
       Solo sirve para app 100% y no funciona con Node. 
   */
    //Almacena el array en el localstorege del navegador
    guardarLocalStorage(){

        /** El localstorage solo almacena string, para guardar un objeto 
         *  es necesario convertirlo a JSON
        */
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }


    //Obtiene los elementos que estan almacenados en el localStorage y los carga en el array Todo   
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo'))                     //Verifica que este almacenado el objeto Todo, si existe recupera el Todo y lo almacena en el array
                        ? JSON.parse(localStorage.getItem('todo'))      //JSON.parse convierte el string JSON a un objeto 
                        : [];                                           //Si no hay un objeto Todo almacenado en el localstorage, inicializa el array vacio
         //console.log('cargar localstorage: ', this.todos);    
         
         /*Debido a que al recuperar los elementos almacenados en el localstorage solo 
           logramos recuperar los atributos del objeto y no los metodos correspondientes al 
           objeto Todo, entonces se procese a realizar la conversion utilizando map, para que recorra
           el array todos[] y luego convertir esos obj a Todo, llamando la funcion definida en el obj */

         this.todos = this.todos.map(obj => Todo.fromJson(obj));      //map recorre el array 'todos', y devuelve un nuevo array mutado
          
        //console.log('cargar localstorge', this.todos);

        }          
    


}