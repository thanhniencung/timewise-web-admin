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

  <div style="width: 100%">
    <CKEditor />
  </div>

  <div class="attr-container"></div>

  <ProductAttrs />

  <p style="margin-top: 20px">
    <a href="#" style="color: #6200ee" @click="addAttribute">Thêm thuộc tính</a>
  </p>

  <button
    type="submit"
    class="mdc-button mdc-button--raised"
    style="float: right; margin-top: 40px"
  >
    <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
    <span class="mdc-button__label">Thêm sản phẩm</span>
  </button>
</template>

<script>
import { ref } from "vue";
import EditText from "../shared/EditText.vue";
import SelectBox from "../shared/SelectBox.vue";
import CKEditor from "../shared/CKEditor.vue";
import ProductAttrs from "../shared/ProductAttrs.vue";

import { useProduct } from "../../stores/productStore.js";

export default {
  name: "AddProduct",
  components: {
    EditText,
    SelectBox,
    CKEditor,
    ProductAttrs,
  },
  async setup() {
    const productName = ref();
    const errProductName = ref();

    const productImage = ref();
    const errProductImage = ref();

    const onEditorReady = (editor) => {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    };

    const updateSelectBox = async (payload) => {};

    const addAttribute = () => {
      console.log("ahihi");
    };

    const { getCateList } = useProduct();

    const categories = await getCateList();

    return {
      productName,
      errProductName,
      productImage,
      errProductImage,

      // data
      categories,

      // func
      updateSelectBox,
      addAttribute,
    };
  },
};
</script>
<style scoped>
.ck-editor .ck-editor__main .ck-content {
  min-height: 500px;
}
</style>