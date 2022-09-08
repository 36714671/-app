<template>
    <div>
        <el-row style="height: 60px">
            <!-- 我的信息 -->
            <div class="myinfo">
                <el-avatar :src="myInfo.img"></el-avatar>
                <span>{{ myInfo.name }}</span>
            </div>
        </el-row>
        <!-- 搜索好友 -->
        <el-row style="height: 50px">
            <el-input v-model="keyword" placeholder="搜索好友">
                <template #append>
                    <el-button>搜索</el-button>
                </template>
            </el-input>
        </el-row>
        <!-- 好友列表 -->
        <!--  -->
        <el-row style="height: 390px">
            <el-table @cell-click="setUserInfo" :data="tableData.filter(data => (!keyword || (data.name.toLowerCase().includes(keyword.toLowerCase()))) && !(data.name.toLowerCase().includes(myInfo.name.toLowerCase())))" height='390px' stripe style="width: 100%"
                :show-header='false'>
                <el-table-column label="日期">
                    <template #default="scope">
                        <div class="userlist">
                            <el-avatar :src="scope.row.img"></el-avatar>
                            <span>{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import { reactive, toRef, toRefs } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, onMounted } from '@vue/runtime-core';
import { Search } from '@element-plus/icons-vue'
import socket from '../socket';
export default {
    setup() {
        const store = useStore();
        const data = reactive({
            keyword: "",
        })
        const func = reactive({
            setUserInfo: (row, column, event) => {
                if (row.name == '默认群聊') {
                    // console.log("设置为group");
                    store.commit('changeChatType', 'group');
                    
                } else {
                    // console.log("设置为private");
                    store.commit('changeChatType', 'private');
                }
                store.commit('setUserInfo', { name: row.name, img: row.img });
            }
        })
        socket.on('login', (data) => {
            store.commit('SOCKET_login', data)
        })
        let myInfo = computed(() => store.state.myInfo)

        let tableData = computed(() => store.state.userList)
        return {
            ...toRefs(func), ...toRefs(data), tableData, myInfo
        }
    }
}
</script>

<style scoped>
.myinfo {
    text-align: left;
    vertical-align: middle;
    margin-top: 10px;
    margin-left: 10px;
}

.myinfo span {
    text-align: left;
    vertical-align: middle;
}

.userlist {
    vertical-align: middle;
    cursor: pointer;
}

.userlist span {
    vertical-align: middle;
    margin-left: 10px;
}
</style>