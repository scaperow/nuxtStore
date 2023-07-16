<template>
  <div class="container">
    sdfsdf
    <button class="btn" onclick="orderModal.showModal()">open modal</button>
    <dialog id="orderModal" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script  setup>
import { onMounted } from 'vue';
import { useContext, useRouter } from "@nuxtjs/composition-api";

const { $axios } = useContext();
const router = useRouter();

const checkSession = async () => {
  try {
    await $axios.get("/user/checkSession");

    setTimeout(async () => await checkSession(), 1000 * 60 * 1200);
  } catch (error) {
    router.push('/login');
  }
};

onMounted(() => {
  checkSession();
});

</script>
