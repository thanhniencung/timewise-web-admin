<template>
  <div
    :id="data.id"
    class="attrs"
    style="
      border-bottom: 3px dotted #5300e8;
      border-top: 1px solid #e4e4e4;
      border-left: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      border-radius: 8px;
      margin-top: 20px;
      margin-bottom: 40px;
      padding: 10px;
      background-color: #eee6ff;
    "
  >
    <button
      type="submit"
      class="mdc-button mdc-button--raised"
      style="float: right; margin-bottom: 12px"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">delete</i>
      <span class="mdc-button__label">Xóa thuộc tính</span>
    </button>

    <EditText
      hintText="Tên thuộc tính"
      v-model:textValue="attrName"
      inputType="text"
      className="attr-name"
      :errorMsg="errAttrName"
      :uuid="uid()"
    />

    <EditText
      hintText="Size"
      v-model:textValue="size"
      inputType="number"
      className="attr-size"
      :errorMsg="errSize"
      :uuid="uid()"
    />

    <EditText
      hintText="Giá"
      v-model:textValue="price"
      inputType="number"
      className="attr-price"
      :errorMsg="errPrice"
      :uuid="uid()"
    />

    <EditText
      hintText="% khuyến mãi"
      v-model:textValue="promotion"
      inputType="number"
      className="attr-promotion"
      :errorMsg="errPromotion"
      :uuid="uid()"
    />

    <EditText
      hintText="Số lượng"
      v-model:textValue="quantity"
      inputType="number"
      className="attr-quantity"
      :errorMsg="errQuantity"
      :uuid="uid()"
    />
  </div>
</template>

<script>
import { onMounted, watch, ref, computed } from "vue";
import EditText from "../shared/EditText.vue";

export default {
  name: "ProductAttrs",
  props: ["data"],
  components: {
    EditText,
  },
  setup(props, { emit }) {
    let data = props.data;
    let attr = null;

    const attrName = ref(data.attrName);
    const errAttrName = ref();

    const size = ref(data.size);
    const errSize = ref();

    const price = ref(data.price);
    const errPrice = ref();

    const promotion = ref(data.promotion);
    const errPromotion = ref();

    const quantity = ref(data.quantiry);
    const errQuantity = ref();

    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    return {
      attrName,
      errAttrName,
      size,
      errSize,
      price,
      errPrice,
      promotion,
      errPromotion,
      quantity,
      errQuantity,

      //func
      uid,
    };
  },
};
</script>

<style lang="css" scoped>
.input-container {
  width: 100% !important;
}
.mdc-text-field {
  margin-bottom: 30px;
  width: 100%;
}
</style>