module.exports = {
  /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
  list(params, populate) {
    return strapi
      .query("category")
      .model.find({})
      .select({ name: 1, slug: 1, icon: 1 });
  },
};
