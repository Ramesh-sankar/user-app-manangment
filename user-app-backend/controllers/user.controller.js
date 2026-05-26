const axios = require('axios')
const { Op } = require("sequelize");
const https = require("https");
const sequelize = require("../config/db.js")
const moment = require("moment")

const User = require("../models/userModel");
const { chunkArray } = require("../utills/helper");

const getUsers = async (req, res, next) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll(
      {
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]:
                  `%${search}%`,
              },
            },
            {
              companyName: {
                [Op.like]:
                  `%${search}%`,
              },
            },
            {
              role: {
                [Op.like]:
                  `%${search}%`,
              },
            },
            {
              country: {
                [Op.like]:
                  `%${search}%`,
              },
            },
          ],
        },
        limit,
        offset,
      });

    res.status(200).json({
      success: true,

      totalRecords: count,

      totalPages: Math.ceil(
        count / limit
      ),

      currentPage: page,

      users: rows,
    });

  } catch (error) {
    next(error);
  }
};

const mockUserlist = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    let { flush = 'false' } = req.query;

    if (flush && flush === 'true') {
      await User.destroy({
        where: {},
        truncate: true,
      });
      console.log('Data Deleted succssfully')
    }
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const { data } = await axios.get("https://dummyjson.com/users", {
      httpsAgent: agent,
    });

    const users = data?.users || [];

    if (!users.length) {
      await transaction.rollback();
      return res.status(500).json({
        success: false,
        message: "No users found from third-party API",
      });
    }

    const formattedData = users.map((user) => {
      const company = user?.company || {};
      const address = company?.address || {};
      const userAddress = user?.address || {};

      return {
        ...user,

        birthDate: user.birthDate
          ? moment(user.birthDate).format("YYYY-MM-DD")
          : null,

        companyDepartment: company?.department ?? null,
        companyName: company?.name ?? null,
        companyTitle: company?.title ?? null,

        companyCity: address?.city ?? null,
        companyState: address?.state ?? null,
        companyStateCode: address?.stateCode ?? null,
        companyPostalCode: address?.postalCode ?? null,
        companyCountry: address?.country ?? null,

        city: userAddress?.city ?? null,
        state: userAddress?.state ?? null,
        stateCode: userAddress?.stateCode ?? null,
        postalCode: userAddress?.postalCode ?? null,
        country: userAddress?.country ?? null,
      };
    });

    const BATCH_SIZE = 500;
    const chunks = chunkArray(formattedData, BATCH_SIZE);

    for (const chunk of chunks) {
      await User.bulkCreate(chunk, {
        transaction,
        validate: true,
      });
    }

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "All users inserted successfully",
      total: users.length,
    });

  } catch (error) {
    await transaction.rollback();

    console.error("mockUserlist error:", error.message);

    return next(error);
  }
};
module.exports = {
  getUsers,
  mockUserlist
};