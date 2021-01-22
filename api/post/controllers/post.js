const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async page(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.post.search(ctx.query);
    } else {
      entities = await strapi.services.post.page(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.post })
    );
  },

  async views(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.post.findOne({ id });
    await strapi.services.post.viewInc({ id });
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
