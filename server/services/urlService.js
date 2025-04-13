const UrlModel = require('../models/urlModel');
const moment = require('moment-timezone');
const AppError = require('../utilities/errors.js');
const { STATUS } = require('../utilities/constant.js');

const create = async (req) => {
    const { originalUrl } = req.body;

    const existUrl = await UrlModel.findOne({ userId: req.userId, originalUrl });
    if (existUrl) throw new AppError("URL Already Exist", STATUS.BAD_REQUEST);

    req.body.userId = req.userId;
    const result = await UrlModel.create(req.body);
    const shortUrl = `${req.protocol}://${req.get('host')}/${result.shortId}`;

    return {
        result: {
            ...result.toObject(),
            shortUrl
        },
        message: "URL Created Successfully"
    };
};

const redirect = async (req) => {
    const { shortId } = req;
    const result = await UrlModel.findOne({ shortId });

    if (!result) throw new AppError("URL Not Found", STATUS.BAD_REQUEST);


    result.clicks += 1;
    await result.save();
    return { result };
}
const getAllWithPagination = async (req) => {
    let { page = 1, limit = 100, isDeleted, startDate, endDate } = req.query
    const currentPage = parseInt(page);
    const limitParsed = parseInt(limit);

    let filter = {
        userId: req.userId,
        isDeleted: false
    }

    if (startDate && endDate) {
        filter.createdAt = {};

        if (startDate) {
            filter.createdAt.$gte = moment(startDate, 'MM/DD/YYYY').toDate();
        }
        if (endDate) {
            filter.createdAt.$lte = moment(endDate, 'MM/DD/YYYY').endOf('day').toDate();
        }
    }

    let recordsTotal = await UrlModel.countDocuments(filter);
    const fetchAllUrl = await UrlModel.find(filter).skip((currentPage - 1) * limitParsed).limit(limitParsed).lean();
    return {
        total_pages: Math.ceil(recordsTotal / limit),
        total_count: recordsTotal,
        current_page: currentPage,
        per_page: limitParsed,
        result: fetchAllUrl,
        message: "URL Fetched Successfully"
    };
}


const deleteOne = async (req) => {
    const result = await UrlModel.findOneAndUpdate(
        { _id: req.body._id }, { $set: { isDeleted: true } }, { new: true });
    return { result, message: "URL Deleted Successfully" };
}


module.exports = {
    create,
    deleteOne,
    getAllWithPagination,
    redirect
}
