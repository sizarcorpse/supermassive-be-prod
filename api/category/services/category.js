module.exports = {
  /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
  async list(params, populate) {
    return await strapi
      .query("category")
      .model.find({})
      .select({ name: 1, slug: 1, icon: 1 });
  },

  async contents(params, populate) {
    let _page;
    let _limit;
    params._page ? (_page = params._page) : (_page = 1);
    params._limit ? (_limit = params._limit) : (_limit = 1);

    const item = await strapi
      .query("category")
      .model.findOne({ slug: params.slug })
      .populate({
        path: "posts",
        populate: {
          path: "categories author comments tags",
        },
        options: {
          skip: (_page - 1) * _limit,
          limit: _limit,
        },
      });

    return item;
  },
};
