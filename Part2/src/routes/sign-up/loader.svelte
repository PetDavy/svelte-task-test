<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const LOAD_TIME = 6;
  let progress = 0;

  onMount(() => {
    const interval = setInterval(() => {
      progress += 1;
      if (progress >= 100) {
        clearInterval(interval);
        dispatch('save')

        setTimeout(() => {
          window.location.href = '/result';
        }, 1000);
      }
    }, LOAD_TIME * 10);    
  });
</script>
<div class="progress-modal">
  <div class="progress-bar-container">
    <h2 class="progress-bar-title">Signing Up</h2>
    <div class="progress-bar">
      <div class="bar" style="width: {progress}%;"></div>
    </div>
  </div>
</div>

<style type="text/scss">
.progress-modal {
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
}

.progress-bar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  border-radius: 4px;
  background: #fff;
}

.progress-bar-title {
  margin-bottom: 40px;
  font-size: x-large;
  font-weight: 700;
  text-transform: uppercase;
}

.progress-bar {
  width: 100%; /* Full width */
  height: 30px; /* Height */
  background-color: #f5f5f5; /* Gray background */
  border-radius: 5px; /* Rounded corners */
}

.progress-bar .bar {
  height: 100%; /* Full height */
  background-color: #4CAF50; /* Green background */
  border-radius: 5px; /* Rounded corners */
  transition: width 0.5s; /* Transition effect when changing width */
}

</style>