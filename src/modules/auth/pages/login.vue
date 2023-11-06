<script setup>
import { reactive, ref } from "vue";

import { useRouter } from "vue-router";

import { api_login } from "@/server";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const isSubmitting = ref(false);

function handleSubmit(e) {
  e.preventDefault();
  isSubmitting.value = true;
  api_login(form)
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      router.replace("/");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
}
</script>

<template>
  <div class="">
    <div class="hero-content flex-col lg:flex-row-reverse gap-8">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6 leading-7">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <form
        @submit="handleSubmit"
        class="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100"
      >
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              class="input input-bordered"
              v-model="form.email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Password"
              class="input input-bordered"
              v-model="form.password"
            />
            <!-- <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label> -->
          </div>
          <div class="form-control mt-6">
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="isSubmitting"
            >
              Login
              <span
                v-if="isSubmitting"
                class="loading loading-dots loading-sm"
              ></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
