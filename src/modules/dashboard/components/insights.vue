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
  emits("submitForm", { insights: form });
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
          <label class="label" for="insights-background"
            >Background Image</label
          >
          <input
            id="insights-background"
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
