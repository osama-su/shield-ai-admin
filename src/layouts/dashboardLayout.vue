<script setup>
import Header from "./components/header.vue";
import Sidebar from "./components/sidebar.vue";
</script>

<template>
  <main
    class="min-h-screen bg-base-200 py-header-height lg:ps-subsidebar-width"
  >
    <Header />
    <Sidebar />
    <div class="relative z-10 p-xl">
      <router-view />
    </div>
  </main>
</template>
