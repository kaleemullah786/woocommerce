<template>
    <div class="w-full flex flex-col gap-8 min-h-screen h-auto bg-gray-100 lg:py-8 xl:p-0">
        <p v-if="error"
            className="p-4 rounded-md shadow-md font-semibold text-white bg-red-300 absolute top-4 flex self-center transition-all">
            Sign up failed! Kindly provide correct information</p>
        <div class="flex w-[90%] md:w-[45%] flex-col gap-8 m-auto">
            <h1 class="text-lg lg:text-2xl font-bold text-center">Create your account</h1>
            <div class="gap-8 bg-white flex rounded-md shadow-sm p-8  w-full flex-col">
                <div class="flex flex-col gap-4">
                    <form class="flex flex-col gap-4">
                        <label htmlFor="email" class="font-semibold">Email Address</label>
                        <input required
                            class="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2"
                            type="email" id="email" placeholder="name@example.com" v-model="email" />
                        <label htmlFor="pwd" class="font-semibold">Password</label>
                        <input required
                            class="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2"
                            type="password" id="pwd" placeholder="**********" v-model="pwd" />
                        <label htmlFor="key" class="font-semibold">Consumer Key</label>
                        <input required
                            class="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2"
                            type="text" id="key" placeholder="e.g ck_xxxxxxxxxxxxxxxxxxxxxx" v-model="key" />
                        <label htmlFor="secret" class="font-semibold">Consumer Secret</label>
                        <input required
                            class="p-2 bg-[#88888812] rounded-md border-2 border-gray-300 focus:outline-blue-300 focus:outline-2"
                            type="text" id="secret" placeholder="e.g cs_xxxxxxxxxxxxxxxxxxxxxx" v-model="secret" />
                        <button class="p-2 bg-black text-white rounded-md font-semibold" @click.prevent="signUp()">Sign
                            up</button>
                    </form>
                </div>
            </div>
            <p class="text-center">Already have an account? <NuxtLink href='/' class="font-semibold underline">Sign in
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
let email, pwd, key, secret;
let error = ref(false)
const router=useRouter()
const signUp = async () => {
    const { data } = await useFetch('/api/signup', {
        method: 'POST',
        body: { email, pwd, key, secret }
    })
    if (data.value) {
        localStorage.setItem('key', data.value.key)
        localStorage.setItem('secret', data.value.secret)
        router.push({ path: "/orders" })
    }
    else
    error.value=true
}
</script>