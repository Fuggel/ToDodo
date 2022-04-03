<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    HTML
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->


<template>
    
    <div class="form-container">

        <form>

            <!-- ADD TODO -->
            <div class="add-todo">
                <h3>Add New ToDo</h3>
                <input type="text" v-model="newTodo" placeholder="What needs to be done?">
                <button class="add-button" @click.prevent="addNewActive"><span>&#10011;</span></button>
            </div>

            <!-- ACTIVE TODO -->
            <div class="active-todo">
                <h3>Active ToDo's: <span v-if="count > 0">{{ count }}</span></h3>
                <h4 class="no-todos" v-if="activeTodo.length === 0">No todo's added yet</h4>
                <p v-else v-for="(activeTodos, idx) in activeTodo" :key="activeTodos">
                    {{ activeTodos }}
                    <button class="delete-button remove" @click.prevent="removeActiveTodo(idx)"><span>&#10005;</span></button>
                </p>
            </div>

            <!-- DELETE ALL -->
            <button class="delete-button" @click.prevent="clearAllTodos">Delete All</button>

        </form>

    </div>

</template>



<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    JAVASCRIPT
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->


<script>

    export default {

    /////////////////////////////////
    // INIT
    /////////////////////////////////

      data() {
        return {
            newTodo: "",
            activeTodo: [],
            count: 0,
        };
      },

      watch: {

          activeTodo()  { localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo)) },
          count()       { localStorage.setItem("count", JSON.stringify(this.count)) },
      },


      /////////////////////////////////
      // EVENTS
      /////////////////////////////////

      mounted() {

          let activeTodo =      localStorage.getItem("activeTodo")
          let count =           localStorage.getItem("count")
          
          if (activeTodo)       { this.activeTodo = JSON.parse(activeTodo) }
          if (count)            { this.count = JSON.parse(count) }
      },

      /////////////////////////////////
      // METHODS
      /////////////////////////////////

      methods: {

          addNewActive() {

            if(this.newTodo.length === 0) { return; }

            this.activeTodo.push(this.newTodo);
            this.count++;
            this.newTodo = "";

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))
            localStorage.setItem("count", JSON.stringify(this.count))
        },

        removeActiveTodo(idx) { 

            this.activeTodo.splice(idx, 1); 
            this.count--; 

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))
            localStorage.setItem("count", JSON.stringify(this.count))
        },

        clearAllTodos() {

            this.activeTodo = [];

            localStorage.setItem("activeTodo", JSON.stringify(this.activeTodo))
            localStorage.setItem("count", JSON.stringify(this.count))

            this.count = 0;
        },

      },

      
  }; // end export

  </script>
