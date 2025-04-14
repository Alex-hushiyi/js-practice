var obj = {
  data: [],
  getData: function () {
    setTimeout(() => {
      this.data = [1, 2, 3];
      console.log(this.data);
    }, 1000);
  },
};
obj.getData();