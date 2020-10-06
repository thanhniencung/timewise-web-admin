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
              class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 100px;
              "
            >
              Giá
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
              Số lượng
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: center;
                vertical-align: middle;
                font-weight: bold;
                width: 150px;
              "
            >
              Khuyến mãi
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 150px;
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
                width: 170px;
              "
            >
              Cập nhật
            </th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <tr class="mdc-data-table__row">
            <th
              class="mdc-data-table__cell"
              scope="row"
              style="position: relative"
            >
              <img
                src="https://salt.tikicdn.com/cache/w80/ts/product/e0/aa/b7/79df464e939c2518d955f9e4a59b52d8.jpg"
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
              Vũ Trụ Trong Vỏ Hạt Dẻ (Tái Bản 2018)
            </td>
            <td
              class="mdc-data-table__cell mdc-data-table__cell--numeric"
              style="text-align: left; vertical-align: middle"
            >
              500.000
            </td>
            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              100
            </td>
            <td
              class="mdc-data-table__cell"
              style="text-align: center; vertical-align: middle"
            >
              <img
                width="25"
                height="25"
                src="https://thumbs.gfycat.com/NearShyBongo-size_restricted.gif"
                alt="sale"
              />
            </td>
            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              Bìa mềm
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              10/10/2020 7:00 AM
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
};
</script>
