<template>
   <div id="task-container">
      <task-item :name="task.name" 
                 :active="active"
                  v-for="(task, index) in filterCompleted"
                  :key="index"
                  @delete="deleteTask(task, index)"
                  @completed="completedTask(task, index)">
      </task-item>
   </div>
</template>

<script>
   import TaskItem from './TaskItem.vue'
   import { EventBus } from '../main';
   
   export default {
      components: { TaskItem },
      data() {
         return {
            listCompleted: [],
            listIncompleted: [],
            active: true,
            numberActiveTasks: 0,
         }
      },
      created() {
         EventBus.$on('addTask', (newTask) => {
            this.listCompleted.push(newTask);
            this.numberActiveTasks++;
         });
         EventBus.$on('showIncompleted', (active) => {
            this.active = active;
         });
         EventBus.$on('showCompleted', (active) => {
            this.active = active;
         });

      },
      methods: {
         deleteTask(task, index) {
            if(this.active == true) {
               this.listCompleted.splice(index, 1);

               this.numberActiveTasks--;
               EventBus.$emit('count', this.numberActiveTasks);

            } else {
               this.listIncompleted.splice(index, 1);
            }
         },
         completedTask(task, index) {
            task.completed = true;

            this.numberActiveTasks--;
            EventBus.$emit('count', this.numberActiveTasks);

            this.listCompleted.splice(index, 1);
            this.listIncompleted.push(task);
            
         }
      },
      computed: {
         filterCompleted() {
            if(this.active == true) {
               return this.listCompleted;
            } else {
               return this.listIncompleted;
            }
         },
         numTasks() {
            return this.numberActiveTasks = this.listCompleted.length;
         }
      },
      watch: {
         listCompleted(newValue, oldValue) {
            localStorage.setItem('listIncompleted', JSON.stringify(newValue));
         },
         listIncompleted(newValue, oldValue) {
            localStorage.setItem('listCompleted', JSON.stringify(newValue));
         },
         numberActiveTasks(newValue, oldValue) {
           localStorage.setItem('count', newValue); 
         }  
      },
      mounted() {
         if(localStorage.getItem('listIncompleted')) {
            this.listCompleted = JSON.parse(localStorage.getItem('listIncompleted'));
            this.numberActiveTasks = localStorage.getItem('count');
         }
         if(localStorage.getItem('listCompleted')) {
            this.listIncompleted = JSON.parse(localStorage.getItem('listCompleted'));
            EventBus.$emit('count', this.numberActiveTasks);
         }
         if(localStorage.getItem('count')) {
            this.numberActiveTasks = localStorage.getItem('count');
         }

      }
      
   }
</script>

<style lang="scss" scoped>
   #task-container {
      flex-basis: 80%;
      overflow-y: scroll;
   }
   .activve {
      color: white;
   }
   .completed {
      text-decoration: line-through;
      color: $grey;
      & p {
         color: gold;
      }
   }

</style>