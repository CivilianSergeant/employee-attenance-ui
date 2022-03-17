<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{{appTitle}}</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  </header>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
export default {
  name: 'TopBar',
  props: {
    title: ref('')
  },
  setup(props){
    const appTitle = computed(() => props.title)
    return {
      appTitle
    }
  }
}
</script>
