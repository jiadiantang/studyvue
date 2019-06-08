<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click = "postComment">发表评论</mt-button>
    <div class="cmt-list">
        <div v-for="(item, i) in comments" :key = "item.id" class="cmt-item">
            <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;{{item.add_time|dateFormat}}
            </div>
            <div class="cmt-body">
                {{item.content}}
            </div>
        </div>
    </div>
    <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageIndex:1,
            comments:[],
            msg:'',
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get('index/comments/'+this.id+"?pageIndex="+
            this.pageIndex).then(result=>{
                if(result.body.status==0){
                    // this.comments = result.body.message
                    this.comments=this.comments.concat(result.body.message);
                }else{
                    Toast('获取评论列表失败')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length==0){
                return Toast('评论内容不能为空')
            }
            this.$http.post('index/postcomment/'+this.$route.params.id, {
                content:this.msg.trim()
                }).then(result=>{
                    if(result.body.status==0){
                        var cmt = {user_name:'匿名用户',
                         add_time:Date.now(),
                         content:this.msg.trim()
                         }
                         this.comments.unshift(cmt)
                         this.msg=""
                    }
                })
        }
    },
    props:["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height:80px;
        margin:0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 30px;
                text-indent: 2em;
            }
        }
        
    }
}
</style>

