<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Report</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group me-2">
        <button v-if="employees.length" @click="report" type="button" class="btn btn-danger text-white btn-sm btn-outline-secondary">PDF</button>
      </div>
      
    </div>
  </div>
  
    <form @submit.prevent="onSubmit">
      <div class="row">
    
    <div class="col">
      <label for="inTime" class="form-label">In Time</label>
      <input id="inTime" type="time" class="form-control" v-model="form.inTime" placeholder="In name" aria-label="In name">
    </div>
    <div class="col">
      <label for="outTime" class="form-label">Out Time</label>
      <input type="time" class="form-control" v-model="form.outTime" placeholder="Out Time" aria-label="Out Time">
    </div>
    <div class="col">
      <label for="ID" class="form-label">ID</label>
      <input type="text" id="ID" class="form-control" v-model="form.id" placeholder="ID" aria-label="ID">
    </div>
    <div class="col pt-4">
      
      <button type="submit" class="btn btn-primary mt-2">Search</button>&nbsp;
      <button type="reset" @click="clearSearch" class="btn btn-primary mt-2 ml-2">Clear</button>
    </div>
    </div>
    </form>
  <span v-if="loader">Loading...</span>
  
  <table class="table table-striped" v-if="!loader &&  employees.length>0">
    <thead>
      <tr>
        <th>Month</th>
        <th>Date</th>
        <th>Day</th>
        <th>ID</th>
        <th>Employee</th>
        <th>Department</th>
        <th>First-In Time</th>
        <th>Last-Out Time</th>
        <th>Hours Of Work</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in employees" :key="e.id">
        <td>{{e.month}}</td>
        <td>{{e.date}}</td>
        <td>{{e.day}}</td>
        <td>{{e.empId}}</td>
        <td>{{e.employee}}</td>
        <td>{{e.department}}</td>
        <td :class="{'bg-danger text-white':isAfter(e)}">{{e.inTime}}</td>
        <td :class="{'bg-warning':isBefore(e)}">{{e.outTime}}</td>
        <td>{{e.workHour}}</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.tableFixHead          { overflow: auto; max-height: 400px !important; }
.tableFixHead thead th { position: sticky; top: 0; z-index: 1; background:#fff}

</style>
<script>

import { ref } from '@vue/reactivity'
import EmployeeService from './../service/employee.js'
import Helper from './../helper/constant.js'
export default {
  setup() {
    
    const form = ref({})
    const employees = ref([])
    const loader = ref(false);
    const onSubmit = function(){
      loadData();
    }

    const loadData= function(){
      loader.value=true;
      EmployeeService.get(form.value.id).then(result=>{
        if(result.status == 200){
          employees.value = result.data;
          loader.value=false;
        }
      })
    }

    const isBefore = function(e){
      if(!form.value.outTime){
        return false;
      }
      return (form.value.outTime>convertTime(e.outTime))
    }

    const isAfter = function(e){
      if(!form.value.inTime){
        return false;
      }
      return (form.value.inTime<convertTime(e.inTime))
    }

    const convertTime = (timeWithPostfix) => {
      const [time, postfix] = timeWithPostfix.split(' ');

      let [hours, minutes] = time.split(':');

      if (hours === '12') {
        hours = '00';
      }

      if (postfix === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}:${minutes}`;
    }

    const clearSearch= function(){
      form.value={id:'',inTime:'',outTime:''}
      loadData();
    }

    const report=function(){
      
      let path = Helper.API_ROUTE+"/report";
      if(form.value.id){
        path += "?id="+form.value.id
       
      }
      
      // if(form.value.inTime){
      //   path += ((i)? "&" : "?")+"inTime="+form.value.inTime
      //   i =true
      // }
      // if(form.value.outTime){
      //   path += ((i)? "&" : "?")+"outTime="+form.value.outTime
      //   i =true
      // }

      window.open(path)
    }

    return {
      employees,
      form,
      onSubmit,
      isBefore,
      isAfter,
      loader,
      clearSearch,
      report
    }
  }
}
</script>

