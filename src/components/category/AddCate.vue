<template>
  <EditText
    hintText="Tên danh mục"
    v-model:textValue="cateName"
    inputType="text"
    className="cate-name"
    :errorMsg="errCateName"
    :uuid="uid()"
  />
  <EditText
    hintText="Hình ảnh"
    v-model:textValue="cateImage"
    inputType="text"
    className="cate-image"
    :errorMsg="errCateImage"
    :uuid="uid()"
  />

  <button
    type="submit"
    @click="doAddCate()"
    class="mdc-button mdc-button--raised"
    style="float: left"
  >
    <i class="material-icons mdc-button__icon" aria-hidden="true">{{
      btnIconCate
    }}</i>
    <span class="mdc-button__label">{{ btnCateLabel }}</span>
  </button>
</template>

<script>
import { ref, watch } from "vue";
import EditText from "../shared/EditText.vue";
import SelectBox from "../shared/SelectBox.vue";

import { useCate } from "../../stores/cateStore";

export default {
  name: "AddCate",
  components: { EditText, SelectBox },
  props: ["editCateData"],
  setup(props, { emit }) {
    let btnCateLabel = ref("Thêm danh mục");
    let btnIconCate = ref("add");

    const { addCate, updateCate, addCateSuccess } = useCate();

    const cateName = ref(props.editCateData ? props.editCateData.cateName : "");
    const errCateName = ref();

    const cateImage = ref(
      props.editCateData ? props.editCateData.cateImage : ""
    );
    const errCateImage = ref();

    // set trạng thái khi bấm edit danh mục
    if (props.editCateData) {
      btnCateLabel.value = "Cập nhật danh mục";
      btnIconCate.value = "edit";
    }

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
        if (props.editCateData) {
          updateCate({
            cateId: props.editCateData.cateId,
            cateName: cateName.value,
            cateImage: cateImage.value,
          });
          return;
        }
        addCate({
          cateName: cateName.value,
          cateImage: cateImage.value,
        });
      }
    };

    watch(addCateSuccess, (addCateSuccess, prevAddCateSuccess) => {
      if (addCateSuccess) {
        console.log(addCateSuccess);
        emit("addCateSuccess", true);
      }
    });

    // hàm tạo ra id duy nhất cho các thuộc tính của product, phục vụ cho xử lý UI
    // thao tác gì trên html element của phần thuộc tính này thì dựa vào thông số id này
    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    return {
      cateName,
      errCateName,
      cateImage,
      errCateImage,
      btnCateLabel,
      btnIconCate,

      // func
      doAddCate,
      uid,
    };
  },
};
</script>
