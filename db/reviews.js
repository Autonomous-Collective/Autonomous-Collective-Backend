const client = require("./client");

const createReview = async ({
  score,
  title,
  content,
  reviewerId,
  productId,
}) => {
  try {
    console.log("Starting to Create Review");
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO reviews (score, title, content, "reviewerId", "productId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `,
      [score, title, content, reviewerId, productId]
    );
    console.log("Finished creating review", review);
    return review;
  } catch (error) {
    console.error("Error Creating Review");
    throw error;
  }
};

const editReview = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    console.log("Starting to Edit Review");
    const {
      rows: [review],
    } = await client.query(
      `
                 UPDATE reviews
                 SET ${setString}
                 WHERE id=${id}
                 RETURNING *;
                 `,
      Object.values(fields)
    );

    console.log("Finished Editing Review", review);
    return review;
  } catch (error) {
    console.error("Error Editing Review");
    throw error;
  }
};

const deleteReview = async (id) => {
  try {
    console.log("Starting to delete review", id);
    const {
      rows: [review],
    } = await client.query(
      `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    console.log("Finished deleting review");
    return review;
  } catch (error) {
    console.error("Failed to delete review");
    throw error;
  }
};

const getAllReviews = async () => {
  try {
    console.log("starting to get all reviews");

    const { rows } = await client.query(`
        SELECT *
        FROM reviews;
        `);
    console.log("Finished getting all reviews", rows);

    return rows;
  } catch (error) {
    console.error("error getting reviews");
    throw error;
  }
};

const getReviewsByProductId = async (id) => {
  try {
    console.log("started getting review by product id", id);
    const { rows } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE "productId" = $1;
        `,
      [id]
    );

    console.log("finished getting review by product id", rows);
    return rows;
  } catch (error) {
    console.error("error getting review by product id");
    throw error;
  }
};

module.exports = {
  createReview: createReview,
  editReview: editReview,
  getAllReviews: getAllReviews,
  getReviewsByProductId: getReviewsByProductId,
  deleteReview: deleteReview,
};
