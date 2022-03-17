import axios from "axios"
import Helper from './../helper/constant.js'
export default {
    loadData: async function(){
       return await axios.get(Helper.API_ROUTE+"/employees/load-data");
    },
    saveData: async function(){
        return await axios.post(Helper.API_ROUTE+"/employees",{});
    },
    get: async function(id){
        let path = Helper.API_ROUTE+ "/employees";
        if(id !=undefined && id != null && id != ""){
            path += `?id=${id}`;
        }
        return await axios.get(path)
    }
}