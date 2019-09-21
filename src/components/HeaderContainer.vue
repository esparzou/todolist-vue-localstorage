<template>
   <div id="header">
      <div>
         <p>{{ showDate }}</p>
         <small> {{ numberTask }} Active Tasks</small>
         <form @submit.prevent="addNewTask(newTask)">
            <input type="text" v-model="newTask.name" placeholder="Enter a task...">
            <input type="submit" value="Add Task">
         </form>
      </div>
      <nav>
         <a @click="showIncompletedTasks" 
            :class="{ active: incompleted }">Incomplete Tasks</a>
         <a @click="showCompletedTasks"
            :class="{ active: completed }">Completed Tasks</a>
      </nav>
   </div>
</template>

<script>

   import { EventBus } from '../main.js';

   export default {
      data() {
         return {
            newTask: {
               name: '',
               completed: false
            },
            numberTask: 0,
            incompleted: true,
            completed: false,
         }
      },
      computed: {
         showDate() {
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var now = new Date();
            return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;  
         }
      },
      methods: {
         addNewTask(newTask) {
            EventBus.$emit('addTask', {
               'name': this.newTask.name,
               'completed': this.newTask.completed
            });
            this.newTask.name = '';
            this.numberTask++;
         },
         showIncompletedTasks() {
            EventBus.$emit('showIncompleted', true);
            this.incompleted = true;
            this.completed = false;
         },
         showCompletedTasks() {
            EventBus.$emit('showCompleted', false);
            this.completed = true;
            this.incompleted = false;
         }
      },
      created() {
         EventBus.$on('count', (numberActives) => {
            this.numberTask = numberActives;
         });
      },
   }
</script>

<style lang="scss" scoped>
   #header {
      display: flex;
      border-bottom: 1px solid $grey;
      flex-basis: 20%;
      & div {
         flex-basis: 58%;
         & p {
            color: #FFF;
            margin-bottom: .35rem;
            font-weight: bold;
         }
         & small {
            color: $blue;
            display: block;
            margin-bottom: 1rem;
         }
      }
      & nav {
         flex-basis: 42%;
         display: flex;
         justify-content: space-between;
         & a {
            color: $grey;
            cursor: pointer;
         }
         & a.active {
            color: white;
         }
      }
   }
   form {
      margin-bottom: 2.3rem;
      display: flex;
      & input {
         flex-basis: 70%;
         margin-right: .7rem;
      }
      & input[type="submit"] {
         background-color:$blue;
         cursor: pointer;
         color: white;
         flex-basis: 20%;
      }
      & > * {
        padding: .7rem .8rem;
        border-radius: 3px;
        border: none;
      }
   }

</style>