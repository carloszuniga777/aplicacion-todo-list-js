import './styles.css';
import  {Todo, TodoList} from './js/clases';  //Importa las clases de ./js/clases/index.js, por defecto busca el archivo index por lo tanto no se especifica
import { crearTodoHTML } from './js/app';

/* A inicio del programa se guarda todos los elementos en el array, pero no se implementaba en el array,
   es decir, que el programa pudo funcionar sin el array. 
   Hasta que se implemento el LocalStorage, se empezo a implementar el array. 
*/
export const todoList = new TodoList();

//Carga los elementos almacenados en el array en el HTML
todoList.todos.forEach(element => crearTodoHTML(element));

/*Luego de convertir los elementos recuperados html en obj, estos obj no eran instancias
  de la clase Todo, por lo cual, teniamos sus atributos pero no sus objetos, por lo que 
  se procedio a convertir estos obj a instancias Todo, para poder recuperar sus metodos.
  Para eso fue necesario crear un metodo en la clase Todo llamado fromJson() y mandarlo a 
  llamar, en el metodo cargarLocalStorage() para realizar la conversion.
  */
//todoList.todos[0].imprimirClase(); 


//console.log('todos', todoList.todos);






