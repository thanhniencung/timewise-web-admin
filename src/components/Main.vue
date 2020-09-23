<template>
  <!-- Top App Bar -->
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button
          class="mdc-top-app-bar__navigation-icon mdc-icon-button material-icons"
          href="#"
        >menu</button>
        <a
          class="mdc-top-app-bar__title"
          href="https://www.webdenim.io"
          target="_blank"
          style="color: inherit;"
        >Timewise</a>
      </section>
    </div>
  </header>

  <div class="app-drawer-layout mdc-top-app-bar--fixed-adjust">
    <!-- Drawer -->
    <aside class="mdc-drawer mdc-drawer--dismissible demo-drawer">
      <nav class="mdc-drawer__drawer">
        <nav class="mdc-drawer__content">
          <div id="icon-with-text-demo" class="mdc-list">
            <a
              @click="menuItemClicked('Statistics')"
              class="mdc-list-item mdc-list-item--activated"
              href="#"
              aria-current="page"
            >
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">show_chart</i>
              <span class="mdc-list-item__text">Thống kê</span>
            </a>
            <a @click="menuItemClicked('Order')" class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">receipt</i>
              <span class="mdc-list-item__text">Đơn hàng</span>
            </a>
            <a @click="menuItemClicked('Product')" class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">watch</i>
              <span class="mdc-list-item__text">Sản phẩm</span>
            </a>
            <a @click="menuItemClicked('Account')" class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>
              <span class="mdc-list-item__text">Tài khoản</span>
            </a>
            <a @click="menuItemClicked('Settings')" class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
              <span class="mdc-list-item__text">Cài đặt</span>
            </a>
          </div>
        </nav>
      </nav>
    </aside>

    <!-- Content -->
    <main class="mdc-drawer-app-content main-content">
      <component v-bind:is="currentTabComponent"></component>
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import Account from "../components/Account.vue";
import Product from "../components/Product.vue";
import Statistics from "../components/Statistics.vue";
import Order from "../components/Order.vue";
import Settings from "../components/Settings.vue";

export default {
  name: "Main",
  components: {
    Account,
    Product,
    Statistics,
    Order,
    Settings,
  },
  setup() {
    let currentTabComponent = ref("Statistics");

    onMounted(() => {
      // Instantiate MDC Drawer
      const drawerEl = document.querySelector(".mdc-drawer");
      const drawer = new mdc.drawer.MDCDrawer.attachTo(drawerEl);
      drawer.open = true;
      // Instantiate MDC Top App Bar (required)
      const topAppBarEl = document.querySelector(".mdc-top-app-bar");
      const topAppBar = new mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);

      topAppBar.setScrollTarget(document.querySelector(".main-content"));
      topAppBar.listen("MDCTopAppBar:nav", () => {
        drawer.open = !drawer.open;
      });
    });

    const menuItemClicked = (module) => {
      currentTabComponent.value = module;
    };

    return {
      currentTabComponent,
      menuItemClicked,
    };

    return {
      currentTabComponent,
    };
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}
</style>
