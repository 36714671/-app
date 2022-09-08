<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" @keyup.enter.native="send"> </el-input>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useStore } from 'vuex';
import socket from '../socket';
import { computed } from '@vue/runtime-core';
export default {
   setup() {
    const VCdata = reactive({
      input: ''
    })
    const store = useStore()
    let myInfo =  computed(() => store.state.myInfo)
    let chatType = computed(() => store.state.chatType)
    let userInfo = computed(() => store.state.userInfo)

    const state = reactive({
      myInfo:()=> store.state.myInfo,
      chatType:()=> store.state.chatType,
      userInfo:()=> store.state.userInfo,
    })

    let send = () => {
      let time = new Date();
      /* 发送消息 */
      /* 先判断是群聊还是私聊 */

      if (chatType.value == "group") {
        // console.log("是群聊哦：:");
        let data = {
          type: 'my',
          sender: state.myInfo().name,//发送者id
          senderimg:state.myInfo().img,//发送者的img
          receiver: '默认群聊',//接收方id
          time: time.toLocaleString(),//发送时间
          msg: VCdata.input,//消息内容
        }
        socket.emit('groupChat', data)
        /* 自己的信息直接push到数组中 */
        store.commit('SOCKET_updateChatMessageList', data);
      } else {
        // console.log("是私聊哦：:");
        let data = {
          type: 'my',
          sender: state.myInfo().name,//发送者id
          senderimg: state.myInfo().img,//发送者的img
          receiver: state.userInfo().name,//接收方id
          time: time.toLocaleString(),//发送时间
          msg: VCdata.input,//消息内容
        }
        console.log(data);
        socket.emit('privateChat', data);
        store.commit('SOCKET_updateChatMessageList', data);
      }
      /* 清空输入框 */
      VCdata.input = '';
    }


    return {
      send, myInfo, chatType, userInfo, ...toRefs(VCdata)
    }
  }
}
</script>
