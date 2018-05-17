<template>
    <ul class="product-wrapper">
        <li class="row header">
            <div v-for="(th,i) in tHeader" :key="i">{{ th }}</div>
        </li>
        <li class="row" v-for="product in currentProducts" :key="product.id">
            <div>{{ product.title }}</div>
            <div>{{ product.price }}</div>
            <div>{{ product.inventory - product.quantity }}</div>
            <div>
                <el-input-number
                    :min="0" :max="product.inventory"
                    v-model="product.quantity"
                    @change="handleChange">
                </el-input-number>
            </div>
        </li>
    </ul>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        tHeader: ['名称', '价格', '剩余库存', '操作'],
        currentProducts: []
      }
    },
    computed: {
      ...mapGetters(['allProducts'])
    },
    watch: {
      allProducts: {
        handler(val) {
          this.currentProducts = JSON.parse(JSON.stringify(this.allProducts))
        },
        deep: true
      }
    },
    created() {
      this.getAllProducts()

    },
    methods: {
      handleChange() {
        this.setProducts(this.currentProducts)
      },
      ...mapMutations(['setProducts']),
      ...mapActions(['getAllProducts']),
    }
  }
</script>