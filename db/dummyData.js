//users to add
const usersToAdd = [
  {
    name: "Stephen",
    email: "TheKing@mymail.com",
    password: "password",
    isAdmin: true,
    isGuest: false,
  },
  {
    name: "Nicole",
    email: "Nicolerules@mymail.com",
    password: "password",
    isAdmin: false,
    isGuest: false,
  },
  {
    name: "Victor",
    email: "youngandrestless@mymail.com",
    password: "passwordl",
    isAdmin: false,
    isGuest: false,
  },
  {
    name: "Thomas",
    email: "thomasjohnso@gmail.com",
    password: "password",
    isAdmin: true,
    isGuest: false,
  },
  {
    name: "Andre",
    email: "andre.jacques.pujol@gmail.com",
    password: "password",
    isAdmin: true,
    isGuest: false,
  },
  {
    name: "Alex",
    email: "alexmiriamd@gmail.com",
    password: "password",
    isAdmin: true,
    isGuest: false,
  },
  {
    name: "Josie",
    email: "parker.josie.eden@gmail.com",
    password: "password",
    isAdmin: true,
    isGuest: false,
  },
  {
    name: "Barbara",
    email: "barbarian@mymail.com",
    password: "password",
    isAdmin: false,
    isGuest: false,
  },
];

//user addresses
const userAddresses = [
  {
    name: "Jim",
    address: "7492 Wentworth Street",
    city: "Oklahoma City",
    state: "OK",
    userId: 1,
  },
  {
    name: "Sara",
    address: "507 Clinton Street",
    city: "Jacksonville",
    state: "FL",
    userId: 3,
  },
  {
    name: "Blob",
    address: "9316 Center Rd.",
    city: "Houston",
    state: "TX",
    userId: 4,
  },
];

//products to add
const productsToAdd = [
  {
    title: "To Kill A Mocking Bird",
    author: "Harper Lee",
    isbn: "9781234567897",
    description:
      "Fashion axe messenger bag kickstarter normcore neutra hella authentic pitchfork typewriter butcher. Blackbird spyplane edison",
    price: 1499,
    imageUrl:
      "https://fastly.picsum.photos/id/646/200/300.jpg?hmac=qCJ0bf6G6oSxx8YMMc1ZLVryK-w596XjRD3o8cXQLFc",
    quantity: 30,
  },
  {
    title: "Liquid Rules",
    author: "Mark Miodownik",
    isbn: "9781234567898",
    description:
      "Chambray letterpress deep v pickled polaroid scenester bodega boys lumbersexual same 3 wolf moon vape copper mug PBR&B YOLO fam. ",
    price: 1599,
    imageUrl:
      "https://fastly.picsum.photos/id/432/200/300.jpg?hmac=S0muAtaN6T0PXbBlf5O-UL0chTPM6i9FReOIs0IJlDU",
    quantity: 21,
  },
  {
    title: "Out",
    author: "Natsuo Kirino",
    isbn: "9781234567899",
    description:
      "Street art hella vegan listicle. Pour-over church-key palo santo put a bird on it, kitsch vaporware bruh big mood shaman. Selvage tacos four dollar toast, neutral milk hotel pop-up cornhole squid artisan.",
    price: 1800,
    imageUrl:
      "https://fastly.picsum.photos/id/670/200/300.jpg?hmac=Ib58hZuwIQfcFZjEvKKi0p-j4GN1BGIkE7wLsa95Xk4",
    quantity: 30,
  },
  {
    title: "Six of Crows",
    author: "Leigh Bardugo",
    isbn: "9781234567900",
    description:
      "Vinyl tousled taiyaki hammock, lumbersexual quinoa freegan mukbang occupy pour-over 90's fam DIY slow-carb ramps.",
    price: 1899,
    imageUrl:
      "https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ",
    quantity: 20,
  },
  {
    title: "Death On The Nile",
    author: "Agatha Christie",
    isbn: "9781234567901",
    description:
      "Scenester tacos listicle occupy, lyft actually keytar Brooklyn skateboard migas. Bicycle rights man braid unicorn gorpcore. Affogato hammock banh mi mixtape.",
    price: 1399,
    imageUrl:
      "https://fastly.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg",
    quantity: 30,
  },
  {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    isbn: "9781234567902",
    description:
      " Knausgaard 8-bit subway tile banh mi 3 wolf moon microdosing disrupt occupy hammock portland art party.",
    price: 1600,
    imageUrl:
      "https://fastly.picsum.photos/id/194/200/300.jpg?hmac=jZgjsqqVvdWnXHdytjS2JPImgQFz9bGSyVQ31-b_eH4",
    quantity: 27,
  },
  {
    title: "Anne of Green Gables",
    author: "Lucy Maud Montgomery",
    isbn: "9781234567903",
    description:
      "Brunch chillwave vinyl meggings subway tile. Pop-up lyft migas, biodiesel cornhole listicle kinfolk roof party green juice Brooklyn shoreditch.",
    price: 1700,
    imageUrl:
      "https://fastly.picsum.photos/id/439/200/300.jpg?hmac=-995cverChuR_nKZFItxOP38htc5deVMd6ZrKiME55g",
    quantity: 20,
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "9781234567904",
    description:
      "Chambray letterpress deep v pickled polaroid scenester bodega boys lumbersexual same 3 wolf moon vape copper mug PBR&B YOLO fam. ",
    price: 1299,
    imageUrl:
      "https://fastly.picsum.photos/id/130/200/300.jpg?hmac=ax-dkx2e5CJww9f5IfH-mUHr_9eNBKUNGHcA46-0oB0",
    quantity: 15,
  },
  {
    title: "The Complete Sherlock Holmes",
    author: "Sir Arthur Conan Doyle",
    isbn: "9781234567905",
    description: "Elementary my dear Watson!!!!",
    price: 300,
    imageUrl:
      "https://fastly.picsum.photos/id/1072/200/300.jpg?hmac=uzq3N0ox40X06q0Ql4mCdgMwHc13gIa0QAuu_6Zp6lQ",
    quantity: 25,
  },
  {
    title: "Pride & Prejudice",
    author: "Jane Austen",
    isbn: "9781234567906",
    description: "Mr. DDDaaaarrrccyyyyy!!!!",
    price: 799,
    imageUrl:
      "https://fastly.picsum.photos/id/1080/200/300.jpg?hmac=3jCG4X8ni9cpiEppj6KVvqhpJ_owIFtDQOABJmhG1I0",
    quantity: 20,
  },
];

//tags to add
const tagsToAdd = [
  {
    name: "Fiction",
  },
  {
    name: "Nonfiction",
  },
  {
    name: "Young Adult",
  },
  {
    name: "Mystery",
  },
  {
    name: "Thriller",
  },
  {
    name: "Fantasy",
  },
  {
    name: "Romance",
  },
  {
    name: "Historical Fiction",
  },
  {
    name: "Biography",
  },
  {
    name: "Science",
  },
];

//reviews to add
const reviewsToAdd = [
  {
    score: 2,
    title: "Loved it!",
    content: "Classic...must read!!",
    reviewerId: 4,
    productId: 1,
  },
  {
    score: 3,
    title: "Water is life!",
    content:
      "Celiac stumptown snackwave kitsch enamel pin cloud bread yuccie messenger bag tumblr readymade retro swag thundercats authentic. ",
    reviewerId: 3,
    productId: 2,
  },
  {
    score: 4,
    title: "Edge of my seat!",
    content: "So suspenseful. can't wait for another entry in the series!",
    reviewerId: 2,
    productId: 3,
  },
  {
    score: 5,
    title: "Will transport you to another world.",
    content: "5/5....it's a must read.",
    reviewerId: 1,
    productId: 4,
  },
];

const productTagsToAdd = [
  {
    productId: 1,
    tagId: [1, 8],
  },
  {
    productId: 2,
    tagId: [2, 10],
  },
  {
    productId: 3,
    tagId: [1, 5],
  },
  {
    productId: 4,
    tagId: [1, 3, 6],
  },
];

const userCartsToAdd = [
  {
    cartOwnerId: 1,
    isOrdered: false,
  },
  {
    cartOwnerId: 2,
    isOrdered: false,
  },
  {
    cartOwnerId: 3,
    isOrdered: false,
  },
  {
    cartOwnerId: 4,
    isOrdered: false,
  },
];

const cartProductsToAdd = [
  {
    productId: 1,
    cartId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    cartId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    cartId: 2,
    quantity: 3,
  },
  {
    productId: 3,
    cartId: 3,
    quantity: 2,
  },
  {
    productId: 4,
    cartId: 4,
    quantity: 1,
  },
];

module.exports = {
  usersToAdd,
  userAddresses,
  productsToAdd,
  productTagsToAdd,
  userCartsToAdd,
  cartProductsToAdd,
  reviewsToAdd,
  tagsToAdd,
};
