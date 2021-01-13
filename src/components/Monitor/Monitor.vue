<template>
  <div class="monitor">
    <ECG :socket="socket"></ECG>
    <Sign :socket="socket"></Sign>
  </div>
</template>

<script>
import ECG from "./ECG";
import Sign from "./Sign";
import { onBeforeUnmount } from "@vue/composition-api";
import io from "socket.io-client";
import { URL } from "@/config/URL";
export default {
  name: "Monitor",
  components: {
    ECG,
    Sign
  },
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const socket = io(URL.SOCKET, {
      query: {
        loginUserNum: props.user,
      },
    });
    socket.on("connect", () => {
      console.log("connect", props.user);
    });
    socket.on("disconnect", () => {
      console.log("disconnect", props.user);
    });

    onBeforeUnmount(() => {
      socket.close();
    });
    return {
      socket,
    };
  },
};
</script>

<style lang="scss" scoped>
.monitor {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>
