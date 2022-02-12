import { Todo} from "./clases";
import { todoList } from '../index';  //Se realiza la importacion del arreglo todoList desde el index.js para guardar y mantener en memoria los datos almacenados

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) =>{

        /**
         * Primer linea li: si el objeto todo.completado es true -- se tacha la lista
         * Primer input toggle: si el objeto todo.completado es true -- se pone check
         * button destroy: es la x de cancelar.
         */
         const HtmlTodo = 
         `<li class= "${(todo.completado) ? 'completed' : ''}" data-id=${todo.id}>  
                <div class="view">
                    <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                    <label>${todo.tarea}</label>
                    <button class="destroy"></button>
                </div>
               <input class="edit" value="Create a TodoMVC template">
         </li> `;
  
         //Se creo el div solo para poder insertar el hmtl
        const div = document.createElement('div');
        div.innerHTML = HtmlTodo;
        
        /* Debido a que es una lista desaordenada <ul><li><li/></ul> no debe ir el div antes del li.
           por lo que se elimina con la instruccion firstElementChild */
        divTodoList.append(div.firstElementChild);
        return div.firstElementChild;
};

//-----------------------------------------------------------------------------------------
//                                  Eventos
//------------------------------------------------------------------------------------------

//Evento presionar tecla
txtInput.addEventListener('keyup', (evento) => {

  // console.log(evento);
     
    //Si presiona enter (keyCode = 13) y la longitud del texto es mayor a cero
    if(evento.keyCode === 13 && txtInput.value.length > 0){
        //console.log(txtInput.value);
        
        const nuevoTodo = new Todo(txtInput.value);     //Se crea un objeto todo y se guarda el texto tecleado     
        todoList.nuevoTodo(nuevoTodo);                  //Se almacena en una lista | Se importa el array todoList desde el index.js para mantener en memoria los datos almacenados, ya que inicializar un array cada que se ejecute el evento no guardara los datos
        crearTodoHTML(nuevoTodo);                       //Inserta en el HTML
        txtInput.value = '';                            //borra pantalla
    }
});

//----------------------------------------------------------------------------------------------
//Evento hacer clic en el check de una lista y tachar la lista y boorrar lista
divTodoList.addEventListener('click', (evento) => {
  // console.log(evento.target.localName);                                 //identificar en que parte del li, se hizo clic, si hizo clic en un input, label, buttom
    
    const elemento      = evento.target.localName;                         //indica que elemento se hace clic, este elemento puede ser un input, label, buttom
    const todoElemento  = evento.target.parentElement.parentElement;       //recupera el elemento li que contiene a los objetos input, label, buttom
    const todoId        = todoElemento.getAttribute('data-id');             //obtiene el id
    
    //console.log(todoElemento);
    //  console.log(todoid);

    if (elemento.includes('input') /*elemento === 'input'*/ ){      //Hizo click en el check
        //console.log('Hola');
        todoList.marcarCompletado(todoId);                          //cambia el status de false a true y viseversa del arreglo
        todoElemento.classList.toggle('completed');                 //tacha el nombre y viceseversa cuando se hace clic sobre el elemento en HTML | el metodo classlist obtiene todas las clases del objeto 'Li' | el metodo toggle ejecuta la clase css: complete
    }
    else if (elemento.includes('button')){                          //Si hace clic en la x elimina la lista
         //console.log('Hola');
         todoList.eliminarTodo(todoId);                             //Elimina el elemento del arreglo
         divTodoList.removeChild(todoElemento);                     //Elimina el elemento del html hijo de la lista ordenada html ul, que contenga el elemnto li correspondiente
         
         /* todoElemento.innerHTML = ''; */                          //Elimina la lista del html                    
     } 

    // console.log(todoList); 
});

//evento eliminar completados
btnBorrar.addEventListener('click', () => {
    
    todoList.eliminarCompletados();                                     //elimina los elementos completados del arreglo

    for(let i = divTodoList.children.length -1; i >= 0; i--){           //elimina los elementos completados del html
        const elemento = divTodoList.children[i];
     //   console.log(elemento);
        if(elemento.classList.contains('completed')){                   //si el elemento contiene la clase css 'completed' elimina
           divTodoList.removeChild(elemento);     
        }
    }
    
});

ulFilters.addEventListener('click', (evento) => {

   // console.log(evento.target.text);
    const filters = evento.target.text;                                 //Devuelve el texto del elemento que se hizo click 'Todos', 'Pendientes', 'Completados'
    if(!filters){ return;}                                              //Si filters esta vacio detiene la ejecucion y regresa al codigo donde llamo la funcion  (Yo creo que no realiza ninguna funcion)
    
    anchorFiltros.forEach(elemento => elemento.classList.remove('selected'));  //remueve el cuadrito de seleccionado (css: 'selected'), a todos los elementos del html que contengan la clase css filtro
    //console.log(evento.target);
    evento.target.classList.add('selected');                            //Agrega el cuadrito de seleccionado (css: selected) a los elementos que se le den click        

    for(const elemento of divTodoList.children){                        //Recorre el hmtl que contiene contiene 'Todo', 'Pendiente' y 'Completados'
      //  console.log(elemento);
    
      elemento.classList.remove('hidden');                              //Inicializacion: remueve la clase css hidden a los elementos html que la contienen, por lo tanto cuando se hace clic en 'Todos' por defecto elimina el css hidden
      const completado = elemento.classList.contains('completed');      //devuelve true o false, si el elemento contiene una clase css 'completed'

       switch(filters){
            case 'Pendientes':                                          //Si hace clic en Pendientes, busca los elementos que contengan la clase css completed y los esconde, por medio de la clase css: hidden
                  if(completado){
                      elemento.classList.add('hidden');        
                  }
                break;
            
            case 'Completados':                                          //Si hace clic en Completados, busca los elementos que no estan completados, es decir que no contiene la clase css 'Completed', y los esconde con la clase css Hidden
                  if(!completado){
                      elemento.classList.add('hidden');
                  }
            break;   
       } 

    }
});