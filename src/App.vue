<template>
  <div id="app">
    <directive-com /> 
    
  </div>
</template>

<script>
import directiveCom from './components/directiveCom.vue'
export default {
  name: "App",
  components:{directiveCom},
  data: function() {
    return {
      show: true,
      time: 1565753400000
    };
  },
  methods: {
    handleHide() {
      this.show = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
