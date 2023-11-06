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

function uploadFeatureImage(file, index) {
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form.features[index].image = res.data.image;
    });
  }
}

function removeFeature(index) {
  form.features.splice(index, 1);
}

function addFeature() {
  form.features.push({
    title: "",
    image: "",
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { aboutUs: form });
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
          <label class="label" for="mainImage">Main Image</label>
          <input
            id="mainImage"
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

      <div>
        <label class="label">App Store URL</label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="form.app_store"
        />
      </div>
      <div>
        <label class="label">Google Play URL</label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="form.google_play"
        />
      </div>

      <!-- features  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Features</label>
        </li>
        <li
          v-for="(feat, index) in form.features"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeFeature(index)"
            v-if="form.features.length > 1"
          >
            remove
          </button>
          <div class="flex items-center gap-lg">
            <img
              v-if="feat.image"
              :src="feat.image"
              alt=""
              class="w-[100px] h-[100px] rounded-lg object-cover"
            />
            <div class="flex-1">
              <label class="label">Image</label>
              <input
                type="file"
                class="file-input file-input-bordered w-full"
                @change="uploadFeatureImage($event.target.files[0], index)"
              />
            </div>
          </div>

          <div>
            <label class="label">Title</label>
            <Editor v-model="feat.title" />
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addFeature">
            add new feature
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
