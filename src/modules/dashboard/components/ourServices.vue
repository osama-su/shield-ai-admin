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

function uploadServiceImage(file, index) {
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form.services[index].image = res.data.image;
    });
  }
}

function removeService(index) {
  form.services.splice(index, 1);
}

function addService() {
  form.services.push({
    title: "",
    image: "",
    subtitle: "",
    btn: {
      title: "",
      url: "",
    },
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { ourServices: form });
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
          <label class="label" for="service-main-image">Image</label>
          <input
            id="service-main-image"
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

      <!-- services  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Services</label>
        </li>
        <li
          v-for="(service, index) in form.services"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeService(index)"
            v-if="form.services.length > 1"
          >
            remove
          </button>
          <div class="flex items-center gap-lg">
            <img
              v-if="service.image"
              :src="service.image"
              alt=""
              class="w-[100px] h-[100px] rounded-lg object-cover"
            />
            <div class="flex-1">
              <label class="label">Image</label>
              <input
                type="file"
                class="file-input file-input-bordered w-full"
                @change="uploadServiceImage($event.target.files[0], index)"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-lg">
            <div>
              <label class="label">Title</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="service.title"
              />
            </div>

            <div>
              <label class="label">Description</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="service.subtitle"
              />
            </div>
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
                  v-model="service.btn.title"
                />
              </div>
              <div>
                <label class="label text-xs">Button URL</label>
                <input
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full"
                  v-model="service.btn.url"
                />
              </div>
            </div>
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addService">
            add new service
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
