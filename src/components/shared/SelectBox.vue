<template>
  <div :class="['mdc-select mdc-select--filled ' + className]">
    <div class="mdc-select__anchor">
      <span class="mdc-select__ripple"></span>
      <span class="mdc-select__selected-text"></span>
      <span class="mdc-select__dropdown-icon">
        <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
          <polygon
            class="mdc-select__dropdown-icon-inactive"
            stroke="none"
            fill-rule="evenodd"
            points="7 10 12 15 17 10"
          />
          <polygon
            class="mdc-select__dropdown-icon-active"
            stroke="none"
            fill-rule="evenodd"
            points="7 15 12 10 17 15"
          />
        </svg>
      </span>
      <span class="mdc-floating-label">{{ label }}</span>
      <span class="mdc-line-ripple"></span>
    </div>

    <div
      class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth"
    >
      <ul class="mdc-list">
        <li
          class="mdc-list-item mdc-list-item--disabled"
          aria-selected="false"
          :data-value="selectedObjectValue.id"
          aria-disabled="true"
          role="option"
        >
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">
            {{ selectedObjectValue.value }}
          </span>
        </li>

        <li
          v-for="item in data"
          class="mdc-list-item"
          aria-selected="false"
          :data-value="item.id"
          :key="item.value"
          role="option"
        >
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, ref } from "vue";

export default {
  name: "SelectBox",
  props: {
    className: String,
    label: String,
    data: Array,
  },
  setup(props, { emit }) {
    let selectedObjectValue = ref();
    let selectData = ref();

    selectData.value = props.data;

    if (!props.selectedObject) {
      selectedObjectValue.value = props.data[0];
    } else {
      selectedObjectValue.value = props.selectedObject;
    }

    onMounted(() => {
      let dropdownList = new mdc.select.MDCSelect(
        document.querySelector(`.${props.className}`)
      );
      dropdownList.listen("MDCSelect:change", () => {
        emit("DropdownListSelected", {
          code: props.code,
          id: dropdownList.value,
        });
      });
    });

    return {
      selectedObjectValue,
    };
  },
};
</script>

<style lang="css" scoped>
.mdc-select {
  width: 100%;
  margin-bottom: 30px;
}
</style>