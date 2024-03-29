const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bookingtableService } = require('../services');
const pick = require('../utils/pick');

const bookingtable = catchAsync(async (req, res) => {
  const data = await bookingtableService.createBookingTable(req.body);
  res.status(httpStatus.CREATED).send({ message: 'Đặt bàn thành công', data });
});

const getBookingTable = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookingtableService.queryBookingTable(filter, options);
  res.send(result);
});

const deleteBookingTable = catchAsync(async (req, res) => {
  const data = await bookingtableService.deleteBookingTableById(req.params.bookingTableId);
  res.status(httpStatus.NO_CONTENT).send({ message: 'delete successful booking table', data });
});

module.exports = {
  bookingtable,
  getBookingTable,
  deleteBookingTable,
};
