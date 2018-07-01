<template>
    <div id="app">
        <el-container>
            <el-header height="48px">
                <el-row>
                    <el-col :span="20">
                        <img class="logo" src="@/assets/images/logo.png"/>
                        <div class="name">Surf Board Manager</div>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="switchLanguage('zh')">中文</el-button>
                        <el-button @click="switchLanguage('en')">English</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="160px">
                    <el-menu
                        :default-active="this.$route.path"
                        class="el-menu-vertical-demo"
                        router
                        >
                        <el-menu-item 
                            :index="item.path" 
                            v-for="item in menuList" 
                            :key="item.path"
                            >
                                <img :src="item.img[1]" />
                                <span>{{$t(item.title)}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <transition :name="transition.name" :mode="transition.mode">
                        <router-view class="child-view"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import TransitionHandler from '@/service/transitionHandler.js'
import Cookies from 'js-cookie'

export default {
    name: 'app',
    data(){
        return {
            menuList: [
                {title: 'surfboard.state', path: '/surfboard/state', img: [require('@/assets/images/state.png'), require('@/assets/images/state-active.png')]},
                {title: 'surfboard.manage', path: '/surfboard/manage', img: [require('@/assets/images/board.png'), require('@/assets/images/board-active.png')]},
                {title: 'storage.manage', path: '/surfboard/storage', img: [require('@/assets/images/depot.png'), require('@/assets/images/depot-active.png')]},
                {title: 'user.manage', path: '/system/user', img: [require('@/assets/images/worker.png'), require('@/assets/images/worker-active.png')]},
                {title: 'power.manage', path: '/system/power', img: [require('@/assets/images/group.png'), require('@/assets/images/group-active.png')]},
                {title: 'data.manage', path: '/surfboard/data', img: [require('@/assets/images/data.png'), require('@/assets/images/data-active.png')]}
            ],
            selectIndex: Number,
            transition: {}
        }
    },
    methods: {
        switchLanguage(lang) {
            this.$i18n.locale = lang
            Cookies.set('language', lang)
        }
    },
    watch: {
        '$route' (to, from) {
            this.transition = TransitionHandler.getTransitionType(to, from);
        }
    }
}
</script>

<style scoped lang="less">
#app{
    height: 100%;
}
.el-container{
    height: 100%;
}
.el-header{
    padding: 0 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
}
.el-main{
    padding: 12px 0px 0px 20px;
}
.logo{
    display: block;
    float: left;
    margin-right: 5px;
    width: 48px;
    height: 48px;
}
.name{
    float: left;
    height: 48px;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-size: 24px;
    line-height: 48px;
}

</style>