<script setup>
import { reactive } from "vue";

import Editor from "@/components/editor.vue";

import { api_upload_image } from "@/server";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive({
  ...props.data,
});

// upload file -> logo
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

function uploadSocialImage(file, index) {
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form.socials[index].image = res.data.image;
    });
  }
}

function removeSocial(index) {
  form.socials.splice(index, 1);
}

function addSocial() {
  form.socials.push({
    title: "",
    image: "",
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { info: form });
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
          <label class="label" for="footer-logo-iamge">Logo</label>
          <input
            id="footer-logo-iamge"
            type="file"
            class="file-input file-input-bordered w-full"
            @change="handleUpload"
          />
        </div>
      </div>

      <div>
        <label class="label">Title</label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="form.title"
        />
      </div>

      <div>
        <label class="label">Phone</label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="form.phone"
        />
      </div>

      <div>
        <label class="label">Email</label>
        <input
          type="email"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="form.email"
        />
      </div>

      <div>
        <label class="label">Address</label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          v-model="form.address"
        />
      </div>

      <!-- features  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Social</label>
        </li>
        <li
          v-for="(social, index) in form.socials"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeSocial(index)"
            v-if="form.socials.length > 1"
          >
            remove
          </button>
          <div class="flex items-center gap-lg">
            <img
              v-if="social.image"
              :src="social.image"
              alt=""
              class="w-[100px] h-[100px] rounded-lg object-cover"
            />
            <div class="flex-1">
              <label class="label">Image</label>
              <input
                type="file"
                class="file-input file-input-bordered w-full"
                @change="uploadSocialImage($event.target.files[0], index)"
              />
            </div>
          </div>

          <div>
            <label class="label">URL</label>
            <input
              type="url"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="social.url"
            />
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addSocial">
            add new social
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
