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
            <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">show_chart</i>
              <span class="mdc-list-item__text">Thống kê</span>
            </a>
            <a class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">receipt</i>
              <span class="mdc-list-item__text">Đơn hàng</span>
            </a>
            <a class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">watch</i>
              <span class="mdc-list-item__text">Sản phẩm</span>
            </a>
            <a class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>
              <span class="mdc-list-item__text">Tài khoản</span>
            </a>
            <a class="mdc-list-item" href="#">
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
      <div style="padding: 20px">
        <canvas id="chart1"></canvas>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "Main",
  setup() {
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

      function generateData() {
        var unit = "Day";

        function unitLessThanDay() {
          return unit === "second" || unit === "minute" || unit === "hour";
        }

        function beforeNineThirty(date) {
          return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
        }

        // Returns true if outside 9:30am-4pm on a weekday
        function outsideMarketHours(date) {
          if (date.isoWeekday() > 5) {
            return true;
          }
          if (
            unitLessThanDay() &&
            (beforeNineThirty(date) || date.hour() > 16)
          ) {
            return true;
          }
          return false;
        }

        function randomNumber(min, max) {
          return Math.random() * (max - min) + min;
        }

        function randomBar(date, lastClose) {
          var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(
            2
          );
          var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
          return {
            t: date.valueOf(),
            y: close,
          };
        }

        var date = moment("Jan 01 1990", "MMM DD YYYY");
        var now = moment();
        var data = [];
        var lessThanDay = unitLessThanDay();
        for (
          ;
          data.length < 600 && date.isBefore(now);
          date = date.clone().add(1, unit).startOf(unit)
        ) {
          if (outsideMarketHours(date)) {
            if (!lessThanDay || !beforeNineThirty(date)) {
              date = date
                .clone()
                .add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, "day");
            }
            if (lessThanDay) {
              date = date.hour(9).minute(30).second(0);
            }
          }
          data.push(
            randomBar(date, data.length > 0 ? data[data.length - 1].y : 30)
          );
        }

        return data;
      }

      var ctx = document.getElementById("chart1").getContext("2d");
      ctx.canvas.width = 1000;
      ctx.canvas.height = 300;

      var color = Chart.helpers.color;
      var cfg = {
        data: {
          datasets: [
            {
              label: "Thống kê đơn hàng theo ngày",
              backgroundColor: color(window.chartColors.blue).rgbString(),
              borderColor: window.chartColors.blue,
              data: generateData(),
              type: "line",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
          ],
        },
        options: {
          animation: {
            duration: 0,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "series",
                offset: true,
                ticks: {
                  major: {
                    enabled: true,
                    fontStyle: "bold",
                  },
                  source: "data",
                  autoSkip: true,
                  autoSkipPadding: 75,
                  maxRotation: 0,
                  sampleSize: 100,
                },
                afterBuildTicks: function (scale, ticks) {
                  var majorUnit = scale._majorUnit;
                  var firstTick = ticks[0];
                  var i, ilen, val, tick, currMajor, lastMajor;

                  val = moment(ticks[0].value);
                  if (
                    (majorUnit === "minute" && val.second() === 0) ||
                    (majorUnit === "hour" && val.minute() === 0) ||
                    (majorUnit === "day" && val.hour() === 9) ||
                    (majorUnit === "month" &&
                      val.date() <= 3 &&
                      val.isoWeekday() === 1) ||
                    (majorUnit === "year" && val.month() === 0)
                  ) {
                    firstTick.major = true;
                  } else {
                    firstTick.major = false;
                  }
                  lastMajor = val.get(majorUnit);

                  for (i = 1, ilen = ticks.length; i < ilen; i++) {
                    tick = ticks[i];
                    val = moment(tick.value);
                    currMajor = val.get(majorUnit);
                    tick.major = currMajor !== lastMajor;
                    lastMajor = currMajor;
                  }
                  return ticks;
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Closing price ($)",
                },
              },
            ],
          },
          tooltips: {
            intersect: false,
            mode: "index",
            callbacks: {
              label: function (tooltipItem, myData) {
                var label =
                  myData.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += parseFloat(tooltipItem.value).toFixed(2);
                return label;
              },
            },
          },
        },
      };

      var chart = new Chart(ctx, cfg);
    });
  },
};
</script>
