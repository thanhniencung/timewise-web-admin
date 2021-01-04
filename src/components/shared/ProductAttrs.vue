<template>
  <div class="attrs" style="border-bottom: 2px dotted #999; margin-top: 20px">
    <EditText
      hintText="Tên thuộc tính"
      v-model:textValue="attrName"
      inputType="text"
      className="attr-name"
      :errorMsg="errAttrName"
    />

    <EditText
      hintText="Size"
      v-model:textValue="size"
      inputType="number"
      className="attr-size"
      :errorMsg="errSize"
    />

    <EditText
      hintText="Giá"
      v-model:textValue="price"
      inputType="number"
      className="attr-price"
      :errorMsg="errPrice"
    />

    <EditText
      hintText="% khuyến mãi"
      v-model:textValue="promotion"
      inputType="number"
      className="attr-promotion"
      :errorMsg="errPromotion"
    />

    <EditText
      hintText="Số lượng"
      v-model:textValue="quantity"
      inputType="number"
      className="attr-quantity"
      :errorMsg="errQuantity"
    />
  </div>
</template>

<script>
import { onMounted, watch, ref, computed } from "vue";
import EditText from "../shared/EditText.vue";

export default {
  name: "ProductAttrs",
  components: {
    EditText,
  },
  setup(props, { emit }) {
    onMounted(() => {});

    const attrName = ref();
    const errAttrName = ref();

    const size = ref();
    const errSize = ref();

    const price = ref();
    const errPrice = ref();

    const promotion = ref();
    const errPromotion = ref();

    const quantity = ref();
    const errQuantity = ref();

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