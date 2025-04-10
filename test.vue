<template>
    <div class="custom-select">
      <!-- 多选显示标签 -->
      <div v-if="multiple" class="tags">
        <span v-for="item in selected" :key="item.value">
          {{ item.label }}
          <button @click="remove(item)">×</button>
        </span>
      </div>
      <!-- 输入框 -->
      <input
        v-model="searchText"
        @input="onSearch"
        @focus="showOptions = true"
        :disabled="disabled"
        placeholder="请选择"
      />
      <!-- 清空按钮 -->
      <button v-if="showClear" @click="clear">清空</button>
      <!-- 下拉选项 -->
      <ul v-show="showOptions">
        <li
          v-for="item in filteredOptions"
          :key="item.value"
          @click="select(item)"
          :class="{ disabled: item.disabled }"
        >
          <slot name="item" :item="item">{{ item.label }}</slot>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: Array,          // 选项列表
      multiple: Boolean,       // 是否多选
      remote: Function,        // 远程搜索方法
      disabled: Boolean,       // 禁用状态
    },
    data() {
      return {
        selected: [],         // 已选值（多选为数组，单选为对象）
        searchText: '',        // 搜索文本
        showOptions: false,   // 控制下拉显示
        remoteData: []        // 远程数据
      };
    },
    computed: {
      filteredOptions() {
        return this.remoteData.length > 0 ? this.remoteData : this.options;
      },
      showClear() {
        return this.selected.length > 0 && !this.disabled;
      }
    },
    methods: {
      onSearch() {
        if (this.remote) {
          this.remote(this.searchText).then(data => this.remoteData = data);
        }
      },
      select(item) {
        if (this.multiple) {
          this.selected.push(item);
        } else {
          this.selected = [item];
          this.showOptions = false;
        }
        this.$emit('input', this.selected);
      },
      remove(item) {
        this.selected = this.selected.filter(i => i !== item);
      },
      clear() {
        this.selected = [];
        this.searchText = '';
      }
    }
  };
  </script>