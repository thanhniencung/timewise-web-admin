<template>
  <EditText
    hintText="Tên sản phẩm"
    v-model:textValue="productName"
    inputType="text"
    className="product-name"
    :errorMsg="errProductName"
  />
  <EditText
    hintText="Hình ảnh"
    v-model:textValue="productImage"
    inputType="text"
    className="product-image"
    :errorMsg="errProductImage"
  />
  <SelectBox
    className="categories"
    label="Chọn danh mục"
    @DropdownListSelected="updateSelectBox"
    :data="categories"
  />
</template>

<script>
import { ref } from "vue";
import EditText from "../shared/EditText.vue";
import SelectBox from "../shared/SelectBox.vue";

export default {
  name: "AddProduct",
  components: { EditText, SelectBox },
  setup() {
    const productName = ref();
    const errProductName = ref();

    const productImage = ref();
    const errProductImage = ref();

    const updateSelectBox = async (payload) => {};

    const categories = [
      {
        id: 1,
        value: "Abc",
      },
      {
        id: 2,
        value: "def",
      },
    ];

    return {
      productName,
      errProductName,
      productImage,
      errProductImage,

      // data
      categories,

      // func
      updateSelectBox,
    };
  },
};
</script>
