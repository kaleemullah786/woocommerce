<template>
  <div>
    <div class="flex justify-between p-8">
      <h1 class="text-2xl">Orders</h1>
      <button class="underline underline-offset-2 font-semibold" @click.prevent="signOut()">Logout</button>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox"
                class="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded" />
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            Order ID
          </th>

          <th scope="col" class="px-6 py-3">
            Date
          </th>

          <th scope="col" class="px-6 py-3 ">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            Total
          </th>
        </tr>
      </thead>
      <tbody v-for="order in orders" :key="order.id">
        <tr class="bg-white border-b  hover:bg-gray-50 ">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded" />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <th scope="row" class="flex items-center gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
            {{ order.id }}
          </th>
          <td class="px-6 py-4">
            {{ order.date_created }}
          </td>
          <td class="px-6 py-4">
            <button class="hover:underline underline-offset-2" @click.prevent="updateOrder(order.id)">{{ order.status
            }}</button>
          </td>
          <td class="px-6 py-4 ">
            ${{ order.total }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';


const router = useRouter()
let orders = ref(null)
onBeforeMount(async () => {
  if (!localStorage.getItem('key')) {
    router.push({ path: '/' })
  }
  else
    nextTick(async () => {
      const { data } = await useFetch('/api/orders', {
        method: "POST",
        body: { key: localStorage.getItem('key'), secret: localStorage.getItem('secret') }
      })
      console.log(data.value)
      orders.value = data.value
    })
})

const signOut = () => {
  if (typeof (window) != 'undefined') {
    localStorage.removeItem('key')
    localStorage.removeItem('secret')
  }
  router.push({ path: '/' })
}
const updateOrder = async (id) => {


  orders.value.forEach(async order => {
    if (order.id == id)
      if (order.status == 'pending') {
        order.status = 'completed'
        const { data } = await useFetch('api/order', {
          method: 'PUT',
          body: { id, status: order.status, key: localStorage.getItem('key'), secret: localStorage.getItem('secret') }
        })
      }
      else {
        order.status = 'pending'
        const { data } = await useFetch('api/order', {
          method: 'PUT',
          body: { id, status: order.status, key: localStorage.getItem('key'), secret: localStorage.getItem('secret') }
        })
      }
  })


}

</script>