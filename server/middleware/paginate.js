module.exports.paginateUsers = (req, res, next) => {
    const {page = 1, results = 5} = req.query

    req.pagination = {
        limit: Number(results),
        offset: (page - 1) * results,
    };

    next();
};