<template>
   <div>
      <span class="icon-check-circle" 
            :class="{ completed: !active }"
            @click="completedTask"></span>
      <p :class="{ completed: !active }">{{ name }}</p>
      <span class="icon-trash-o" @click="deleteTask"></span>
   </div>
</template>

<script>
   import { EventBus } from '../main';

   export default {
      props: ['name', 'active'],
      data() {
         return {

         }
      },
      methods: {
         deleteTask(task) {
            this.$emit('delete');

         },
         completedTask() {
            this.$emit('completed');
         }
      }
   
   }
</script>

<style lang="scss" scoped>

   div {
      border-bottom: 1px solid $grey;
      padding: 1rem 0;
      font-size: 1.3rem;
      position: relative;
      & > span {
         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         cursor: pointer;
         transition: .3s;
      }
   }
   p {
      color: white;
      padding: 1rem 0rem;
      font-size: 1.2rem;
      display: inline;
      margin-left: 2rem;   
   }
   .icon-check-circle:hover {
      color: $green;
   }
   .icon-trash-o {
      right: .3rem;
      &:hover {
         color: $red;
      }      
   }
   .completed {
      color: $grey;
      pointer-events: none;
   }
   p.completed {
      text-decoration: line-through;
      text-decoration-color: white;    
   }
   

</style>