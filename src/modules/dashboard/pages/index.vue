<script setup>
import { ref, shallowRef, reactive } from "vue";
import Tabs from "../components/tabs.vue";
import Hero from "../components/hero.vue";
import AboutUS from "../components/aboutUs.vue";
import OurServices from "../components/ourServices.vue";
import Insights from "../components/insights.vue";
import Benefits from "../components/benefits.vue";
import CryptoEarn from "../components/cryptoEarn.vue";
import TeamMember from "../components/teamMember.vue";
import LatestBlog from "../components/latestBlog.vue";
import Faq from "../components/faq.vue";

import { api_get_home_page, api_update_home_page } from "@/server";

const tabs = [
  {
    title: "hero",
    component: Hero,
    id: "hero",
  },
  {
    title: "about us",
    component: AboutUS,
    id: "aboutUs",
  },
  {
    title: "our services",
    component: OurServices,
    id: "ourServices",
  },
  {
    title: "insights",
    component: Insights,
    id: "insights",
  },
  {
    title: "benefits",
    component: Benefits,
    id: "benefits",
  },
  {
    title: "crypto earn",
    component: CryptoEarn,
    id: "cryptoEarn",
  },
  {
    title: "team member",
    component: TeamMember,
    id: "teamMember",
  },
  {
    title: "latest blog",
    component: LatestBlog,
    id: "latestBlog",
  },
  {
    title: "faq",
    component: Faq,
    id: "faq",
  },
];

const activeTab = shallowRef(tabs[0].component);

const activeTabString = shallowRef(tabs[0].id);

function changeTab(str) {
  activeTab.value = tabs.find((item) => item.id === str).component;
  activeTabString.value = str;
}

const payload = ref({
  hero: {
    image: "",
    title: "",
    subtitle: "",
    btn1: {
      title: "",
      url: "",
    },
    btn2: {
      title: "",
      url: "",
    },
  },
  aboutUs: {
    title: "",
    subtitle: "",
    image: "",
    app_store: "",
    google_play: "",
    features: [
      {
        title: "",
        image: "",
      },
    ],
  },
  ourServices: {
    title: "",
    subtitle: "",
    image: "",
    services: [
      {
        image: "",
        title: "",
        subtitle: "",
        btn: {
          title: "",
          url: "",
        },
      },
    ],
  },
  insights: {
    title: "",
    subtitle: "",
    image: "",
  },
  benefits: {
    title: "",
    subtitle: "",
    btn: {
      title: "",
      url: "",
    },
    benefits: [
      {
        image: "",
        title: "",
      },
    ],
  },
  cryptoEarn: {
    title: "",
    subtitle: "",
    image: "",
    btn: {
      title: "",
      url: "",
    },
    upto1: {
      percent: "",
      title: "",
    },
    upto2: {
      percent: "",
      title: "",
    },
  },
  teamMember: {
    title: "",
    image: "",
  },
  latestBlog: {
    title: "",
    subtitle: "",
    blogs: [
      {
        title: "",
        image: "",
        subtitle: "",
        updated_at: new Date().toLocaleString(),
      },
    ],
  },
  faq: {
    title: "",
    tabs: [
      {
        title: "",
        questions: [
          {
            title: "",
            answer: "",
          },
        ],
      },
    ],
  },
});

const isLoading = ref(true);

function getPage() {
  api_get_home_page()
    .then((res) => {
      payload.value = {
        ...payload.value,
        ...res.data.content,
      };
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
    title: "home page",
    slug: "home",
    content: {
      ...payload.value,
      ...data,
    },
  };
  api_update_home_page(dataPayload)
    .then((res) => {
      payload.value = res.data.page.content;
    })
    .finally(() => {
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
