<template>
  <div class="response-status">
    <span style="">{{ cateListStatus }}</span>
  </div>
  <div v-if="cateListData !== null" class="mdc-data-table">
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
                width: 100px;
              "
            >
              ...
            </th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <tr
            class="mdc-data-table__row"
            v-for="cate in cateListData"
            :key="cate.id"
          >
            <td
              class="mdc-data-table__cell"
              scope="row"
              style="position: relative"
            >
              <img
                :src="cate.cateImage"
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
            </td>
            <td
              class="mdc-data-table__cell mdc-data-table__cell--numeric"
              style="text-align: left; vertical-align: middle"
            >
              {{ cate.cateName }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatDate(cate.updatedAt) }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              <button
                @click="editCate(cate)"
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >edit</i
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
import { useCate } from "../../stores/cateStore";
import { parseDate } from "../../helper/timeFormat";

export default {
  name: "CateList",

  setup(props, { emit }) {
    const { cateListData, cateListStatus, getCateList } = useCate();

    getCateList();

    const editCate = (cate) => {
      emit("editCateById", cate);
    };

    const formatDate = (d) => {
      return parseDate(d);
    };

    return {
      editCate,
      cateListData,
      cateListStatus,
      formatDate,
    };
  },
};
</script>

<style lang="css" scoped>
.response-status {
  width: 100% !important;
  margin-top: 20px;
  text-align: center;
}
.response-status span {
  color: #666;
  font-size: 23px;
}
</style>
