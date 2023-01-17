<script>
  import store from "../../store";

  export let fullName;
  export let fullCarModel;
</script>

<div class="product-details">
  <h2>
    <i>Full Name:</i> {fullName}
  </h2>
  <p>
    <i>Car:</i> {fullCarModel}
  </p>
  <div class="product-details-block">
    <div class="product-details-item">
      <span class="product-label">First Name:</span>
      <span>{$store.userData.firstName}</span>
    </div>
    <div class="product-details-item">
      <span class="product-label">Second Name:</span>
      <span>{$store.userData.lastName}</span>
    </div>
    <div class="product-details-item">
      <span class="product-label">Car Model:</span>
      <span>{$store.userData.carModel}</span>
    </div>
  </div>

  <div class="product-details-block">
    <div class="product-details-item">
      <span class="product-label">Car Brand:</span>
      <span>{$store.carData.carBrand}</span>
    </div>
    <div class="product-details-item">
      <span class="product-label">Zip Code:</span>
      <span>{$store.carData.zipCode}</span>
    </div>
    <div class="product-details-item">
      <span class="product-label">Is First Registration:</span>
      <span>{$store.userData.isFirstRegistration ? "Yes" : "No"}</span>
    </div>
  </div>
</div>

<style>
  .product-details {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .product-details-block {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  .product-details-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .product-details-item {
    width: 30%;
    margin-right: 10px;
  }

  .product-label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
</style>
