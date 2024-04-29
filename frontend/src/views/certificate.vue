<template>
    <div>
        <navigator />
        <div class="main">
            <!-- 左区 -->
            <div class="left">
                <!-- 左区上半部分 -->
                <div class="left-up">
                    <div>
                        <el-avatar :size="130" :src="head"></el-avatar>
                    </div>
                    <div class="name">
                        {{ stuInfo.name }}
                    </div>
                </div>
                <!-- 左区下半部分 -->
                <div class="left-down">
                    <el-menu default-active="certificate" class="el-menu-vertical-demo" background-color="#f9f9f9" router>
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
                <!-- <img src="../assets/man/default/1.png" alt=""> -->
                <div v-if="isloading">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_0pivjQFVZl.json"
                        background="transparent" speed="1" loop autoplay class="loading"></lottie-player>
                </div>
                <div v-else class="img-show">
                    <el-image class="p-img" :src="url" :preview-src-list="srcList" v-if="showImg" fit="contain">
                    </el-image>
                    <el-empty v-else description="您暂时还没有证书，快去首页生成吧！"></el-empty>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import navigator from '@/components/navigator.vue';
import instance from '@/http/api';

export default {
    name: "",
    data() {
        return {
            // url: require('../assets/man/default/1.png'),
            url: '',
            srcList: [],
            showImg: false,
            stuInfo: {},
            isloading: false,
            head: ''
        };
    },
    components: { navigator },
    methods: {

    },
    async beforeMount() {
        this.stuInfo = JSON.parse(localStorage.getItem("userInfo"))
        if (this.stuInfo.sex == '男') {
            this.head = require('../assets/头像-男.png')
        } else {
            this.head = require('../assets/头像-女.png')
        }
        this.isloading = true
        try {
            const response = await instance.post('/user/info', { userid: this.stuInfo.student_id });
            this.isloading = false
            if (response.data.code == 200) {
                // console.log(response.data.data.base64);
                if (response.data.data.base64 != null) {
                    this.url = response.data.data.base64;   //显示图片
                    this.srcList[0] = response.data.data.base64
                    this.showImg = true
                }
            } 
            else {
                console.log(response.data);
            }
        } catch (error) {
            this.isloading = false
            console.log(error);
            if (error.code === 'ECONNABORTED') {
                // 请求超时，进行相应的处理
                console.log('请求超时')
                this.$message({
                    message: '请求超时,请刷新页面',
                    type: 'warning',
                    center: true,
                    duration: 1500
                })
            } else if (error.code === 'ERR_BAD_RESPONSE') {
                // 登录异常
                console.log('查询异常')
                this.$message({
                    message: '获取照片异常,请刷新页面',
                    type: 'warning',
                    center: true,
                    duration: 1500
                })
            } else {
                // 其他错误，进行相应的处理
                console.log(error.message)
            }
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

/* 右区 */
.right {
    flex: 3;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 4px #dadfe9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-show {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.p-img {
    max-width: 65%;
}

.loading {
    width: 400px;
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

    .right {
        align-items: start;
    }

    .img-show {
        align-items: start;
    }

    .p-img {
        margin-top: 1rem;
        max-width: 90%;
    }

    .loading {
        width: 200px;
    }
}
</style>
