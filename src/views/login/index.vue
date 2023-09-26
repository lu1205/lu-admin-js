<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from '@/store/user.js'

let form = reactive({username: 'admin', password: '123456'})
const rules = []
let formRef = ref(null)
const router = useRouter()
const route = useRoute()

const loginHandle = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let user = {
                username: 'admin',
                nickname: '张三',
                roles: ['管理员'],
            }
            let token = 'user token'
            useUserStore().setUser(user)
            useUserStore().setToken(token)
            await router.push(route.query.redirect || '/')
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<template>
    <div class="page-box">
        <div class="login-box">
            <div class="title">欢迎登录</div>
            <el-form ref="formRef" :model="form" :rules="rules" class="form-box">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon size="24">
                                <User/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon size="24">
                                <Lock/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="btn-box">
                    <el-button
                        class="btn1"
                        type="primary"
                        round
                        @click="loginHandle(formRef)"
                    >
                        登录
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<style scoped lang="scss">
.page-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-box {
        width: 520px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 20px;
            text-align: center;
            font-weight: 700;
            line-height: 70px;
            letter-spacing: 0.36px;
        }

        .form-box {

            .btn-box {
                display: flex;
                justify-content: center;
                width: 100%;
                margin-top: 40px;

                .btn1 {
                    width: 100%!important;
                    height: 35px;
                    border-radius: 40px;
                    font-size: 18px
                }
            }
        }
    }
}


:deep(.el-input__wrapper) {
    padding: 0 20px;
    height: 40px;
    font-size: 18px;
    background-color: #f6f6f6;
    border-radius: 40px;
    box-shadow: none;
}
</style>
