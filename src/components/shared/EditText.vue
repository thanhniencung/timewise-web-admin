<template>
  <div class="input-container">
    <label
      :class="[
        'mdc-text-field mdc-text-field--filled ' + className + ' ' + uuid,
      ]"
    >
      <span class="mdc-text-field__ripple"></span>
      <input
        class="mdc-text-field__input"
        :type="inputType"
        :value="textValue"
        @input="updateInputValue($event.target.value)"
        aria-labelledby="my-label-id"
      />
      <span class="mdc-floating-label" id="my-label-id">{{ hintText }}</span>
      <span class="mdc-line-ripple"></span>
    </label>
    <p
      v-if="errorMsg"
      style="
        margin-bottom: 20px;
        margin-top: -25px;
        color: red;
        font-size: 15px;
        display: block;
        line-height: 22px;
      "
    >
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
import { onMounted, watch, ref, computed } from "vue";

export default {
  name: "EditText",
  props: [
    "inputType",
    "errorText",
    "textValue",
    "hintText",
    "className",
    "errorMsg",
    "uuid",
  ],
  setup(props, { emit }) {
    onMounted(() => {
      let editText = new mdc.textField.MDCTextField(
        document.querySelector(`.${props.uuid}`)
      );
    });

    const updateInputValue = (value) => {
      emit("update:textValue", value);
    };

    return {
      updateInputValue,
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