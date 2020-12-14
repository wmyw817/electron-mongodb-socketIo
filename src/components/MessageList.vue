<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="name" />
      <button @click="onLogin">登录</button>
      <button @click="onTerminate">停止</button>
      <button @click="onClear">清屏</button>
    </form>
    <table>
      <tr>
        <th v-for="(value, key) in keys" :key="key">{{value}}</th>
      </tr>
      <tr v-for="(i, index) in list" :key="index">
        <td v-for="(value, key) in keys" :key="key">{{i[key]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import io from "socket.io-client";
import { URL } from "@/config/URL";
export default {
  name: "MessageList",
  data() {
    return {
      io: null,
      list: [],
      name: "",
      keys:{
        sendTime: '时间',
        patBodyTemperature: '体温',
        patSphygmus: '脉搏',
        patBloodOxygen: '血氧',
        patBloodPressure: '血压',
        patDiastolicPressure: '舒张压',
        patSystolicPressure: '收缩压',
      }
    };
  },
  beforeDestroy() {
    if (this.io) {
      this.io.close();
      this.io = null;
    }
  },
  methods: {
    onGetList(list) {
      console.log("push event", list);
      this.list.push(...list);
    },
    onLogin() {
      console.log('login')
      this.initIo();
    },
    onTerminate(){
      if (this.io) {
        this.io.close();
        this.io = null;
      }
    },
    onSubmit(){
      console.log('submit')
    },
    onClear(){
      this.list = []
    },
    initIo() {
      if (this.io) {
        this.io.close();
        this.io = null;
      }
      this.io = io(URL.SOCKET, {
        query: {
          loginUserNum: this.name,
        },
      });
      this.io.on("connect", function () {
        console.log("connect");
      });
      this.io.on("disconnect", function () {
        console.log("disconnect");
      });
      this.io.on("push_event", this.onGetList);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  margin: 20px auto;
  table-layout: fixed;
  th {
    width: 200px;
  }
  td {
    border: 1px solid #333;
  }
}
</style>
