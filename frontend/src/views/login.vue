<template>
    <div>
        <div>
            <el-row>
                <el-col :sm="13" :xs="0">
                    <div class="half-circle">
                        <div class="up-box">
                            <!-- <div class="slogan">
                                毕业证书生成平台
                            </div> -->
                            <!-- <el-button round type="primary" class="register-btn">注册</el-button> -->
                            <div>
                                <lottie-player class="register-btn"
                                    src="https://assets4.lottiefiles.com/packages/lf20_0pivjQFVZl.json"
                                    background="transparent" speed="1" style="width: 400px; height: 400px;" loop
                                    autoplay></lottie-player>
                            </div>
                        </div>
                        <div class="down-box">
                            <img src="../assets/登录图案.png" alt="" class="img1">
                        </div>
                    </div>
                </el-col>
                <el-col :sm="11" :xs="24">
                    <img class="top" src="../assets/登录图案.png" alt="">
                    <div class="form-box bottom">
                        <el-form class="form">
                            <div class="header">ChainShowU</div>
                            <div class="inputs">
                                <el-form-item>
                                    <el-input v-model="user.student_id" placeholder="学生学号" class="input"
                                        type="text"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="user.jw_passwd" placeholder="统一认证密码" class="input" type="password"
                                        show-password></el-input>
                                </el-form-item>
                                <!-- <div class="checkbox-container">
                                <el-checkbox id="checkbox"></el-checkbox>
                                <label for="checkbox" class="checkbox-text">记住我</label>
                            </div> -->
                                <span style="color:red;" v-show="error">学号或密码为空</span>
                                <el-button @click="login" class="sigin-btn" type="primary">登录</el-button>
                                <!-- <a class="forget" href="#">Forget password ?</a> -->
                                <!-- <p class="signup-link">Don't have an account? <a href="#">Sign up</a></p> -->
                            </div>
                            <span style="text-align: center;color: #303133;opacity:0.6;">（使用校园网登录）</span>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="isloading" class="loading">
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_AC7l57omdL.json" background="transparent"
                speed="0.9" style="width: 400px; height: 400px;" loop autoplay></lottie-player>
        </div>
    </div>
</template>
<script>
import { } from 'vue';

export default {
    name: "login",
    data() {
        return {
            user: {
                student_id: '',
                jw_passwd: '',
            },
            error: false,
            isloading: false,
        }
    },
    components: {},
    methods: {
        async login() {
            this.isloading = true
            try {
                const response = await this.$http.post('/ap/user/login', {
                    student_id: this.user.student_id,
                    jw_passwd: this.user.jw_passwd
                }, {
                    timeout: 20000 // 设置 20 秒超时时间
                });
                console.log(response.data)
                if (response.data.code == 200) {
                    // 将用户信息保存到 localStorage 中
                    localStorage.setItem("userInfo", JSON.stringify(response.data.data));
                    localStorage.setItem("jwtToken", response.data.data.jwt);
                    const token = localStorage.getItem('jwtToken');
                    this.$router.push('/home')
                } else if (response.data.code == 400) {
                    this.isloading = false
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 1500);
                } else if (response.data.code == 500) {
                    this.isloading = false
                    alert('学号或密码错误！')
                }
            } catch (err) {
                this.isloading = false
                console.log(err);
                if (err.code === 'ECONNABORTED') {
                    // 请求超时，进行相应的处理
                    console.log('请求超时')
                    this.$message({
                        message: '请求超时,请重新操作',
                        type: 'warning',
                        center: true,
                        duration: 2000
                    })
                } else if (err.code === 'ERR_BAD_RESPONSE') {
                    // 登录异常
                    console.log('登录异常')
                    this.$message({
                        message: '登录异常,请重新登录',
                        type: 'warning',
                        center: true,
                        duration: 2000
                    })
                } else {
                    // 其他错误，进行相应的处理
                    console.log(err.message)
                }
            }
        }
    },
    mounted() {
        console.log(JSON.parse(localStorage.getItem("userInfo")));
    }
}
</script>

<style scoped>
/* 四分之一圆背景 */
.half-circle {
    /* 背景颜色 */
    /* background-image: linear-gradient(to bottom right,RGB(0, 53, 146) , #1e88e5); */
    background-color: RGB(0, 53, 146);
    /* 宽度和高度 */
    width: 100%;

    height: 95vh;
    /* 圆角半径 */
    border-radius: 0 0 100vw 0;

    /* 位置 */
    position: relative;
    right: 0%;

    /* transform: translateY(-8%); */

    /* 响应式 */
    @media (max-width: 1200px) {
        height: 60vh;
    }
}

/* 左边上半部分 */
.up-box {
    color: white;
    position: relative;
    height: 40vh;
    word-wrap: break-word;
}

/* 口号 */
.slogan {
    position: absolute;
    /* 设置绝对定位 */
    top: 4%;
    left: 4%;
    color: #fff;
    font-size: 4rem;
    font-weight: 600;
    z-index: 1;
}

/* 注册按钮 */
.register-btn {
    position: absolute;
    /* 设置绝对定位 */
    right: 15%;
}

/* 左边下半部分 */
.down-box {
    position: relative;
    height: 50vh;
}

.img1 {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    /* 设置绝对定位 */
    top: 0%;
    right: 15%;
}


/* -------------登录框------------- */
.form-box {
    display: flex;
    justify-content: center;
    transform: translate(0, 60%);
}

/* @media (max-width: 768px) {
    .form-box{
        transform: translate(0, 60%);
    }
} */
.bottom {
    position: relative;
}

.top {
    height: 80%;
    width: 80%;
    right: 10%;
    position: absolute;

    @media (min-width:768px) {
        display: none
    }
}

/* 登录表单 */
.form {
    display: flex;
    flex-direction: column;
    border-radius: 0.9rem;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, .05);
    width: 90%;

    @media (max-width: 768px) {
        width: 80%;
    }
}

/* 登录框的头部 */
.header {
    background-image: linear-gradient(to top right, #1e88e5, RGB(0, 53, 146));
    margin: 21px;
    border-radius: 0.75rem;
    overflow: hidden;
    color: #fff;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, rgba(33, 150, 243, .4);
    height: 7rem;
    /* line-height: 1.375; */
    font-weight: 600;
    font-size: 2rem;
    font-family: Roboto, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 输入框 */
.inputs {
    padding: 1.5rem;
    gap: 0.8rem;
    display: flex;
    flex-direction: column;
}

.input {
    /* border: 1px solid rgba(128, 128, 128, 0.61); */
    outline: 0;
    color: rgb(69 90 100);
    font-size: 1rem;
    line-height: 1.25rem;
    /* padding: 0.7rem; */
    background-color: transparent;
    border-radius: .375rem;
    width: 100%;
    height: 100%;
}

.input:focus {
    border: 1px solid RGB(0, 53, 146);
}

.sigin-btn {
    text-transform: uppercase;
    font-weight: 700;
    font-size: .75rem;
    line-height: 1rem;
    text-align: center;
    padding: .75rem 1.5rem;
    background-color: #1e88e5;
    /* background-image: linear-gradient(to top right, RGB(0, 53, 146), #42a5f5); */
    border-radius: .5rem;
    width: 100%;
    color: #fff;
    font-size: 18px;
}

.loading {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


