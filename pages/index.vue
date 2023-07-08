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

<script>
import { defineComponent } from 'vue';

const checkSession = async () => {
  await this.$axios.get("/user/session?scene=" + this.scene);
  setTimeout(async () => {
    await checkSession();
  }, 1000 * 60 * 1200);
}

export default defineComponent({
  data() {
    return {
     
    }
  },

  async mounted() {
    try {
      checkSession();
    } catch (error) {
      this.$router.push('login');
    }
  },
});
</script>
