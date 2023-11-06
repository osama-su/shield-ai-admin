<script setup>
import { reactive } from "vue";

import Editor from "@/components/editor.vue";

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
      form.image = res.data.image;
    });
  }
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { cryptoEarn: form });
}

// ****************************************************************
</script>

<template>
  <div>
    <form class="grid grid-cols-2 gap-lg" @submit="handleSubmit">
      <div class="flex items-center gap-lg">
        <img
          v-if="form.image"
          :src="form.image"
          alt=""
          class="w-[100px] h-[100px] rounded-lg object-cover"
        />
        <div>
          <label class="label" for="crypto-main-image">Main Image</label>
          <input
            id="crypto-main-image"
            type="file"
            class="file-input file-input-bordered w-full"
            @change="handleUpload"
          />
        </div>
      </div>

      <div></div>

      <div>
        <label class="label">Title</label>
        <Editor v-model="form.title" />
      </div>

      <div>
        <label class="label">Description</label>
        <Editor v-model="form.subtitle" />
      </div>

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

      <div class="col-span-2">
        <label class="label">Up To 1</label>

        <div class="grid grid-cols-2 gap-lg">
          <div>
            <label class="label text-sm">Up To Title</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="form.upto1.title"
            />
          </div>
          <div>
            <label class="label text-sm">Up To Percentage</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="form.upto1.percent"
            />
          </div>
        </div>
      </div>

      <div class="col-span-2">
        <label class="label">Up To 2</label>

        <div class="grid grid-cols-2 gap-lg">
          <div>
            <label class="label text-sm">Up To Title</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="form.upto2.title"
            />
          </div>
          <div>
            <label class="label text-sm">Up To Percentage</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="form.upto2.percent"
            />
          </div>
        </div>
      </div>

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
