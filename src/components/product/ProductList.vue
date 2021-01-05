<template>
  <div class="mdc-data-table">
    <div class="mdc-data-table__table-container">
      <table
        class="mdc-data-table__table"
        aria-label="Dessert calories"
        style="width: 100%"
      >
        <thead>
          <tr class="mdc-data-table__header-row" style="width: 50px">
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 100px;
              "
            >
              Hình ảnh
            </th>
            <th
              class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
              "
            >
              Tên
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 200px;
              "
            >
              Danh mục
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 200px;
              "
            >
              Cập nhật
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 200px;
              "
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <tr
            v-for="product in products"
            class="mdc-data-table__row"
            :key="product.productId"
          >
            <th
              class="mdc-data-table__cell"
              scope="row"
              style="position: relative"
            >
              <img
                :src="product.productImage"
                width="35"
                height="35"
                style="
                  position: absolute;
                  top: 50%;
                  -ms-transform: translateY(-50%);
                  transform: translateY(-50%);
                  border-radius: 8%;
                "
              />
            </th>
            <td
              class="mdc-data-table__cell mdc-data-table__cell--numeric"
              style="text-align: left; vertical-align: middle"
            >
              {{ product.productName }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ product.cateName }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatDate(product.updatedAt) }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              <button
                type="submit"
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px; margin-right: 10px"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >edit</i
                >
              </button>

              <button
                type="submit"
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >visibility</i
                >
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useProduct } from "../../stores/productStore";
import { parseDate } from "../../helper/timeFormat";

export default {
  name: "ProductList",
  async setup() {
    const { getProductList } = useProduct();
    const products = await getProductList();

    const formatDate = (d) => {
      return parseDate(d);
    };

    return {
      products,
      formatDate,
    };
  },
};
</script>
