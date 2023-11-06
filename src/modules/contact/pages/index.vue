<script setup>
import { ref } from "vue";

import { api_get_messages } from "@/server";

const isLoading = ref(true);

const data = ref([]);

function getContacts() {
  api_get_messages()
    .then((res) => {
      data.value = res.data.data;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

getContacts();
</script>

<template>
  <div v-if="!isLoading && data.length">
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Gender</th>
            <th>Service</th>
            <th>Updated_at</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(col, index) in data" :key="index">
            <th>{{ col.id }}</th>
            <th>{{ col.name }}</th>
            <th>{{ col.email }}</th>
            <th>{{ col.phone_number }}</th>
            <th>{{ col.country }}</th>
            <th>{{ col.gender }}</th>
            <th>{{ col.service }}</th>
            <th>{{ col.updated_at }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <span class="loading loading-bars loading-lg"></span>
  </div>
</template>
