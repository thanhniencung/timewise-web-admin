
<template>
  <span
    style="display: block; margin-bottom: 15px; color: #666; margin-top: 10px"
    >Mô tả sản phẩm</span
  >
  <div id="editor"></div>
</template>

<script>
import { onMounted, watch, ref, computed } from "vue";

export default {
  name: "CKEditor",
  props: ["productDes"],
  setup(props, { emit }) {
    onMounted(() => {
      ClassicEditor.create(document.querySelector("#editor"))
        .then((editor) => {
          editor.model.document.on("change:data", () => {
            emit("update:productDes", editor.getData());
          });

          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              "200px",
              editor.editing.view.document.getRoot()
            );
          });
        })
        .catch((error) => {});
    });
  },
};
</script>

<style lang="css" scoped>
</style>