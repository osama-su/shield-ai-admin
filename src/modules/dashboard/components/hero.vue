<script setup>
import { reactive, ref } from "vue";

import Editor from "@/components/editor.vue";

import { api_upload_image } from "@/server";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive([...props.data]);

// upload file
function handleUpload(e, index) {
  const file = e.target.files[0];
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form[index].image = res.data.image;
    });
  }
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { hero: form });
}

function removeHeroSection(index) {
  form.splice(index, 1);
}

function addHeroSection() {
  form.push({
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
  });
}
</script>

<template>
  <div>
    <form class="" @submit="handleSubmit">
      <div class="grid gap-[50px]">
        <div
          v-for="(heroSlide, index) in form"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <h6
            class="absolute -top-3 start-3 bg-base-200 px-lg capitalize text-lg text-white"
          >
            section {{ index + 1 }}
          </h6>
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeHeroSection(index)"
            v-if="form.length > 1"
          >
            remove
          </button>
          <div class="grid grid-cols-2 gap-lg">
            <div class="flex items-center gap-lg">
              <img
                v-if="form[index].image"
                :src="form[index].image"
                alt=""
                class="w-[100px] h-[100px] rounded-lg object-cover"
              />
              <div>
                <label class="label" for="background">Background image</label>
                <input
                  id="background"
                  type="file"
                  class="file-input file-input-bordered w-full"
                  @change="handleUpload($event, index)"
                />
              </div>
            </div>

            <div></div>

            <div>
              <label class="label">Title</label>
              <Editor v-model="form[index].title" />
            </div>

            <div>
              <label class="label">Description</label>
              <Editor v-model="form[index].subtitle" />
            </div>

            <div class="col-span-2">
              <label class="label">Button 1</label>

              <div class="grid grid-cols-2 gap-lg">
                <div>
                  <label class="label">Button Title</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    v-model="form[index].btn1.title"
                  />
                </div>
                <div>
                  <label class="label">Button URL</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    v-model="form[index].btn1.url"
                  />
                </div>
              </div>
            </div>

            <div class="col-span-2">
              <label class="label">Button 2</label>

              <div class="grid grid-cols-2 gap-lg">
                <div>
                  <label class="label">Button Title</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    v-model="form[index].btn2.title"
                  />
                </div>
                <div>
                  <label class="label">Button URL</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    v-model="form[index].btn2.url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="mt-md btn btn-active"
        @click="addHeroSection"
      >
        add new section
      </button>

      <div class="col-span-2 flex justify-end mt-lg">
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
