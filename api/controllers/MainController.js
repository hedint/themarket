/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : (req, res) => {
        VkParseService.getLastPosts(10, (vk_posts) => {
          let items = vk_posts.response.items;
          let posts = [];
          items.forEach((item) => {
            let tmp_post = VkParseService.parsePost(item);
            if (tmp_post) {
              posts.push(tmp_post);
            }
          });
          res.json(posts);
        })
    }
};

