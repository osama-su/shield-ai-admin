<script setup>
const sidebar = [
  {
    link: "/header",
    name: "header",
    title: "Header",
  },
  {
    link: "/dashboard",
    name: "dashboard",
    title: "Home",
  },
  {
    link: "/contacts",
    name: "contacts",
    title: "Contacts",
  },
  {
    link: "/footer",
    name: "footer",
    title: "Footer",
  },
];
</script>

<template>
  <div class="drawer lg:drawer-open fixed left-0 z-50 lg:z-0">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="sidebar-drawer" class="drawer-overlay"></label>
      <ul
        class="pt-xl border-t border-t-white/5 menu px-xl w-subsidebar-width min-h-full bg-base-100 text-base-content"
      >
        <li v-for="(link, index) in sidebar" :key="index" class="!px-0 mb-md">
          <router-link
            :to="link.link"
            class="px-0 link decoration-transparent text-lg transition duration-100 text-white"
            >{{ link.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.link.router-link-active {
  background-color: theme("colors.primary");
  padding-inline: 10px;
}

.link:hover {
  padding-inline: 10px;
}
</style>
