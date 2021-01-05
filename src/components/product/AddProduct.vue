<template>
  <div class="add-product" style="padding-bottom: 50px">
    <EditText
      hintText="Tên sản phẩm"
      v-model:textValue="productName"
      inputType="text"
      className="product-name"
      :errorMsg="errProductName"
      :uuid="uid()"
    />

    <EditText
      hintText="Hình ảnh"
      v-model:textValue="productImage"
      inputType="text"
      className="product-image"
      :errorMsg="errProductImage"
      :uuid="uid()"
    />

    <SelectBox
      className="categories"
      label="Chọn danh mục"
      @DropdownListSelected="updateSelectBox"
      :data="categories"
      :uuid="uid()"
    />

    <div style="width: 100%">
      <CKEditor />
    </div>

    <div class="attr-container">
      <div v-for="attr in attrsProduct" :key="attr.id">
        <component
          :is="attrComponent"
          :key="attr.id"
          v-bind:data="attr"
        ></component>
      </div>
    </div>

    <p style="margin-top: 20px">
      <a href="javascript:void(0)" style="color: #6200ee" @click="addAttribute"
        >Thêm thuộc tính</a
      >
    </p>

    <button
      type="submit"
      @click="addProduct"
      class="mdc-button mdc-button--raised"
      style="float: right; margin-top: 40px"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
      <span class="mdc-button__label">Thêm sản phẩm</span>
    </button>

    <div class="empty" style="height: 40px; width: 100%"></div>
  </div>
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
    // chứa thông tin attributes của 1 sản phẩm
    const attrsProduct = ref([]);

    const productName = ref();
    const errProductName = ref();

    const productImage = ref();
    const errProductImage = ref();

    const attrComponent = ref("ProductAttrs");

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

    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const addAttribute = () => {
      attrsProduct.value.push({
        id: uid(),
        attrName: "",
        size: null,
        price: null,
        promotion: null,
        quantity: null,
      });
    };

    const { getCateList } = useProduct();
    const categories = await getCateList();

    const addProduct = () => {
      attrsProduct.value.forEach((item) => {
        item = restoreAttrObject(item);
        console.log(item);
      });
    };

    const restoreAttrObject = (attr) => {
      let attrName = new mdc.textField.MDCTextField(
        document.querySelector(`#${attr.id} .attr-name`)
      );

      let size = new mdc.textField.MDCTextField(
        document.querySelector(`#${attr.id} .attr-size`)
      );

      let price = new mdc.textField.MDCTextField(
        document.querySelector(`#${attr.id} .attr-price`)
      );

      let promotion = new mdc.textField.MDCTextField(
        document.querySelector(`#${attr.id} .attr-promotion`)
      );

      let quantity = new mdc.textField.MDCTextField(
        document.querySelector(`#${attr.id} .attr-quantity`)
      );

      return {
        id: attr.id,
        attrName: attrName.value,
        size: size.value,
        price: price.value,
        promotion: promotion.value,
        quantity: quantity.value,
      };
    };

    return {
      productName,
      errProductName,
      productImage,
      errProductImage,

      // data
      categories,
      attrComponent,
      attrsProduct,

      // func
      updateSelectBox,
      addAttribute,
      addProduct,
      uid,
    };
  },
};
</script>

<style scoped>
.ck-editor .ck-editor__main .ck-content {
  min-height: 500px;
}
</style>