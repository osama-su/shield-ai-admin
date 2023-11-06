<script setup>
import { reactive } from "vue";

import Editor from "@/components/editor.vue";

import { api_upload_image } from "@/server";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive({
  ...props.data,
});

function uploadBenefitImage(file, index) {
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form.benefits[index].image = res.data.image;
    });
  }
}

function removeBenefit(index) {
  form.benefits.splice(index, 1);
}

function addBenefit() {
  form.benefits.push({
    title: "",
    image: "",
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { benefits: form });
}

// ****************************************************************
</script>

<template>
  <div>
    <form class="grid grid-cols-2 gap-lg" @submit="handleSubmit">
      <div>
        <label class="label">Title</label>
        <Editor v-model="form.title" />
      </div>

      <div>
        <label class="label">Description</label>
        <Editor v-model="form.subtitle" />
      </div>

      <div class="col-span-2 grid grid-cols-2 gap-lg">
        <div>
          <label class="label">Button Title</label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="form.btn.title"
          />
        </div>
        <div>
          <label class="label">Button URL</label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="form.btn.url"
          />
        </div>
      </div>

      <!-- features  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Benefits</label>
        </li>
        <li
          v-for="(benefit, index) in form.benefits"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeBenefit(index)"
            v-if="form.benefits.length > 1"
          >
            remove
          </button>
          <div class="flex items-center gap-lg">
            <img
              v-if="benefit.image"
              :src="benefit.image"
              alt=""
              class="w-[100px] h-[100px] rounded-lg object-cover"
            />
            <div class="flex-1">
              <label class="label">Image</label>
              <input
                type="file"
                class="file-input file-input-bordered w-full"
                @change="uploadBenefitImage($event.target.files[0], index)"
              />
            </div>
          </div>

          <div>
            <label class="label">Title</label>
            <Editor v-model="benefit.title" />
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addBenefit">
            add new benefit
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
