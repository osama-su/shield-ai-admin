<script setup>
import { reactive } from "vue";

import Editor from "@/components/editor.vue";

import { api_upload_image } from "@/server";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive({
  ...props.data,
});

function uploadBlogImage(file, index) {
  if (file) {
    const fd = new FormData();
    fd.append("image", file);
    api_upload_image(fd).then((res) => {
      form.blogs[index].image = res.data.image;
    });
  }
}

function removeBlog(index) {
  form.blogs.splice(index, 1);
}

function addBlog() {
  form.blogs.push({
    title: "",
    image: "",
    subtitle: "",
    updated_at: new Date().toLocaleString(),
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { latestBlog: form });
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

      <!-- features  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Blogs</label>
        </li>
        <li
          v-for="(blog, index) in form.blogs"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeBlog(index)"
            v-if="form.blogs.length > 1"
          >
            remove
          </button>
          <div class="flex items-center gap-lg">
            <img
              v-if="blog.image"
              :src="blog.image"
              alt=""
              class="w-[100px] h-[100px] rounded-lg object-cover"
            />
            <div class="flex-1">
              <label class="label">Image</label>
              <input
                type="file"
                class="file-input file-input-bordered w-full"
                @change="uploadBlogImage($event.target.files[0], index)"
              />
            </div>
          </div>

          <div>
            <label class="label">Title</label>
            <Editor v-model="blog.title" />
          </div>

          <div>
            <label class="label">Description</label>
            <Editor v-model="blog.subtitle" />
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addBlog">
            add new blog
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
