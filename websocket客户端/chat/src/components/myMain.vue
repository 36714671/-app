<template>
  <div class="div1">
    <div v-for="(list, index) in msgList" :key="index">
      <!-- 有聊天记录：循环聊天记录 -->
      <div v-if="(list.receiver == userInfo.name) && userInfo.name == '默认群聊'">
        <p :class="{ 'right': list.type == 'my' }">
          <el-avatar v-if="list.type == 'user'" :src="list.senderimg"></el-avatar>
          <el-avatar v-if="list.type == 'my'" :src="list.senderimg" style="float:right;"></el-avatar>
          <span class="content">{{ list.msg }}</span>
        </p>
      </div>
      <div v-else>
        <div
          v-if="((list.receiver == myInfo.name) && (list.sender == userInfo.name)) || ((list.receiver == userInfo.name) && (list.sender == myInfo.name))">
          <!-- 再循环显示聊天记录 -->
          <p :class="{ 'right': list.type == 'my' }">
            <el-avatar v-if="list.type == 'user'" :src="list.senderimg"></el-avatar>
            <el-avatar v-if="list.type == 'my'" :src="list.senderimg" style="float:right;"></el-avatar>
            <span class="content">{{ list.msg }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import socket from '../socket';
import { computed } from '@vue/runtime-core';
export default {
  setup() {
    const VCdata = reactive({
      data: ''
    })
    const store = useStore()
    let msgList = computed(() => store.state.chatMessageList)
    let myInfo = computed(() => store.state.myInfo)
    let userInfo = computed(() => store.state.userInfo)

    socket.on('updateChatMessageList', (data) => {
      console.log(data);
      store.commit('SOCKET_updateChatMessageList', data)
    })
    return {
      msgList, myInfo, userInfo
    }
  }
};
</script>
<style scoped>
.div1 {
  width: 100%;
}

.div1 P {
  width: 100%;
  height: 50px;
}

.content {
  background-color: antiquewhite;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
}

.right {
  text-align: right;
}
</style>