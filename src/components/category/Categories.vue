<template>
  <div
    class="top-container"
    style="width: 100%; margin-bottom: 15px; height: 40px"
  >
    <button
      type="submit"
      @click="showCateList()"
      v-if="showBtnCateList"
      class="mdc-button mdc-button__ripple"
      style="float: left"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true"
        >arrow_back</i
      >
      <span class="mdc-button__label">Danh sách danh mục</span>
    </button>

    <button
      type="submit"
      @click="showAddCate()"
      v-if="showBtnAddCate"
      class="mdc-button mdc-button--raised"
      style="float: right"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
      <span class="mdc-button__label">Thêm danh mục</span>
    </button>
  </div>
  <component
    :is="currentTabComponent"
    v-bind="editCate"
    @addCateSuccess="addCateSuccess"
    @editCateById="editCateById"
  ></component>
</template>

<script>
import { onMounted, ref } from "vue";
import AddCate from "./AddCate.vue";
import CateList from "./CateList.vue";

export default {
  name: "Categories",
  components: {
    AddCate,
    CateList,
  },
  setup(props, { emit }) {
    // Thông tin cate muốn edit
    let editCate = ref();

    let currentTabComponent = ref("CateList");
    let showBtnCateList = ref(false);
    let showBtnAddCate = ref(true);

    const showAddCate = () => {
      showBtnCateList.value = true;
      showBtnAddCate.value = false;
      currentTabComponent.value = "AddCate";
    };

    const showCateList = () => {
      // khi tới màn hình danh sách danh mục thì reset currentCate
      editCate.value = { currentCate: null };

      showBtnCateList.value = false;
      showBtnAddCate.value = true;
      currentTabComponent.value = "CateList";
    };

    // Xử lý event addCateSuccess
    const addCateSuccess = (added) => {
      showBtnCateList.value = true;
      showBtnAddCate.value = false;
      currentTabComponent.value = "CateList";
    };

    // Xử lý event editCateById
    const editCateById = (cate) => {
      showBtnCateList.value = true;
      showBtnAddCate.value = false;
      currentTabComponent.value = "AddCate";
      editCate.value = { editCateData: cate };
    };

    return {
      editCate,
      currentTabComponent,
      showCateList,
      showAddCate,
      showBtnCateList,
      showBtnAddCate,
      addCateSuccess,
      editCateById,
    };
  },
};
</script>

