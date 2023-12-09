<template>
  <div class="container">
    <div class="absolute top-0 bottom-0 left-0 right-0 z-50">
      <login v-if="!session.user && !loading"></login>
    </div>
    <input type="checkbox" :checked="productModalOpened" class="modal-toggle">
    <div id="productModal" class="modal">
      <form method="dialog" class="modal-box pb-0">
        <button class="btn absolute right-2 top-2  btn-link z-10 text-black" size="sm" @click="openOrderModal()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="card w-full bg-base-100">
          <template v-if="payStatus === 2">
            <div class="card-title">已支付</div>
            <div class="card-body">
              <div class="flex flex-col items-center justify-between">
                <div>
                  感谢，您正在成功购买 MirrorGPT 的 {{ currentProduct.price }} 元 {{ currentProduct.days }}天账号套餐
                </div>
              </div>
              <div class="card-actions justify-between mt-8">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn" @click="
                  currentProduct = null;
                payCode = null;
                order = null
                  ">
                  关闭
                </button>
              </div>
            </div>
          </template>
          <template v-else-if="currentProduct">
            <div class="card-title">支付中</div>
            <div class="card-body">
              <div class="flex flex-col items-center justify-between">
                <div>
                  您正在购买 MirrorGPT 的{{ currentProduct.price }} 元 {{
                    currentProduct.days
                  }}天账号服务，请使用微信扫码支付
                </div>
                <div v-if="payCode" class="flex flex-col justify-center items-center">
                  <img class="w-48 h-48" v-if="payCode" :src="payCode" />
                  <img class="w-24 h-auto" src="~/static/wechat_pay.png" />
                </div>
                <div class="flex flex-col justify-center items-center mt-6" v-else>
                  <span class="loading loading-spinner w-14 h-14 text-green-400"></span>
                  <div class="text-gray-400 mt-4">正在加载付款码，请稍等...</div>
                </div>
                <button class="btn btn-link" v-if="payCode" @click="updateOrderStatus()">
                  已支付？点击此处刷新
                </button>
              </div>
              <div class="card-actions justify-end mt-8">
                <!-- if there is a button in form, it will close the modal -->
                <!-- <button class="btn" @click="
                  currentProduct = null;
                order = null;
                payCode = null;
                ">
                  返回
                </button> -->
                <button class="btn btn-primary" @click="cancelPay()">取消</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="card-title">选套餐</div>
            <div class="card-body">
              <div class="flex flex-row flex-wrap">
                <div class="w-full bg-base-100" v-for="(product, index) in sharedProducts">
                  <div class="flex flex-row justify-between">
                    <div>
                      <h2 class="card-title">{{ product.price }}元套餐</h2>
                      <div class="text-gray-400">
                        共享账号，支付 {{ product.price }} 元，可使用
                        <strong class="italic text-black">{{ product.days }}</strong> 天
                      </div>
                    </div>
                    <div>
                      <button class="btn" @click="buy(product)">支付</button>
                    </div>
                  </div>
                  <!-- <li>
                {{ product.name }} <h4>{{ product.price }}</h4><button class="btn">购买</button>
            </li> -->
                  <div v-show="index < sharedProducts.length - 1" class="divider"></div>
                </div>
              </div>

              <div class="card-actions justify-end mt-8">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary" @click="openOrderModal()">取消</button>
              </div>
            </div>
          </template>
        </div>
      </form>
    </div>

    <input type="checkbox" :checked="orderModalOpened" class="modal-toggle">
    <div id="orderModal" class="modal ">
      <form method="dialog" class="modal-box">
        <div class="card">
          <div class="card-title">套餐过期</div>
          <div class="card-body">
            <p class="py-4">抱歉，您的套餐已过期，请购买新的套餐后使用。</p>
            <div class="card-actions justify-end mt-8">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary" @click="openProductModal()">
                续费
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, watch, onUnmounted } from "vue";
import { useContext, useRouter } from "@nuxtjs/composition-api";
import QRCode from "qrcode";
import { session, licenseExpireAt, sharedProducts, currentLicense } from "./store";
import dayjs from "dayjs";
import login from "./login.vue";
const currentProduct = ref(null);
const { $axios } = useContext();
let checkSessionTimer = null;
let checkOrderTimer = null;
const payCode = ref("");
const payStatus = ref(1);
const order = ref({});
const loading = ref(true);

const productModalOpened = ref(false);
const orderModalOpened = ref(false);
const showLoginModal = ref(false);

const openOrderModal = () => {
  orderModalOpened.value = true;
  productModalOpened.value = false;
}

const openProductModal = () => {
  productModalOpened.value = true;
  orderModalOpened.value = false;
}

const closeAllModal = () => {
  productModalOpened.value = false;
  orderModalOpened.value = false;
}

const validate = async () => {
  try {
    //block on plugins/axios.js if session was expired
    if (checkSessionTimer) {
      clearTimeout(checkSessionTimer);
    }

    await $axios.get("/user/validate");
    checkSessionTimer = setTimeout(async () => await validate(), 1000 * 60 * 1200);
  } catch (error) {
    console.error(error);
    session.token = null;
  } finally {
    loading.value = false;
  }
};
const buy = async (product) => {
  currentProduct.value = product;
  const { data } = await $axios.post("/order/pay", {
    id: currentProduct.value.id,
  });

  const { codeUrl, order: serverOrder } = data;

  QRCode.toDataURL(codeUrl, function (err, url) {
    payCode.value = url;
    order.value = serverOrder;
    payStatus.value = order.payStatus;
  });
};

const checkOrderStatus = async () => {
  if (order && order.value && order.value.id) {
    if (checkOrderTimer) {
      clearTimeout(checkOrderTimer);
    }
    const { data } = await $axios.get(`/order/${order.value.id}`);

    if (data && data.payStatus) {
      payStatus.value = data.payStatus;

      if (data.payStatus === 2) {
        clearTimeout(checkOrderTimer);
        checkOrderTimer = null;
        closeAllModal();
        return;
      }
    }

    setTimeout(checkOrderStatus, 2500);
  }
}

const cancelPay = () => {
  currentProduct.value = null;
  order.value = null;
  payCode.value = null;
  clearTimeout(checkOrderTimer);
  checkOrderTimer = null;
}

watch(session, (newSession, oldSession) => {

  if (oldSession) {
    if (newSession.license === 0) {
      // orderModalOpened.value = true;
      openOrderModal();
    }

    if (newSession.token !== oldSession.token) {
      validate();
    }
  }
})

watchEffect(() => {
  if (currentProduct && currentProduct.value && order.value) {
    checkOrderStatus();
  } else if (checkOrderTimer) {
    clearTimeout(checkOrderTimer);
    checkOrderTimer = null;
  }
})

onUnmounted(() => {
  if (checkOrderTimer) {
    clearTimeout(checkOrderTimer);
    checkOrderTimer = null;
  }
})

onMounted(() => {
  validate();
});
</script>
