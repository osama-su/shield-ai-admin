<script setup>
import { ref } from "vue";

import Form from "../components/form.vue";

import { api_get_header_page, api_update_header_page } from "@/server";

const payload = ref({
  logo: "",
  navbar: [
    {
      title: "",
      url: "",
    },
  ],
  btn: {
    title: "",
    url: "",
  },
});

const isLoading = ref(true);

function getPage() {
  api_get_header_page()
    .then((res) => {
      payload.value = { ...payload.value, ...res.data.content };
    })
    .finally(() => {
      isLoading.value = false;
    });
}

getPage();

const isSubmitting = ref(false);

function handleSubmit(data) {
  isSubmitting.value = true;
  const dataPayload = {
    title: "header page",
    slug: "header",
    content: data,
  };
  api_update_header_page(dataPayload).finally(() => {
    isSubmitting.value = false;
  });
}
</script>

<template>
  <div v-if="!isLoading">
    <Form
      :data="payload"
      @submitForm="handleSubmit"
      :isSubmitting="isSubmitting"
    />
  </div>
  <div v-else>
    <span class="loading loading-bars loading-lg"></span>
  </div>
</template>
