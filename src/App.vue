<template>
  <div id="app">
    <header-container></header-container>
    <tasks-container></tasks-container>
  </div>
</template>

<script>
import TasksContainer from './components/TasksContainer.vue'
import HeaderContainer from './components/HeaderContainer.vue'

export default {
  name: 'app',
  components: { TasksContainer, HeaderContainer }
}
</script>

<style lang="scss">

  body {
    font-family: inter;
    height: 100vh;
    display: flex;
    justify-content: center;
    //align-items: center;
  }

  #app {
    height: 550px;
    width: 850px;
    padding: 2rem;
    background-color: $bg;
    border-radius: 5px;
    box-shadow: 5px 5px 15px 5px 
              rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
  }

</style>
