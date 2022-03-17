<template>
  <div v-if="successMessage" class="alert alert-success" role="alert">
    {{successMessage}}
  </div>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
    {{errorMessage}}
  </div>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Read Attendance</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group me-2">
        <button @click="loadData" type="button" class="btn btn-sm btn-outline-secondary">Load Data</button>
      </div>
      
    </div>
  </div>
  <div class="tableFixHead">
  <span v-if="loader">Loading...</span>
  <table class="table  table-striped" v-if="!loader &&  employees.length>0">
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
        <td>{{e.inTime}}</td>
        <td>{{e.outTime}}</td>
        <td>{{e.hoursOfWork}}</td>
      </tr>
    </tbody>
  </table>
  </div>
  <span>Total Records: {{employees.length}}</span>
  <br/><br/>
  <button class="btn btn-success" v-if="employees.length>0" @click="onSave">Save</button>
</template>
<style scoped>
.tableFixHead          { overflow: auto; max-height: 400px !important; }
.tableFixHead thead th { position: sticky; top: 0; z-index: 1; background:#fff}

</style>
<script>
import { ref } from 'vue'
import EmployeeService from './../service/employee.js'
export default {
  setup(){
    const employees = ref([])
    const loader = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');
    const loadData = function(){
      loader.value = true;
       EmployeeService.loadData().then(result=>{
         employees.value = result.data
         loader.value = false;
       });
    }
    const clearMessage = function(){
      successMessage.value="";
      errorMessage.value="";
    }
    const onSave = function(){
      clearMessage();
      EmployeeService.saveData(employees.value).then(result=>{
        if(result.status==201){
          successMessage.value="Data has been saved successfully";
        }else{
          errorMessage.value="Sorry! Try again later.";
        }
      })
    }
    return {
      employees,
      loadData,
      loader,
      onSave,
      successMessage,
      errorMessage
    }
  }
}
</script>
