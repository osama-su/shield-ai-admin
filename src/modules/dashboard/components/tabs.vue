<script setup>
defineProps({
  tabs: {
    type: Array,
    default: [],
  },
  activeTab: {
    type: String,
    default: "",
  },
});

defineEmits(["changeTab"]);
</script>

<template>
  <div
    class="tabs border-b-2 border-b-base-100 mb-xl flex-nowrap overflow-x-auto overflow-y-hidden"
  >
    <a
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab tab-lg tab-bordered capitalize whitespace-nowrap"
      :class="{
        'tab-active': tab.id === activeTab,
        'border-b-0': tab.id !== activeTab,
      }"
      @click="$emit('changeTab', tab.id)"
      >{{ tab.title }}</a
    >
  </div>
</template>
