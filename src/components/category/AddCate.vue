<template>
  <EditText
    hintText="Tên danh mục"
    v-model:textValue="cateName"
    inputType="text"
    className="cate-name"
    :errorMsg="errCateName"
  />
  <EditText
    hintText="Hình ảnh"
    v-model:textValue="cateImage"
    inputType="text"
    className="cate-image"
    :errorMsg="errCateImage"
  />

  <button
    type="submit"
    @click="doAddCate()"
    class="mdc-button mdc-button--raised"
    style="float: left"
  >
    <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
    <span class="mdc-button__label">Thêm danh mục</span>
  </button>
</template>

<script>
import { ref, watch } from "vue";
import EditText from "../shared/EditText.vue";
import SelectBox from "../shared/SelectBox.vue";

import { useCate } from "../../stores/cateStore";
import { useRouter } from "vue-router";

export default {
  name: "AddCate",
  components: { EditText, SelectBox },
  setup() {
    const router = useRouter();
    const { addCate, addCateSuccess } = useCate();

    const cateName = ref("");
    const errCateName = ref();

    const cateImage = ref("");
    const errCateImage = ref();

    const doAddCate = () => {
      let hasError = false;
      if (cateName.value === "") {
        errCateName.value = "Thông tin bắt buộc";
        hasError = true;
      }

      if (cateImage.value === "") {
        errCateImage.value = "Thông tin bắt buộc";
        hasError = true;
      }

      if (!hasError) {
        addCate({
          cateName: cateName.value,
          cateImage: cateImage.value,
        });
      }
    };

    watch(addCateSuccess, (addCateSuccess, prevAddCateSuccess) => {
      if (addCateSuccess) {
        router.push({
          name: "Main",
          params: {
            focusTargetComponent: "Categories",
          },
        });
      }
    });

    return {
      cateName,
      errCateName,
      cateImage,
      errCateImage,

      // func
      doAddCate,
    };
  },
};
</script>
