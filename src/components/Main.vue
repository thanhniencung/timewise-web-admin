<template>
  <!-- Top App Bar -->
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
      >
        <button
          class="mdc-top-app-bar__navigation-icon mdc-icon-button material-icons"
          href="#"
        >
          menu
        </button>
        <a
          class="mdc-top-app-bar__title"
          href="https://www.webdenim.io"
          target="_blank"
          style="color: inherit"
          >Timewise</a
        >
      </section>

      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
        <button
          @click="logout()"
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          aria-label="power_settings_new"
        >
          power_settings_new
        </button>
      </section>
    </div>
  </header>

  <div class="app-drawer-layout mdc-top-app-bar--fixed-adjust">
    <!-- Drawer -->
    <aside class="mdc-drawer mdc-drawer--dismissible app-drawer">
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
              <i
                class="material-icons mdc-list-item__graphic"
                aria-hidden="true"
                >show_chart</i
              >
              <span class="mdc-list-item__text">Thống kê</span>
            </a>
            <a @click="menuItemClicked('Order')" class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i
                class="material-icons mdc-list-item__graphic"
                aria-hidden="true"
                >receipt</i
              >
              <span class="mdc-list-item__text">Đơn hàng</span>
            </a>
            <a
              @click="menuItemClicked('Product')"
              class="mdc-list-item"
              href="#"
            >
              <span class="mdc-list-item__ripple"></span>
              <i
                class="material-icons mdc-list-item__graphic"
                aria-hidden="true"
                >watch</i
              >
              <span class="mdc-list-item__text">Sản phẩm</span>
            </a>
            <a
              @click="menuItemClicked('Categories')"
              class="mdc-list-item"
              href="#"
            >
              <span class="mdc-list-item__ripple"></span>
              <i
                class="material-icons mdc-list-item__graphic"
                aria-hidden="true"
                >category</i
              >
              <span class="mdc-list-item__text">Danh mục</span>
            </a>
            <a
              @click="menuItemClicked('Account')"
              class="mdc-list-item"
              href="#"
            >
              <span class="mdc-list-item__ripple"></span>
              <i
                class="material-icons mdc-list-item__graphic"
                aria-hidden="true"
                >person</i
              >
              <span class="mdc-list-item__text">Tài khoản</span>
            </a>
            <a
              @click="menuItemClicked('Settings')"
              class="mdc-list-item"
              href="#"
            >
              <span class="mdc-list-item__ripple"></span>
              <i
                class="material-icons mdc-list-item__graphic"
                aria-hidden="true"
                >settings</i
              >
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

import Account from "./account/Account.vue";
import Product from "./product/Product.vue";
import Categories from "./category/Categories.vue";
import Statistics from "../components/Statistics.vue";
import Order from "../components/Order.vue";
import Settings from "../components/Settings.vue";
import router from "../router/router.js";
import { useRoute } from "vue-router";

export default {
  name: "Main",
  components: {
    Account,
    Product,
    Statistics,
    Order,
    Categories,
    Settings,
  },
  setup() {
    const {
      params: { focusTargetComponent },
    } = useRoute();

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

    const logout = () => {
      console.log("logout");
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      router.push("/admin/sign-in");
    };

    return {
      currentTabComponent,
      menuItemClicked,
      logout,
    };
  },
};
</script>

<style scoped>
.app-drawer {
  position: fixed;
}
.main-content {
  padding: 20px;
}
</style>
