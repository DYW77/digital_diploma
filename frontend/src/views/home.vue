<template>
    <div>
        <navigator />

        <el-row class="chainMain">
            <el-col :md="{ span: 8, offset: 5 }" :sm="24" :xs="24">
                <div class="preview">
                    <img src="../assets/主页图案.png" alt="">
                </div>
            </el-col>
            <el-col :md="6" :sm="24" :xs="24">
                <div class="generate">
                    <div style="font-size: 1.6rem;">
                        点击抽选你的毕业证书模板
                    </div>
                </div>
                <div class="generate">
                    <div style="opacity:0.6;margin-top: 2vh;">
                        （每个人只能抽取一次）
                    </div>
                </div>
                <div class="btn-box">
                    <button @click="showRandomImage" class="btn-body">抽选模板</button>
                </div>
            </el-col>
        </el-row>
        <transition name="fade1">
            <div class="selephoto" v-show="isImageShown">
                <img id="randomImage" :src="randomImagePath">
                <button id="qrmbbtn" class="save btn btn-primary" @click="hideImage">确认模板</button>
                <lottie-player v-show="isLoadShow" src="https://assets1.lottiefiles.com/packages/lf20_3tQA96fr5H.json"
                    background="transparent" speed="1" style="width: 80%; height: 80%;" loop autoplay></lottie-player>
            </div>
        </transition>
        <div class="selephoto" v-show="isCanvasShow">
            <div>
                <lottie-player class="register-btn" src="https://assets4.lottiefiles.com/packages/lf20_0pivjQFVZl.json"
                    background="transparent" speed="1" style="width: 400px; height: 400px;" loop autoplay
                    v-show="isLoading">
                </lottie-player>
            </div>
            <div class="saveImg" v-show="isloaded">
                <!-- <el-tag effect="dark" class="mb-4" style="width: 80%;text-align: center;">预览</el-tag> -->
                <div class="mes">预览</div>
                <canvas ref="canvas"></canvas>
                <button @click="creatImg" class="bt btn btn-primary">生成并上链</button>
            </div>
            <div class="saveImg">
                <div v-if="isloaded == false && Mobile == true" class="mes">长按保存图片</div>
                <div>
                    <div ref="one">

                    </div>
                </div>
                <button v-if="isloaded == false" class="bt btn btn-primary" @click="hideCanvas">关闭</button>
            </div>
        </div>
        <div class="selephoto" v-show="load">
            <lottie-player class="register-btn" src="https://assets4.lottiefiles.com/packages/lf20_0pivjQFVZl.json"
                background="transparent" speed="1" style="width: 400px; height: 400px;" loop autoplay>
            </lottie-player>
        </div>
        <el-divider content-position="center">模板展示区</el-divider>
        <div class="show">
            <img src="../assets/female/default/2.png" alt="" class="min">
            <img src="../assets/man/default/3.png" alt="" class="mid">
            <img src="../assets/man/default/1.png" alt="" class="max">
            <img src="../assets/female/default/7.png" alt="" class="mid">
            <img src="../assets/man/default/6.png" alt="" class="min">
        </div>
    </div>
</template>

<script>
import navigator from '@/components/navigator.vue';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import CryptoJS from "crypto-js";    //哈希加密算法库
import m from '../m.json'
import instance from '@/http/api';

export default {
    name: "home",
    data() {
        return {
            manImages: [
                { path: require('@/assets/man/default/1.png'), weight: 0.1, styleid: 1 },
                { path: require('@/assets/man/default/2.png'), weight: 0.1, styleid: 2 },
                { path: require('@/assets/man/default/3.png'), weight: 0.1, styleid: 3 },
                { path: require('@/assets/man/default/4.png'), weight: 0.1, styleid: 4 },
                { path: require('@/assets/man/default/5.png'), weight: 0.1, styleid: 5 },
                { path: require('@/assets/man/default/6.png'), weight: 0.1, styleid: 6 },
                { path: require('@/assets/man/default/7.png'), weight: 0.1, styleid: 7 },
                { path: require('@/assets/man/default/8.png'), weight: 0.1, styleid: 8 },
                { path: require('@/assets/man/default/9.png'), weight: 0.1, styleid: 9 },
                { path: require('@/assets/man/default/10.png'), weight: 0.1, styleid: 10 },
                { path: require('@/assets/man/default/11.png'), weight: 0.1, styleid: 11 },
                { path: require('@/assets/man/default/12.png'), weight: 0.1, styleid: 12 },
                { path: require('@/assets/man/default/13.jpg'), weight: 0.1, styleid: 13 },
                { path: require('@/assets/man/default/14.png'), weight: 0.11, styleid: 14 },
            ],
            femaleImages: [
                { path: require('@/assets/female/default/1.png'), weight: 0.1, styleid: 1 },
                { path: require('@/assets/female/default/2.png'), weight: 0.1, styleid: 2 },
                { path: require('@/assets/female/default/3.png'), weight: 0.1, styleid: 3 },
                { path: require('@/assets/female/default/4.png'), weight: 0.1, styleid: 4 },
                { path: require('@/assets/female/default/5.png'), weight: 0.1, styleid: 5 },
                { path: require('@/assets/female/default/6.png'), weight: 0.1, styleid: 6 },
                { path: require('@/assets/female/default/7.png'), weight: 0.1, styleid: 7 },
                { path: require('@/assets/female/default/8.png'), weight: 0.1, styleid: 8 },
                { path: require('@/assets/female/default/9.png'), weight: 0.1, styleid: 9 },
                { path: require('@/assets/female/default/10.png'), weight: 0.1, styleid: 10 },
                { path: require('@/assets/female/default/11.png'), weight: 0.1, styleid: 11 },
                { path: require('@/assets/female/default/12.png'), weight: 0.1, styleid: 12 },
                { path: require('@/assets/female/default/13.jpg'), weight: 0.1, styleid: 13 },
                { path: require('@/assets/female/default/14.png'), weight: 0.11, styleid: 14 },
            ],
            defaultImages: [],
            isImageShown: false,
            randomImagePath: '',
            isCanvasShow: false,
            isLoadShow: false,
            isLoading: true,
            isloaded: true,
            imgHeight: 0,
            Wechat: true,
            Mobile: true,
            isGenerating: false, // 用于表示是否正在生成图片
            stuInfo: {},
            load: false
        }
    },
    components: { navigator },
    methods: {
        chooseImage(images) {
            const rand = Math.random() * 1.4;
            let total = 0;
            for (let i = 0; i < images.length; i++) {
                total += images[i].weight;
                if (rand < total) {
                    return images[i];
                }
            }
        },
        async showRandomImage() {
            // // 创建 Axios 实例
            // const instance = this.$http.create({
            //     baseURL: '/ap'
            // })
            // // 添加请求拦截器
            // instance.interceptors.request.use(config => {
            //     // 在请求发送前添加请求头
            //     config.headers.token = localStorage.getItem('jwtToken')
            //     return config
            // }, error => {
            //     return Promise.reject(error)
            // })
            this.load = true

            try {
                const response = await instance.post('/user/info', { userid: this.stuInfo.student_id });
                console.log(response.data);
                if (response.data.code == 400) {
                    this.load = false
                    alert('登录过期，请重新登录')
                    this.$router.push('/')
                }
                else {
                    if (parseInt(response.data.data.year.substr(0, 4)) > 2019) {
                        this.load = false
                        this.$message({
                            message: '很抱歉，您还没有毕业',
                            type: 'warning',
                            center: true,
                            duration: 2000
                        })
                        return
                    }
                    else if (parseInt(response.data.data.year.substr(0, 4)) < 2019) {
                        this.load = false
                        this.$message({
                            message: '很抱歉，该平台目前仅限2019级毕业生使用',
                            type: 'warning',
                            center: true,
                            duration: 2000
                        })
                        return
                    }
                    if (response.data.data.styleid == null) { // 未抽取模板
                        this.load = false
                        const randomImage = this.chooseImage(this.defaultImages);
                        const mb = document.getElementById("randomImage");
                        const qrmbbtn = document.getElementById("qrmbbtn");
                        this.randomImagePath = randomImage.path;
                        this.stuInfo.styleid = randomImage.styleid
                        console.log(this.stuInfo);
                        const res = await instance.post('/user/style', { userid: this.stuInfo.student_id, styleid: this.stuInfo.styleid });
                        console.log(res.data);
                        if (res.data.code == 403) {
                            console.log(res.data);
                            this.$message({
                                message: '很抱歉，您还没有毕业',
                                type: 'warning',
                                center: true,
                                duration: 2000
                            })
                        }
                        else if (res.data.code == 200) {
                            console.log(res.data.msg);
                            mb.style.display = "none";
                            qrmbbtn.style.display = "none";
                            this.isImageShown = true;
                            this.isLoadShow = true;
                            //等待五秒
                            setTimeout(() => {
                                this.isLoadShow = false;
                                mb.style.display = "block";
                                qrmbbtn.style.display = "block";
                            }, 4700);
                        }
                        else {
                            console.log(res.data.msg);
                        }
                    } else if (response.data.data.styleid != null && response.data.data.base64 == null) { // 已有模板但未生成证书
                        this.load = false
                        this.stuInfo.styleid = response.data.data.styleid
                        this.draw()
                        this.isImageShown = false;
                        this.isCanvasShow = true;
                    } else if (response.data.data.base64 != null) { // 已生成证书
                        this.load = false
                        alert('你已生成你的证书！')
                        this.$router.push('/certificate')
                    }
                }
            } catch (err) {
                this.load = false
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
                }
                else if (err.code === 'ERR_BAD_RESPONSE') {
                    // 异常
                    this.load = false
                    console.log('抽取异常')
                    this.$message({
                        message: '抽取异常,请重新操作',
                        type: 'warning',
                        center: true,
                        duration: 2000
                    })
                }
                else {
                    // 其他错误，进行相应的处理
                    this.load = false
                    console.log(err.message)
                }
            }
        },
        hideImage() {
            this.draw()
            this.isImageShown = false;
            this.isCanvasShow = true;
        },
        hideCanvas() {
            this.$router.push('/certificate')
            // location.reload();
        },
        draw() {
            const id = parseInt(this.stuInfo.styleid) - 1
            console.log(this.stuInfo.styleid);
            console.log(id);
            // 加载字体 
            const path = require('../static/font/' + m[id].sty.f)
            const fontface = new FontFace(`${m[id].name}`, `url(${path})`);
            fontface.load()
            document.fonts.add(fontface);
            // 浏览器是否支持 
            if (!document.fonts) { alert('抱歉，当前浏览器兼容性较差，会影响操作体验，请更换浏览器进行操作'); }
            // 检验字体是否已经安装 
            if (document.fonts.check(`16px ${m[id].name}`, '上')) {
                return Promise.resolve(true);
            }
            fontface.loaded.then(() => {
                this.isLoading = false
                // 字体加载完毕，可使用 
                const canvas = this.$refs.canvas;
                if (canvas.getContext) {
                    var ctx = canvas.getContext("2d");
                    var img = new Image()
                    console.log(this.stuInfo.styleid);
                    const p1 = (parseInt(this.stuInfo.styleid)).toString() + '.png'
                    const p = require('../assets/man/empty/' + p1);
                    img.src = p
                    img.onload = () => {
                        canvas.width = img.width
                        canvas.height = img.height

                        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

                        ctx.fillStyle = m[id].stuName.color;
                        const fs = m[id].stuName.fs   //  名字
                        ctx.font = `${m[id].stuName.fs}px ${m[id].name}`;

                        // 居中绘制
                        let text = this.stuInfo.name;
                        if (m[id].sty.f == 'GaoDuanHeiXiuDing151105-1.ttf' && text.includes('欧')) {
                            text = text.replace('欧', '鸥')
                        }
                        else if (m[id].sty.f == 'GaoDuanHeiXiuDing151105-1.ttf' && text.includes('鸥')) {
                            text = text.replace('鸥', '欧')
                        }
                        // ctx.font = "78px zcool-gdh";
                        // 计算文本宽度
                        let textWidth = ctx.measureText(text).width;

                        // 计算文本起始点的横坐标位置
                        let startX = (m[id].stuName.width - textWidth) / 2;

                        // 绘制文本
                        ctx.fillText(text, m[id].stuName.x + startX, m[id].stuName.y);

                        //  学号
                        ctx.fillStyle = m[id].stuId.color;
                        ctx.font = `${m[id].stuId.fs}px ${m[id].name}`;
                        // ctx.fillText('201900502097', 1200, 1800)
                        ctx.fillText(`${this.stuInfo.student_id}`, m[id].stuId.x, m[id].stuId.y);

                        //   毕业年份
                        ctx.fillStyle = m[id].year.color;
                        ctx.font = `${m[id].year.fs}px ${m[id].name}`;

                        const year = parseInt(this.stuInfo.year.substr(0, 4)) + 4;
                        ctx.fillText(`${year}`, m[id].year.x, m[id].year.y);


                        ctx.fillStyle = m[id].college.color;
                        // 居中绘制
                        text = this.stuInfo.college.slice(0, -2);   //  学院
                        // 计算文本宽度
                        textWidth = ctx.measureText(text).width;
                        // 计算文本起始点的横坐标位置
                        startX = (m[id].college.width - textWidth) / 2;

                        // 绘制文本
                        ctx.fillText(text, m[id].college.x + startX, m[id].college.y);

                        //专业
                        ctx.fillStyle = m[id].major.color;
                        // 居中绘制
                        text = this.stuInfo.major;
                        // ctx.font = "78px zcool-gdh";
                        // 计算文本宽度
                        textWidth = ctx.measureText(text).width;

                        // 计算文本起始点的横坐标位置
                        startX = (m[id].major.width - textWidth) / 2;

                        // 绘制文本
                        ctx.fillText(text, m[id].major.x + startX, m[id].major.y);
                    }
                    img.onerror = (err) => {
                        // 图片加载失败的处理代码，例如：
                        console.log('图片加载失败：', err);
                        this.$message({
                            message: '图片加载失败，请重新生成证书！',
                            type: 'warning',
                            center: true,
                            duration: 1000
                        })
                        location.reload();
                    };
                }
            }).catch(err => {
                // 字体加载失败 
                console.log('字体加载失败' + err);
            });

        },

        // 生成图片
        async creatImg() {
            this.load = true
            if (this.isGenerating) {
                // 如果正在生成图片，则直接返回，不可以多次处理点击事件
                return;
            }
            this.isGenerating = true; // 将 isGenerating 设置为 true，表示正在生成图片
            const canvas = this.$refs.canvas;
            const ratio = canvas.width / canvas.height
            try {
                const canvasImg = await html2canvas(canvas, { scale: 3, dpi: 300 });
                const dataUrl = canvasImg.toDataURL("image/png");  // 转换为Base64编码的数据URL
                const res = await instance.post('/user/info', { userid: this.stuInfo.student_id }, {});
                if (res.data.data.base64 != null) {    //  已生成证书
                    this.load = false
                    alert('你已生成你的证书！')
                    this.$router.push('/certificate')
                } else {
                    const res2 = await instance.put('/user/uploadpic', { userid: this.stuInfo.student_id, base64: dataUrl });
                    this.load = false
                    console.log(res2.data);
                    if (res2.data.code == 200) {    //  成功上链
                        console.log(res2.data);
                        var dataImg = new Image()
                        dataImg.src = canvasImg.toDataURL('image/png')
                        dataImg.height = this.imgHeight
                        dataImg.width = this.imgHeight * ratio  // 宽度自动适应
                        this.isloaded = false

                        this.$refs.one.appendChild(dataImg)  //页面渲染新生成的图片
                        this.$message({
                            message: '生成成功！',
                            type: 'success',
                            center: true,
                            duration: 1500
                        })
                        // 图片生成完成并且跳转到新生成的图片后，将 isGenerating 设置为 false，表示可以再次生成图片
                        this.isGenerating = false;
                        if (this.isWechat() == false) {
                            canvasImg.toBlob(blob => {
                                saveAs(blob, 'Image.png');
                            });
                            // const link = document.createElement('a');
                            // link.href = dataUrl;
                            // link.download = 'Image.png';
                            // link.click();

                            // this.Wechat = false;
                        }
                    } else {
                        console.log(res2.data);
                    }
                }
            } catch (error) {
                this.isGenerating = false;
                this.load = false
                console.log(error);
                this.$message({
                    message: '生成异常，请重新操作',
                    type: 'warning',
                    center: true,
                    duration: 1500
                })
            }
        },
        // 判断是否为微信浏览器
        isWechat() {
            const ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            }
            return false;
        },
        isMobile() {
            if (window.screen.width <= 768) {
                this.imgHeight = window.innerHeight * 0.5  // 移动端高度
                this.Mobile = true
            } else {
                this.imgHeight = window.innerHeight * 0.7  // pc端高度  
                this.Mobile = false
            }
        }
    },
    mounted() {
        console.log(JSON.parse(localStorage.getItem("userInfo")));
        console.log(localStorage.getItem('jwtToken'));
        this.stuInfo = JSON.parse(localStorage.getItem("userInfo"))
        this.isMobile()
        if (this.stuInfo.sex == "男") {
            this.defaultImages = this.manImages
        }
        else {
            this.defaultImages = this.femaleImages
        }
        const randomImage = this.chooseImage(this.defaultImages);
    }
}
</script>

<style scoped>
.chainMain {
    margin-top: 4vh;
}

.generate {
    margin: 5vh auto;
    color: RGB(0, 53, 146);
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    word-wrap: break-word;
    word-break: break-all;
}

/* 针对手机端屏幕调整 .generate 的 margin */
@media (max-width: 768px) {
    .generate {
        margin: 0 auto;
    }
}

.preview {
    height: 40vh;
}

.preview img {
    max-width: 90%;
    max-height: 90%;
    margin: 0 auto;
    display: block;
    /* 将图片设为块级元素 */
}

/* 按钮 */
.btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 2vh;
}

.btn-body {
    width: 60vw;
    border: none;
    background-color: #6c5ce7;
    padding: 10px 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    border-radius: 15px;
    transition: all ease 0.1s;
    box-shadow: 0px 5px 0px 0px #a29bfe;
}

.btn:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #a29bfe;
}

/* --------------------- 展示区 -------------------- */
.show {
    height: 35vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media(max-width:992px) {
    .preview {
        height: 30vh;
    }

    .show {
        height: 23vh;
    }

    .show img {
        margin-right: 2px !important;
    }

    .min {
        display: none;
    }
}

.show img {
    margin-right: 5px;
}

.min {
    max-height: 75%;
    box-shadow: 20px 20px 25px rgba(0, 0, 0, 0.1);
}

.mid {
    max-height: 85%;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.max {
    max-height: 100%;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

/* --------------------- 抽选模板 -------------------- */
#randomImage {
    /* display: none; */
    width: auto;
    height: 60vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    /* background-color: rgba(0, 0, 0, 0.4); */
}

@media (min-width:768px) {
    #randomImage {
        height: 70vh;
    }
}

.selephoto {
    /* display: none; */
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

@media (max-width:768px) {
    .selephoto {
        align-items: start;
    }
}

.exit {
    position: absolute;
    left: 70%;
    /* transform: translate(-50%, -50%); */
}

.save {
    position: absolute;
    bottom: 12%;
    left: 38%;
}

/* --------------------- canvas -------------------- */
.bt {
    font-size: 20px;
    margin-top: 20px;
}

/* @media (max-width:768px) {
    .bt {
        width: 100px;
        height: 40px;
        font-size: 20px;
    }
} */

canvas {
    max-width: 100%;
    height: 70vh;
    /* display: block;
    margin: 0 auto; */
}

.saveImg {
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

@media (max-width:768px) {
    canvas {
        height: 60vh;
    }
}

.mes {
    border: 2px solid white;
    color: white;
    font-size: 1rem;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 20px;
    /* background-color: #00247A; */
    border-color: white;
}

.fade1-enter-active,
.fade1-leave-active {
    transition: opacity 0.6s;
}

.fade1-enter,
.fade1-leave-to {
    opacity: 0;
}
</style>
