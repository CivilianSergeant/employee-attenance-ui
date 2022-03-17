<template>
  <top-bar title="Employee Attendance App"/>
  <div class="container-fluid">
  <div class="row">
    <side-bar/>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
      <router-view></router-view>
    </main>
  </div>
</div>
  <!-- <router-view/> -->
</template>
<script>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import SideBar from './components/SideBar.vue'
export default {
  components:{
    TopBar,
    SideBar
  },
  setup() {
    const title = ref('Employees')
    return {
      title
    } 
  }
}
</script>

