<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    HTML
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->


<template>
    
    <div class="form-container">

        <form>

            <!-- ADD TODO -->
            <div class="add-todo">
                <h3>Add New ToDo</h3>
                <div class="add-todo-field">
                    <input type="text" v-model="newTodo" placeholder="What needs to be done?">
                    <button class="add-button" @click.prevent="addNewActive"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <!-- ACTIVE TODO -->
            <div class="active-todo">
                <h3>Active ToDo's: <span v-if="count > 0">{{ count }}</span></h3>
                <h4 class="no-todos" v-if="activeTodo.length === 0">No todo's added yet</h4>
                <div class="active-todo-content" v-else v-for="(listItem, idx) in activeTodo" :key="listItem">
                    <p :class="listItem.done ? 'todo-done' : ''" @click="toggleTodo(listItem)">
                        {{ listItem.todoItem }}
                    </p>
                    <button type="button" class="delete-button remove" @click="removeActiveTodo(idx)">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            <!-- DELETE ALL -->
            <button class="delete-button" @click.prevent="clearAllTodos">Delete All</button>

        </form>

    </div>

</template>



<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    JAVASCRIPT
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->


<script>

    export default {

    /////////////////////////////////
    // INIT
    /////////////////////////////////

      data() {
        return {
            newTodo: "",
            activeTodo: [],
        };
      },


      /////////////////////////////////
      // EVENTS
      /////////////////////////////////

      mounted() {

        let activeTodo = localStorage.getItem("activeTodo")
        if (activeTodo) { this.activeTodo = JSON.parse(activeTodo); }
      },

      /////////////////////////////////
      // METHODS
      /////////////////////////////////

      computed: {

        count() { return this.activeTodo.length; }
      },

      methods: {

          addNewActive() {

            if (this.newTodo.trim() === "") return;

            this.activeTodo.push({ "todoItem" : this.newTodo, "done": false });
            this.newTodo = "";

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))
        },

        removeActiveTodo(idx) { 

            this.activeTodo.splice(idx, 1); 

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))
        },

        clearAllTodos() {

            this.activeTodo = [];

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))

        },

        toggleTodo(listItem) {

            listItem.done = !listItem.done; 

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))
        }

      },

      
  }; // end export

  </script>
