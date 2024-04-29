<template>
    <div>
        <navigator />
        <div class="main">
            <!-- 左区 -->
            <div class="left">
                <!-- 左区上半部分 -->
                <div class="left-up">
                    <div>
                        <el-avatar :size="130"
                            :src="head"></el-avatar>
                    </div>
                    <div class="name">
                        {{ stuInfo.name }}
                    </div>
                </div>
                <!-- 左区下半部分 -->
                <div class="left-down">
                    <el-menu default-active="person" class="el-menu-vertical-demo" background-color="#f9f9f9" router>
                        <el-menu-item index="person">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">个人信息</span>
                        </el-menu-item>
                        <el-menu-item index="certificate">
                            <i class="el-icon-document"></i>
                            <span slot="title">我的证书</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
            <!-- 右区 -->
            <div class="right">
                <el-descriptions direction="vertical" :column="1" border :labelStyle="{ 'background-color': 'white' }">
                    <el-descriptions-item label="姓名：">{{ stuInfo.name }}</el-descriptions-item>
                    <el-descriptions-item label="性别：">{{ stuInfo.sex }}</el-descriptions-item>
                    <el-descriptions-item label="学号：">{{ stuInfo.student_id }}</el-descriptions-item>
                    <el-descriptions-item label="学院：">{{ stuInfo.college }}</el-descriptions-item>
                    <el-descriptions-item label="专业：">{{ stuInfo.major }}</el-descriptions-item>
                    <el-descriptions-item label="入学年份：">{{ stuInfo.year }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </div>
</template>

<script>
import { } from 'vue';
import navigator from '@/components/navigator.vue';

export default {
    name: "",
    data() {
        return {
            stuInfo: {},
            head:''
        };
    },
    components: { navigator },
    methods: {
    },
    mounted() {
        console.log(JSON.parse(localStorage.getItem("userInfo")));
        this.stuInfo = JSON.parse(localStorage.getItem("userInfo"))
        if(this.stuInfo.sex=='男'){
            this.head = require('../assets/头像-男.png')
        }
        else{
            this.head = require('../assets/头像-女.png')
        }
    }
}
</script>

<style scoped>
/* 内容区 */
.main {
    background-color: white;
    display: flex;
    height: 80vh;
    width: 60vw;
    margin: 4vh auto;
}

/* 左区 */
.left {
    flex: 1;
    margin-right: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 4px #dadfe9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 右区 */
.right {
    flex: 3;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 4px #dadfe9;
}

/* 左区上半部分 */
.left-up {
    flex: 3;
}

/* 头像区 */
.el-avatar {
    margin: 20px auto;
}

/* 名字 */
.name {
    text-align: center;
    margin-top: 10px;
}

/* 左区下半部分 */
.left-down {
    flex: 5;
}

/* 菜单点击效果 */
.el-menu-item.is-active {
    background-color: #e6eaf5 !important;
}

.el-menu-item:hover {
    background-color: #e6eaf5 !important;
}

/* 菜单 */
.el-menu-item {
    text-align: center;
    width: 250px;
    font-size: 1.2rem;
    height: 4rem;
}

.text {
    font-size: 1.3rem;
    margin-bottom: 2rem;
}

/* 卡片 */
.box-card {
    height: 80vh;
}

@media(max-width:1200px) {
    .el-menu-item {
        width: auto;
        font-size: 1rem;
    }

    .main {
        width: 95vw;
    }

    .left {
        flex: 0;
        margin-right: 5px;
    }
}
</style>
