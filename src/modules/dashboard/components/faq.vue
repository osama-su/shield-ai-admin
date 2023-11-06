<script setup>
import { reactive } from "vue";

import Editor from "@/components/editor.vue";

import { api_upload_image } from "@/server";

const emits = defineEmits(["submitForm"]);

const props = defineProps(["data", "isSubmitting"]);

const form = reactive({
  ...props.data,
});

function removeTab(index) {
  form.tabs.splice(index, 1);
}

function removeQuestion(tabIndex, questionIndex) {
  form.tabs[tabIndex].questions.splice(questionIndex, 1);
}

function addTab() {
  form.tabs.push({
    title: "",
    questions: [
      {
        title: "",
        answer: "",
      },
    ],
  });
}

function addQuestion(tabIndex) {
  form.tabs[tabIndex].questions.push({
    title: "",
    answer: "",
  });
}

// // submit
function handleSubmit(e) {
  e.preventDefault();
  emits("submitForm", { faq: form });
}

// ****************************************************************
</script>

<template>
  <div>
    <form class="grid grid-cols-2 gap-lg" @submit="handleSubmit">
      <div class="col-span-2">
        <label class="label">Title</label>
        <Editor v-model="form.title" />
      </div>

      <!-- tabs  -->
      <ul class="col-span-2 grid gap-md">
        <li>
          <label class="label">Tabs</label>
        </li>
        <li
          v-for="(tab, index) in form.tabs"
          :key="index"
          class="border border-white/10 p-lg relative mb-lg"
        >
          <button
            type="button"
            class="btn btn-error absolute -top-lg end-lg"
            @click="removeTab(index)"
            v-if="form.tabs.length > 1"
          >
            remove
          </button>
          <div class="mb-lg">
            <label class="label">Tab Title</label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              v-model="tab.title"
            />
          </div>

          <div class="border-t border-t-white/10 mb-lg"></div>

          <div
            v-for="(question, idx) in tab.questions"
            :key="index + '' + idx"
            class="border border-white/10 p-lg relative ms-lg mb-lg"
          >
            <button
              type="button"
              class="btn btn-error absolute -top-sm end-lg min-h-0 h-[30px] text-xs"
              @click="removeQuestion(index, idx)"
              v-if="tab.questions.length > 1"
            >
              remove
            </button>
            <div class="mb-sm">
              <label class="label">Question Title</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="question.title"
              />
            </div>
            <div>
              <label class="label">Question Answer</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="question.answer"
              />
            </div>
          </div>

          <div class="flex justify-end mt-md">
            <button
              type="button"
              class="btn btn-active"
              @click="addQuestion(index)"
            >
              add new question
            </button>
          </div>
        </li>

        <li>
          <button type="button" class="btn btn-active" @click="addTab">
            add new tab
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
