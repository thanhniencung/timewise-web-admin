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
      @DropdownListSelected="dropdownItemSelected"
      :data="categories"
      :selectedObject="cateSelected"
      :uuid="uid()"
    />

    <div style="width: 100%">
      <CKEditor v-model:productDes="productDes" />
    </div>

    <div class="attr-container">
      <div v-for="attr in attrsProduct" :key="attr.id">
        <component
          v-if="!attr.deleted"
          :is="attrComponent"
          :key="attr.id"
          v-bind:data="attr"
          @removeAttribute="removeAttribute"
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
      @click="submitAddProduct"
      class="mdc-button mdc-button--raised"
      style="float: right; margin-top: 40px"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
      <span class="mdc-button__label">{{ submitBtnLabel }}</span>
    </button>

    <div class="empty" style="height: 40px; width: 100%"></div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
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
  props: ["editProductData"],
  async setup(props, { emit }) {
    console.log(props.editProductData);
    const submitBtnLabel = ref("Thêm sản phẩm");
    if (props.editProductData) {
      submitBtnLabel.value = "Cập nhật sản phẩm";
    }
    // hàm tạo ra id duy nhất cho các thuộc tính của product, phục vụ cho xử lý UI
    // thao tác gì trên html element của phần thuộc tính này thì dựa vào thông số id này
    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    // chứa thông tin attributes của 1 sản phẩm
    const attrsProduct = ref([]);
    if (props.editProductData) {
      attrsProduct.value = props.editProductData.attributes;
      attrsProduct.value.map((item) => {
        item.id = item.attrId;
        item.deleted = false;
        return item;
      });
    }

    const productName = ref(
      props.editProductData ? props.editProductData.productName : ""
    );
    const errProductName = ref();

    const productImage = ref(
      props.editProductData ? props.editProductData.productImage : ""
    );
    const errProductImage = ref();

    const cateSelected = ref();

    const productDes = ref(
      props.editProductData ? props.editProductData.description : ""
    );

    const attrComponent = ref("ProductAttrs");

    // Lấy về danh sách danh mục
    const {
      getCateList,
      addProduct,
      updateProduct,
      deleteProductAttrById,
      addProductSuccess,
    } = useProduct();
    const categories = await getCateList();

    // Lấy mặc định giá trị đầu tiền của danh sách danh mục
    if (categories.length > 0) {
      if (props.editProductData) {
        cateSelected.value = {
          id: props.editProductData.cateId,
          value: props.editProductData.cateName,
        };
      } else {
        cateSelected.value = categories[0];
      }
    }

    // event khi thay đổi giá trị select box, khi thay đổi thì update giá trị mới cho cateSelected
    const dropdownItemSelected = async (payload) => {
      cateSelected = payload.id;
    };

    const addAttribute = () => {
      attrsProduct.value.push({
        id: uid(),
        attrId: null,
        attrName: "",
        size: null,
        price: null,
        promotion: null,
        quantity: null,
        deleted: false,
      });
    };

    const submitAddProduct = () => {
      if (!cateSelected) {
        console.log("Yêu cầu danh mục");
        return;
      }

      let attrs = [];
      attrsProduct.value.forEach((item) => {
        const restoreItem = restoreAttrObject(item);
        if (restoreItem != null) {
          attrs.push(restoreAttrObject(item));
        }
      });

      const collectProductFormData = {
        productId: props.editProductData
          ? props.editProductData.productId
          : null,
        productName: productName.value,
        productImage: productImage.value,
        cateId: cateSelected.value.id,
        description: productDes.value,
        collectionId: "1", // giá trị này là hardcode do hệ thống chỉ bán đồng hồ, nếu mở rộng bán sản phẩm khác thì giá trị này sẽ thay đổi
        attributes: attrs,
      };

      if (props.editProductData) {
        console.log("START UPDATE PRODUCT");
        console.log(collectProductFormData);
        console.log("END UPDATE PRODUCT");
        updateProduct(collectProductFormData);
        return;
      }
      addProduct(collectProductFormData);
    };

    // Xử lý khi người dùng click vào nút xóa thuộc tính
    // Chú ý khi bấm nút xóa thuộc tính thì nếu thêm mới thuộc tính ko call api
    const removeAttribute = async (attrId) => {
      console.log(attrId);

      // check id này có thuốc tính attribute id ko
      const len = attrsProduct.value.length;
      let found = false;

      for (let i = 0; i < len; i++) {
        if (attrsProduct.value[i].attrId == attrId) {
          found = true;

          console.log("delete call api");
          const deleteOk = await deleteProductAttrById(attrId);
          if (deleteOk) {
            removeAttrUI(attrId);
          } else {
            // hiển thị thông báo lỗi
            console.log("delete failed");
          }
          break;
        }
      }

      if (!found) {
        console.log("delete ko call api");
        removeAttrUI(attrId);
      }
    };

    const removeAttrUI = (attrId) => {
      var removeIndex = attrsProduct.value
        .map(function (item) {
          return item.id;
        })
        .indexOf(attrId);
      console.log(removeIndex);
      attrsProduct.value[removeIndex].deleted = true;
    };

    // khi người dùng bấm thêm thuộc tính và nhập vào các thông tin
    // thì chúng ta sẽ gom các thông số người dùng nhập lại và build ra object thuộc tính
    // phục vụ cho việc submit form thêm sản phẩm
    const restoreAttrObject = (attr) => {
      try {
        let attrName = new mdc.textField.MDCTextField(
          document.querySelector(`#attr-${attr.id} .attr-name`)
        );

        let size = new mdc.textField.MDCTextField(
          document.querySelector(`#attr-${attr.id} .attr-size`)
        );

        let price = new mdc.textField.MDCTextField(
          document.querySelector(`#attr-${attr.id} .attr-price`)
        );

        let promotion = new mdc.textField.MDCTextField(
          document.querySelector(`#attr-${attr.id} .attr-promotion`)
        );

        let quantity = new mdc.textField.MDCTextField(
          document.querySelector(`#attr-${attr.id} .attr-quantity`)
        );

        return {
          id: attr.attrId,
          attrId: attr.attrId, //props.editProductData ? props.editProductData.attrId : null,
          attrName: attrName.value,
          size: parseInt(size.value),
          price: parseInt(price.value),
          promotion: parseInt(promotion.value),
          quantity: parseInt(quantity.value),
        };
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    watch(addProductSuccess, (addProductSuccess, prevAddProductSuccess) => {
      if (addProductSuccess) {
        console.log(addProductSuccess);
        emit("addProductSuccess", true);
      }
    });

    return {
      productName,
      errProductName,
      productImage,
      errProductImage,
      productDes,
      cateSelected,
      submitBtnLabel,

      // data
      categories,
      attrComponent,
      attrsProduct,

      // func
      dropdownItemSelected,
      addAttribute,
      submitAddProduct,
      removeAttribute,
      uid,
    };
  },
};
</script>