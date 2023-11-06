<script setup>
import { reactive } from "vue";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive(props.data);

function removeLink(index) {
  form.splice(index, 1);
}

function addLink() {
  form.push({
    title: "",
    url: "",
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { helpLinks: form });
}

// ****************************************************************
</script>

<template>
  <div>
    <form class="grid grid-cols-2 gap-lg" @submit="handleSubmit">
      <!-- features  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Help Links</label>
        </li>
        <li
          v-for="(link, index) in form"
          :key="index"
          class="border border-white/10 p-lg relative"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeLink(index)"
            v-if="form.length > 1"
          >
            remove
          </button>
          <div>
            <label class="label">Title</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="link.title"
            />
          </div>
          <div>
            <label class="label">URL</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="link.url"
            />
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addLink">
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
