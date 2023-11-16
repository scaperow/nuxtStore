<template>
  <div>
    <!-- <article class="prose">
            <h4>共享账号：</h4>
            <ul>
                <li>
                    经济实惠：与他人共享账号，成本大大降低！享受优质服务，分摊费用！
                </li>
                <li>方便易用：无需繁琐的账号创建过程，微信登陆即可使用！节省时间，快速上手！</li>
                <li>互相交流：共享账号的聊天内容对所有用户可见，畅所欲言，分享见解和经验！</li>
            </ul>

            <h4> 独享账号：</h4>
            <ul>
                <li>
                    1. 隐私和安全：独享账号仅由一个用户使用，降低了账号被他人滥用或泄露的风险。您的个人信息和数据将更加安全。</li>
                <li>
                    2. 独立控制：作为独享账号的唯一使用者，您拥有对账号和相关设置的独立控制权。
                </li>
            </ul>


            不受限制：与共享账号不同，独享账号不会受到同时登录设备数量限制或其他使用限制。您可以自由地在多个设备上使用账号，并根据需要随时访问和管理。
        </article> -->
    <div class="flex flex-row flex-wrap">
      <div v-for="product in sharedProducts" class="card w-96 bg-base-100 shadow-md m-2 justify-center">
        <div class="card-body">
          <h2 class="card-title">{{ product.name }}</h2>
          <p>支付 {{ product.price }} 元，可使用 {{ product.days }} 天</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="buy(product)">购买</button>
          </div>
        </div>
      </div>
      <!-- <li>
                {{ product.name }} <h4>{{ product.price }}</h4><button class="btn">购买</button>
            </li> -->
    </div>
    <hr class="my-4" />

    <div class="flex flex-row flex-wrap">
      <div v-for="product in personalProducts" class="card w-96 bg-base-100 shadow-md m-2">
        <div class="card-body">
          <h2 class="card-title">{{ product.name }}</h2>
          <p>支付 {{ product.price }} 元，可使用 {{ product.days }} 天</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="buy(product)">购买</button>
          </div>
        </div>
      </div>
      <!-- <li>
                {{ product.name }} <h4>{{ product.price }}</h4><button class="btn">购买</button>
            </li> -->
    </div>
    <dialog id="paymentOrder" class="modal">
      <form method="dialog" class="modal-box" v-if="currentProduct">
        <h3 class="font-bold text-lg">{{ currentProduct.name }}</h3>
        <p class="py-4">
          支付 {{ currentProduct.price }} 元，可使用 {{ currentProduct.days }} 天
        </p>
        <p>请使用微信扫码支付</p>
        <img :src="payCode" />
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn" @click="startPay">支付</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import QR from 'qrcode';
import { ref } from "vue";
const currentProduct = ref({});
const payCode = ref("");
const sharedProducts = ref([
  {
    id: 1,
    name: "共享账号 - 3天",
    days: 3,
    price: 1.9,
  },
  {
    id: 2,
    name: "共享账号 - 6天",
    days: 6,
    price: 3.9,
  },
  {
    id: 3,
    name: "共享账号 - 9天",
    days: 12,
    price: 4.9,
  },
]);

const personalProducts = ref([
  {
    id: 1,
    name: "单人单号 - 30天",
    days: 30,
    price: 5.9,
  },
  {
    id: 2,
    name: "单人单号 - 60天",
    days: 60,
    price: 10.9,
  },
  {
    id: 3,
    name: "单人单号 - 90天",
    days: 90,
    price: 15.9,
  },
]);

const buy = (product) => {
  currentProduct.value = product;
  paymentOrder.showModal();
};

const startPay = async () => {
  const { data } = await this.$axios.post("/order", {
    id: currentProduct.value.id,
  });

  QRCode.toDataURL(data.codeUrl, function (err, url) {
    payCode.value = url;
    console.log(url)
  })
};
</script>
