<script>
  import { onMount } from 'svelte';
  import store from '../../store';
  import { getFromStorage } from '../../utils/storage';
  import ResultV1 from './resultV1.svelte';
  import ResultV2 from './resultV2.svelte';

  let activeVersion = null;
  let fullName = '';
  let fullCarModel = '';

  onMount(() => {
    const data = getFromStorage('data');

    if (data.carData) {
      store.setCarData(data.carData);
    }
    
    if (data.userData) {
      store.setUserData(data.userData);
    }
    
    fullName = `${data.userData.firstName} ${data.userData.lastName}`
    fullCarModel = `${data.carData.carBrand}, ${data.userData.carModel}`;
    getRandomVersion();
  });

  function getRandomVersion() {
    // get random number between 0 and 2
    const randomVersion = Math.floor(Math.random() * 2);

    if (randomVersion) {
      activeVersion = 'v1';
    } else {
      activeVersion = 'v2';
    }
  }
</script>

<div class="product-container">
  {#if activeVersion === 'v1'}
    <ResultV1 />
  {:else if activeVersion === 'v2'}
    <ResultV2 {fullName} {fullCarModel} />
  {/if}
</div>

<style type='text/scss'>
  .product-container {
    width: 50%;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
