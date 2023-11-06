<script setup>
import { reactive } from "vue";

import { api_upload_image } from "@/server";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive({
  ...props.data,
});

// upload file
function handleUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form.logo = res.data.image;
    });
  }
}

function removeNavbarLink(index) {
  form.navbar.splice(index, 1);
}

function addNavbarLink() {
  form.navbar.push({
    title: "",
    url: "",
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", form);
}

// ****************************************************************
</script>

<template>
  <div>
    <form class="grid grid-cols-2 gap-lg" @submit="handleSubmit">
      <div class="flex items-center gap-lg">
        <img
          v-if="form.logo"
          :src="form.logo"
          alt=""
          class="w-[100px] h-[100px] rounded-lg object-cover"
        />
        <div>
          <label class="label" for="log">Logo</label>
          <input
            id="log"
            type="file"
            class="file-input file-input-bordered w-full"
            @change="handleUpload"
          />
        </div>
      </div>

      <div></div>

      <div class="col-span-2">
        <label class="label">Button</label>
        <div class="grid grid-cols-2 gap-lg">
          <div>
            <label class="label text-xs">Button Title</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="form.btn.title"
            />
          </div>
          <div>
            <label class="label text-xs">Button URL</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="form.btn.url"
            />
          </div>
        </div>
      </div>

      <!-- features  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Navbar Links</label>
        </li>
        <li
          v-for="(link, index) in form.navbar"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeNavbarLink(index)"
            v-if="form.navbar.length > 1"
          >
            remove
          </button>

          <div class="grid grid-cols-2 gap-lg">
            <div>
              <label class="label text-xs">Link Title</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="link.title"
              />
            </div>
            <div>
              <label class="label text-xs">Link URL</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="link.url"
              />
            </div>
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addNavbarLink">
            add new link
          </button>
        </li>
      </ul>

      <div class="col-span-2 flex justify-end">
        <button class="btn btn-primary min-w-[160px]" :disabled="isSubmitting">
          save
          <span
            v-if="isSubmitting"
            class="loading loading-dots loading-sm"
          ></span>
        </button>
      </div>
    </form>
  </div>
</template>
