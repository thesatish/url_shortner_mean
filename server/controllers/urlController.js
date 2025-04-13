const handleAsync = require('../utilities/handleAsync.js');
const { urlSchema } = require('../utilities/validation.js');
const AppError = require('../utilities/errors.js');
const { STATUS } = require('../utilities/constant.js');
const { create, deleteOne, getAllWithPagination, redirect } = require('../services/urlService.js');

const createUrl = handleAsync(async (req, res) => {
    const { error } = urlSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, STATUS.BAD_REQUEST);
    const response = await create(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, data: response };
});

const urlRedirect = handleAsync(async (req, res) => {
    const response = await redirect(req.params);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return res.redirect(response.result.originalUrl);
});

const fetchAllUrl = handleAsync(async (req, res) => {
    const response = await getAllWithPagination(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, data: response };
});


const deleteTask = handleAsync(async (req, res) => {
    const response = await deleteOne(req);
    if (!response) throw new AppError(response.message, STATUS.BAD_REQUEST);
    return { status: STATUS.CREATED, message: response.message, data: response.result };
});


module.exports = {
    createUrl,
    fetchAllUrl,
    deleteTask,
    urlRedirect
}
