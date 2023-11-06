<template>
  <header
    class="navbar bg-base-100 min-h-min-height justify-between px-xl fixed top-0 left-0 right-0 z-40"
  >
    <router-link to="/">
      <img src="/logo.png" alt="logo" class="max-w-[120px]" />
    </router-link>
    <div class="flex-none gap-md">
      <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <label
          for="sidebar-drawer"
          class="drawer-button lg:hidden cursor-pointer"
        >
          <img src="/menu.svg" alt="logo" class="" />
        </label>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/default-avatar.svg" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between"> Profile </a>
          </li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>
