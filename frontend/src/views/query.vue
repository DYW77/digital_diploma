<template>
    <div>
        <navigator />
        <div class="input-box">
            <input type="text" autocomplete="off" name="text" class="input" placeholder="请输入学号" clearable v-model="userId">
            <button class="botn" @click="check">查询</button>
        </div>
        <el-row type="flex" justify="center" class="main-box">
            <div v-if="isloading" class="loading">
                <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_0pivjQFVZl.json" background="transparent"
                    speed="1" loop autoplay class="load"></lottie-player>
            </div>
            <el-col :xs="24" :sm="12" shadow="hover" v-show="showMain">
                <el-card class="box-card">
                    <div class="text item card">
                        <div class="title">
                            该学生已认证！
                        </div>
                        <div class="content">
                            <span>姓名：</span>{{ this.stuInfo.name }}
                        </div>
                        <div class="content">
                            <span>学院：</span>{{ this.stuInfo.college }}
                        </div>
                        <div class="content">
                            <span>专业：</span>{{ this.stuInfo.major }}
                        </div>
                        <div class="content">
                            <span>毕业年份：</span>{{ parseInt(this.stuInfo.year.substr(0, 4)) + 4 }}年
                        </div>
                        <div class="content">
                            <span>认证时间：</span>{{ this.stuInfo.txTime }}
                        </div>
                        <div class="content">
                            <span>存证ID：</span>{{ this.stuInfo.txId }}
                        </div>
                        <div class="content">
                            <span>交易ID：</span>{{ this.stuInfo.evId }}
                        </div>
                        <div class="content">
                            <span>区块高度：</span>{{ this.stuInfo.blockHeight }}
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { } from 'vue';
import navigator from '../components/navigator.vue'
import instance from '@/http/api';

export default {
    name: "query",
    data() {
        return {
            showMain: false,
            isloading: false,
            stuInfo: {},
            userId: ''
        }
    },
    components: { navigator },
    methods: {
        async check() {
            // this.$http.post('/api/check', {
            //     "evId": "",
            //     "hash": "",
            //     "txId": "1767f00fb8a5711bca440cf7ec182081c04ff47b8cc347a5b53fb92a34ea70e3"
            // }).then(res => {
            //     console.log(res.data);
            //     this.chainInfo = res.data.data
            //     this.showMain = true
            // })

            // 检查输入是否为空
            if (!this.userId) {
                console.log('输入不能为空')
                this.$message({
                    message: '输入不能为空',
                    type: 'warning',
                    center: true,
                    duration: 1000
                })
                return
            }

            // 检查输入的格式是否为 12 位数字
            const pattern = /^\d{12}$/
            if (!pattern.test(this.userId)) {
                console.log('输入格式不正确')
                this.$message({
                    message: '请检查输入是否有误',
                    type: 'warning',
                    center: true,
                    duration: 1000
                })
                return
            }

            this.isloading = true
            this.showMain = false
            try {
                const response = await instance.post('/user/info', { userid: this.userId });
                console.log(response.data);
                if (response.data.code == 400 || response.data.data.base64 == null) {
                    this.$message({
                        message: '该学生还未认证',
                        type: 'warning',
                        center: true,
                        duration: 2000
                    })
                } else if (response.data.data.base64 != null) {
                    this.stuInfo = response.data.data
                    this.showMain = true
                }
                this.isloading = false
            } catch (error) {
                this.isloading = false
                console.log(error);
                if (error.code === 'ECONNABORTED') {
                    // 请求超时，进行相应的处理
                    console.log('请求超时')
                    this.$message({
                        message: '请求超时,请重新操作',
                        type: 'warning',
                        center: true,
                        duration: 2000
                    })
                } else if (error.code === 'ERR_BAD_RESPONSE') {
                    // 登录异常
                    console.log('查询异常')
                    this.$message({
                        message: '查询异常,请重新操作',
                        type: 'warning',
                        center: true,
                        duration: 2000
                    })
                } else {
                    // 其他错误，进行相应的处理
                    console.log(error.message)
                }
            }
        }
    },
    mounted() {
        this.stuInfo = JSON.parse(localStorage.getItem("userInfo"))
    }
}
</script>

<style scoped>
.input-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

}

.input {
    width: 20rem;
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #ccc;
    box-shadow: inset 2px 5px 5px rgba(0, 0, 0, 0.3);
    transition: 300ms ease-in-out;
    text-align: center;
}

.input:focus {
    background-color: white;
    transform: scale(1.05);
    box-shadow: 0px 5px 15px #969696,
        -10px -10px 10px #ffffff;
}

.botn {
    color: RGB(0, 53, 146);
    text-transform: uppercase;
    text-decoration: none;
    border: 2px solid RGB(0, 53, 146);
    padding: 10px 20px;
    font-size: 1.5rem;
    font-weight: bold;
    background: transparent;
    position: relative;
    transition: all 1s;
    overflow: hidden;
    margin-top: 20px;
    width: 20rem;
    border-radius: 20px;
}

.botn:hover {
    color: white;
}

.botn::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 0%;
    top: 0;
    left: -40px;
    transform: skewX(45deg);
    background-color: RGB(0, 53, 146);
    z-index: -1;
    transition: all .8s;
}

.botn:hover::before {
    width: 160%;
}

/* 描述区 */
.main-box {
    margin-top: 20px;
}

.card {
    border: none;
}

.title {
    text-align: center;
    color: RGB(0, 53, 146);
    font-size: 2rem;
    font-weight: 700;
}

.content {
    margin-top: 20px;
    font-size: 1.2rem;
}

@media (max-width:768px) {
    .content {
        margin-top: 10px;
    }
}

span {
    font-weight: 700;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
}

.load {
    width: 400px;
    height: 400px;
}
</style>
