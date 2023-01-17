<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let errorMessage = "";

  function closeModal() {
    dispatch('close');
  }
</script>

<div class="error-modal">
  <div
    class="error-modal-overlay"
    on:click={closeModal}
    on:keydown={closeModal}
  />
  <p class="error-modal-message">
    {errorMessage}
  </p>
</div>

<style type="text/scss">
  .error-modal {
    position: fixed;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
  }

  .error-modal-overlay {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: 0.4;
  }

  .error-modal-message {
    position: relative;
    z-index: 2;
    max-width: 500px;
    width: 100%;
    padding: 60px;
    border-radius: 4px;
    background: #fff;
    font-size: 24px;
    line-height: 26px;
  }
</style>
