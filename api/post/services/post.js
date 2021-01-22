module.exports = {
  /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
  page(params, populate) {
    let _page;
    let _limit;
    params._page ? (_page = params._page) : (_page = 1);
    params._limit ? (_limit = params._limit) : (_limit = 1);

    return strapi
      .query("post")
      .model.find({})
      .populate({ path: "categories author comments tags" })
      .skip((parseInt(_page) - 1) * parseInt(_limit))
      .limit(parseInt(_limit));
  },

  async viewInc(params, data, { files } = {}) {
    await strapi
      .query("post")
      .update({ _id: params.id }, { $inc: { views: +1 } });

    return `viewed`;
  },
};
