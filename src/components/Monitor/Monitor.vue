<template>
  <div class="monitor">
    <ECG :socket="socket"></ECG>
  </div>
</template>

<script>
import ECG from "./ECG";
import { onBeforeUnmount } from "@vue/composition-api";
import io from "socket.io-client";
import { URL } from "@/config/URL";
export default {
  name: "Monitor",
  components: {
    ECG,
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
