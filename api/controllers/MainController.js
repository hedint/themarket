/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : (req, res) => {
        VkParseService.getLastPosts(10, (posts) => {
            res.json(posts);
        })
    }
};

