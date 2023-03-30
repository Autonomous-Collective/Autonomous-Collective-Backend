const client = require("./client");
// const { getTagsByProduct, getTagById } = require("./");
const { getTagsByProduct } = require("./product_tags");
const { getTagById } = require("./tags");

const createProduct = async ({
	title,
	author,
	isbn,
	description,
	price,
	imageUrl,
	quantity,
}) => {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
            INSERT INTO products (title, author, isbn, description, price, img, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING
            RETURNING *
        `,
			[title, author, isbn, description, price, imageUrl, quantity]
		);
		console.log(product, "product from createProduct");
		return product;
	} catch (error) {
		throw error;
	}
};

const editProduct = async (id, fields = {}) => {
	const setString = Object.keys(fields)
		.map((key, index) => `"${key}"=$${index + 1}`)
		.join(", ");

	if (setString.length === 0) {
		return;
	}

	try {
		const {
			rows: [product],
		} = await client.query(
			`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
			Object.values(fields)
		);

		console.log(product, "updated product");
		return product;
	} catch (error) {
		console.error("issue updating product");
		throw error;
	}
};

const getAllProducts = async () => {
	try {
		const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);
		console.log(rows, "all products from getAllProducts");

		//map through rows
		// get all tags associated with product
		// add that tag list to that product

		console.log(getTagsByProduct, "!!!GET TAGS BY PRODUCT FUNCTION!!!");
		rows.map(async (product) => {
			const tagIdList = await getTagsByProduct(product.id);
			console.log(tagIdList, "LINE 79");
			const tags = tagIdList.map((tagId) => {
				console.log(tagId, "TAGID IN PRODUCTS");
				const tagIDMAP = getTagById(tagId);
				return tagIDMAP;
			});
			const thePromises = await Promise.all(tags);
			console.log(thePromises, "from products.js");
			product.tags = thePromises;
		});

		return rows;
	} catch (error) {
		console.error("error getting all products");
		throw error;
	}
};

const getProductByTitle = async (title) => {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
            SELECT *
            FROM products
            WHERE title = $1;
        `,
			[title]
		);
		console.log(product, "product from getProductByTitle");
		return product;
	} catch (error) {
		console.error("error getting product by title");
		throw error;
	}
};
const getProductById = async (id) => {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
            SELECT *
            FROM products
            WHERE id = $1;
        `,
			[id]
		);
		console.log(product, "product from getProductById");
		return product;
	} catch (error) {
		console.error("error getting product by Id");
		throw error;
	}
};
const getProductsByAuthor = async (author) => {
	try {
		const { rows } = await client.query(
			`
            SELECT *
            FROM products
            WHERE author = $1;
        `,
			[author]
		);
		console.log(rows, "product from getProductByauthor");
		return rows;
	} catch (error) {
		console.error("error getting product by author");
		throw error;
	}
};

module.exports = {
	createProduct,
	editProduct,
	getAllProducts,
	getProductByTitle,
	getProductById,
	getProductsByAuthor,
};
