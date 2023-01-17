<script>
  import store from '../../store';
  import Loader from './loader.svelte';
  import ErrorModal from './errorModal.svelte';

  import { saveToStorage } from '../../utils/storage'

  const STEPS = {
    CARBRAND: 'carBrand',
    USER: 'user',
    COMPLITED: 'complited'
  };

  const VALID_CAR_BRANDS = ['Audi', 'BMW', 'Nissan'];
  const VALID_ZIP_CODES = [65000, 66000, 67000, 68000];

  let carBrand = '';
  let zipCode = '';

  let firstName = '';
  let lastName = '';
  let carModel = '';
  let isFirstRegistration = false;

  let activeForm = STEPS.CARBRAND;
  let errorMessage = '';

  $: isValidCarBrand = VALID_CAR_BRANDS.includes(carBrand);
  $: isValidZipCode = VALID_ZIP_CODES.includes(parseInt(zipCode));
  $: isValidUser = firstName && lastName && carModel;

  $: headerText = getHeaderText(activeForm);
  $: stepsProggresClass = getProggresClass(activeForm);

  function getProggresClass(activeForm) {
    if (activeForm === STEPS.USER) {
      return 'steps steps-half';
    } else if (activeForm === STEPS.COMPLITED) {
      return 'steps steps-full';
    }

    return 'steps';
  }

  function getHeaderText(activeForm) {
    if (activeForm === STEPS.CARBRAND) {
      return 'Choose car brand?';
    }
    
    if (activeForm === STEPS.USER) {
      return 'What is your personal information?';
    } 

    return 'Preparing your car';
  } 

  function goBack() {
    activeForm = STEPS.CARBRAND;
  }

  function goNext() {
    if (activeForm === STEPS.USER) {
      if(!isValidUser) {
        errorMessage = 'Please enter valid user data';
        return;
      }

      activeForm = STEPS.COMPLITED;
      store.setUserData({ firstName, lastName, carModel, isFirstRegistration });
    } else {
      if (!isValidCarBrand || !isValidZipCode) {
        let message = '';
        !isValidCarBrand && (message += `Car brand: ${carBrand} -`);
        !isValidZipCode && (message += `Zip code: ${zipCode} -`);

        errorMessage = `${message} ${!isValidCarBrand && !isValidUser ? 'are' : 'is'} unfortunately not serviced`;
        return;
      }

      activeForm = STEPS.USER;
      store.setCarData({ carBrand, zipCode });
    }
  }

  function saveData() {
    store.subscribe(data => {
      saveToStorage('data', data);
    })
  }
  
</script>

<div class="sign-up">
  <div class="form-container">
    <div class="{stepsProggresClass}">
      <span class="step step-active">1</span>
      <span class="step {activeForm === STEPS.USER || activeForm === STEPS.COMPLITED ? 'step-active': ''}">2</span>
      <span class="step {activeForm === STEPS.COMPLITED ? 'step-active': ''}">3</span>
    </div>
    <div class="form-header">
      <h1>{headerText}</h1>
    </div>
    <form class="form {activeForm === STEPS.CARBRAND ? 'form-active' : ''}">
      <div class="form-field">
        <label for="car-brand" class="form-label">
          Car Brand:
        </label>
        <input type="text" bind:value={carBrand} id="car-brand" class="form-input"/>
      </div>
      <div class="form-field">
        <label for="car-zip" class="form-label">
          Zip Code:
        </label>
        <input type="text" bind:value={zipCode} id="car-zip" class="form-input" />
      </div>
    </form>

    <form class="form {activeForm === STEPS.USER ? 'form-active' : ''}">
      <div class="form-field">
        <label for="first-name" class="form-label">
          First Name:
        </label>
        <input type="text" bind:value={firstName} id="first-name" class="form-input"/>
      </div>
      <div class="form-field">
        <label for="last-name" class="form-label">
          Last Name:
        </label>
        <input type="text" bind:value={lastName} id="last-name" class="form-input"/>
      </div>
      <div class="form-field">
        <label for="car-model" class="form-label">
          Car Model:
        </label>
        <input type="text" bind:value={carModel} id="car-model" class="form-input"/>
      </div>
      <div class="form-field">
        <label for="first-registration" class="form-label">
          First Registration:
        </label>
        <input type="checkbox" bind:checked={isFirstRegistration} id="first-registration" class="form-input"/>
      </div>
    </form>

    {#if errorMessage}
      <ErrorModal {errorMessage} on:close={() => errorMessage = ''} />
    {/if }

    {#if activeForm === STEPS.COMPLITED}
      <Loader on:save={saveData} />
    {/if}

    <div class="buttons">
      {#if activeForm === STEPS.USER}
        <button type="button" on:click={goBack} class="button">Back</button>
      {/if}
      <button type="button" on:click={goNext} class="button button-next">Next</button>
    </div>
  </div> 

</div>

<style type="text/scss">
  @import '../../styles/common.scss';

  .sign-up {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #6f6ad3;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    width: 100%; 
    padding: 40px;
    border-radius: 4px;
    background: #fff;
  }

  .form-header {
    margin-bottom: 40px;
    font-size: x-large;
    font-weight: 700;
    text-transform: uppercase;
  }

  .form {
    display: none;
    min-width: 300px;
    max-width: 300px;
    width: 100%;
    margin-bottom: 20px;
  }

  .form-active {
    display: block;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .form-label {
    margin-bottom: 5px;
    display: block;
    color: #666;
    font-size: 12px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-input[type="checkbox"] {
    width: 14px;
    margin-left: 0;
  }

  .buttons {
    display: flex;
    max-width: 300px;
    width: 100%;
  }

  .button {
    width: 100px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background: #6f6ad3;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  .button:hover {
    background: #5e59c2;
  }

  .button-next {
    margin-left: auto;
  }

  .steps {
    position: relative;
    display: flex;
    max-width: 250px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .steps::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    display: block;
    height: 2px;
    background: #ccc;
  }

  .steps::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 2px;
    transform: translateY(-50%);
    background: #5e59c2;
    transition: width 0.4s ease-in-out;
  }

  .steps-half::after {
    width: 50%;
  }

  .steps-full::after {
    width: 100%;
  }

  .step {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #c1c1c1;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    z-index: 1;
  }
  
  .step-active {
    background: #5e59c2;
    transition: background 0.2s ease-in-out 0.4s;
  }

</style>