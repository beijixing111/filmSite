<template>
  <div class="page-box">
    <div class="pdf-box">
			<div id="demo"></div>
		</div>
		<div class="fix-bottom">
			<BigBtn>同意并签署</BigBtn>
		</div>
  </div>
</template>

<script>
import axios from 'axios';
import Pdfh5 from "pdfh5";
import { BigBtn } from '../../components/buttons';
export default {
  name: "pdf-demo",
	comments: {
		BigBtn
	},
  data() {
    return {
      pdfUrl: "",
    };
  },
  created() {
		
	},
  mounted() {
		this.getPdfFileData(); 
  },
  methods: {
		getPdfFileData() {
			let pdfUrl = '/pdf/baiduss.pdf';
			// let pdfUrl = "https://mimyz.com/films/p2871802326.jpg";
			this.$toast.loading({
				duration: 0,
				forbidClick: true,
			})
			axios.get(pdfUrl,{
				responseType:"arraybuffer"
			}).then(res=>{
				this.goPdfView(res.data);
				this.$toast.clear();
			})
			// this.goPdfView(pdfUrl);
		},
		goPdfView(data) {
			//实例化
			this.pdfh5 = new Pdfh5("#demo", {
				// pdfurl: pdfUrl,
				data: data,
				backTop: false,
			});
			//监听完成事件
			this.pdfh5.on("complete", function (status, msg, time) {
				console.log(
					"状态：" +
						status +
						"，信息：" +
						msg +
						"，耗时：" +
						time +
						"毫秒，总页数：" +
						this.totalNum
				);
			});
		}
	},
};
</script>

<style lang="scss" scoped>
@import "pdfh5/css/pdfh5.css";
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.page-box{
	height: 100vh;
	background: #f3f3f3;
	.pdf-box{
		/* margin: 0.2rem; */
		/* border: 0.01rem solid #ddd; */
		/* box-shadow: 0 0 5px #000; */
		/* border-radius: 0.1rem; */
		height: calc(100% - 0.2rem - 1rem);
		overflow: hidden;
	}
	.fix-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.2rem 0.3rem; 
		display: flex;
		justify-content: center;
		align-items: center;
		/* https://d27baix5la0me3.cloudfront.net/5f08f33d-2e03-4e6a-8a68-d0d8cdf94b26.pdf */
	}
}
</style>
