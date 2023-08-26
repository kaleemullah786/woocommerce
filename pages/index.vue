<template>
    <div class="w-full flex flex-col gap-8 min-h-screen h-auto bg-gray-100 lg:py-8 xl:p-0">
        <p v-if="error"
            className="p-4 rounded-md shadow-md font-semibold text-white bg-red-300 absolute top-4 flex self-center transition-all">
            Sign in failed! Kindly check your credentials</p>
        <div class="flex w-[90%] md:w-[45%] flex-col gap-8 m-auto">
            <h1 class="text-lg lg:text-2xl font-bold text-center">Sign in to your account</h1>
            <div class="gap-8 bg-white flex rounded-md shadow-sm p-8  w-full flex-col">
                <div class="flex flex-col gap-4">
                    <form class="flex flex-col gap-4">
                        <label htmlFor="email" class="font-semibold">Email Address</label>
                        <input required v-model="email"
                            class="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2"
                            type="email" id="email" placeholder="name@example.com" />
                        <label htmlFor="pwd" class="font-semibold">Password</label>
                        <input required v-model="pwd"
                            class="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2"
                            type="password" id="pwd" placeholder="**********" />

                        <button class="p-2 bg-black text-white rounded-md font-semibold" @click.prevent="signIn()">Sign
                            in</button>
                    </form>

                </div>
            </div>
            <p class="text-center">Don't have an account? <NuxtLink href='/signup' class="font-semibold underline">Sign up
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
<script setup>
const router = useRouter()
let email, pwd;
let error = ref(false)
onBeforeMount(() => {
    if (localStorage.getItem('key'))
        router.push({ path: "/orders" })

})
const signIn = async () => {
    const { data } = await useFetch('api/signin', {
        method: 'POST',
        body: { email, pwd }
    })
    if (data.value) {
        localStorage.setItem('key', data.value.key)
        localStorage.setItem('secret', data.value.secret)
        router.push({ path: "/orders" })
    }
    else
        error.value = true
}
</script>