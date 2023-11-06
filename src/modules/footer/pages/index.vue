<script setup>
import { ref, shallowRef } from "vue";
import Tabs from "@/modules/dashboard/components/tabs.vue";
import Info from "../components/info.vue";
import UsefullLinks from "../components/usefullLinks.vue";
import HelpLinks from "../components/helpLinks.vue";

import { api_get_footer_page, api_update_footer_page } from "@/server";

const tabs = [
  {
    title: "info",
    component: Info,
    id: "info",
  },
  {
    title: "usefull links",
    component: UsefullLinks,
    id: "usefullLinks",
  },
  {
    title: "help links",
    component: HelpLinks,
    id: "helpLinks",
  },
];

const activeTab = shallowRef(tabs[0].component);

const activeTabString = shallowRef(tabs[0].id);

function changeTab(str) {
  activeTab.value = tabs.find((item) => item.id === str).component;
  activeTabString.value = str;
}

const payload = ref({
  info: {
    logo: "",
    title: "",
    phone: "",
    email: "",
    address: "",
    socials: [
      {
        image: "",
        url: "",
      },
    ],
  },
  usefullLinks: [
    {
      title: "",
      url: "",
    },
  ],
  helpLinks: [
    {
      title: "",
      url: "",
    },
  ],
});

const isLoading = ref(true);

function getPage() {
  api_get_footer_page()
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
    title: "footer page",
    slug: "footer",
    content: {
      ...payload.value,
      ...data,
    },
  };
  api_update_footer_page(dataPayload).finally(() => {
    isSubmitting.value = false;
  });
}
</script>

<template>
  <div v-if="!isLoading">
    <Tabs :tabs="tabs" :activeTab="activeTabString" @changeTab="changeTab" />

    <keep-alive>
      <component
        :is="activeTab"
        :data="payload[activeTabString]"
        @submitForm="handleSubmit"
        :isSubmitting="isSubmitting"
      />
    </keep-alive>
  </div>
  <div v-else>
    <span class="loading loading-bars loading-lg"></span>
  </div>
</template>
