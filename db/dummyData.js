//users to add
const usersToAdd = [
  {
    name: "Stephen",
    email: "TheKing@mymail.com",
    password: "password",
    isAdmin: false,
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
    password: "password",
    isAdmin: false,
    isGuest: false,
  },
  {
    name: "Barbara",
    email: "barbarian@mymail.com",
    password: "password",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/800px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    inventory: 30,
  },
  {
    title: "Liquid Rules",
    author: "Mark Miodownik",
    isbn: "9781234567898",
    description:
      "Chambray letterpress deep v pickled polaroid scenester bodega boys lumbersexual same 3 wolf moon vape copper mug PBR&B YOLO fam. ",
    price: 1599,
    imageUrl:
      "https://m.media-amazon.com/images/I/51Ve9Eag4HL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    inventory: 21,
  },
  {
    title: "Out",
    author: "Natsuo Kirino",
    isbn: "9781234567899",
    description:
      "Street art hella vegan listicle. Pour-over church-key palo santo put a bird on it, kitsch vaporware bruh big mood shaman. Selvage tacos four dollar toast, neutral milk hotel pop-up cornhole squid artisan.",
    price: 1800,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386749063i/25365.jpg",
    inventory: 30,
  },
  {
    title: "Six of Crows",
    author: "Leigh Bardugo",
    isbn: "9781234567900",
    description:
      "Vinyl tousled taiyaki hammock, lumbersexual quinoa freegan mukbang occupy pour-over 90's fam DIY slow-carb ramps.",
    price: 1899,
    imageUrl: "https://pictures.abebooks.com/inventory/md/md31238441586.jpg",
    inventory: 20,
  },
  {
    title: "Death On The Nile",
    author: "Agatha Christie",
    isbn: "9781234567901",
    description:
      "Scenester tacos listicle occupy, lyft actually keytar Brooklyn skateboard migas. Bicycle rights man braid unicorn gorpcore. Affogato hammock banh mi mixtape.",
    price: 1399,
    imageUrl:
      "https://img.thriftbooks.com/api/images/i/m/D342C0D0C8E75C6958E10BEFF19D961138A92C43.jpg",
    inventory: 30,
  },
  {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    isbn: "9781234567902",
    description:
      " Knausgaard 8-bit subway tile banh mi 3 wolf moon microdosing disrupt occupy hammock portland art party.",
    price: 1600,
    imageUrl:
      "https://images.bwbcovers.com/140/The-Immortal-Life-of-Henrietta-Lacks-Skloot-Rebecca-9781400052189.jpg",
    inventory: 27,
  },
  {
    title: "Anne of Green Gables",
    author: "Lucy Maud Montgomery",
    isbn: "9781234567903",
    description:
      "Brunch chillwave vinyl meggings subway tile. Pop-up lyft migas, biodiesel cornhole listicle kinfolk roof party green juice Brooklyn shoreditch.",
    price: 1700,
    imageUrl:
      "https://img.thriftbooks.com/api/images/m/fcdfdad9747d57367091fd300a2a2c9b521ceca8.jpg",
    inventory: 20,
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "9781234567904",
    description:
      "Chambray letterpress deep v pickled polaroid scenester bodega boys lumbersexual same 3 wolf moon vape copper mug PBR&B YOLO fam. ",
    price: 1299,
    imageUrl:
      "https://img.thriftbooks.com/api/images/i/m/5F92BF40A48403D452DED2AD1527744B22B9C49F.jpg",
    inventory: 15,
  },
  {
    title: "The Complete Sherlock Holmes",
    author: "Sir Arthur Conan Doyle",
    isbn: "9781234567905",
    description: "Elementary my dear Watson!!!!",
    price: 300,
    imageUrl:
      "https://img.thriftbooks.com/api/images/m/088e6fcfbe18926f407c3808a30f7721b249be96.jpg",
    inventory: 25,
  },
  {
    title: "Pride & Prejudice",
    author: "Jane Austen",
    isbn: "9781234567906",
    description: "Mr. DDDaaaarrrccyyyyy!!!!",
    price: 799,
    imageUrl: "https://m.media-amazon.com/images/I/41FEoMd5E9L._SL350_.jpg",
    inventory: 20,
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    isbn: "9781234567906",
    description:
      "My name is Kvothe. I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep You may have heard of me.",
    price: 1099,
    imageUrl:
      "https://m.media-amazon.com/images/I/51JThzjy3gL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    inventory: 20,
  },
  {

    title: "The Naturals", 
    author: "Jennifer Lynn Barnes",
    isbn: "9781423168232", 
    description: "Freegan tofu disrupt organic DSA. Flannel forage poutine solarpunk pug.",
    price: 1599, 
    imageUrl: "https://books.images.hpb.com/9781423168317/large.jpg",
    inventory: 20
  },
  {
    title: "The Phantom of the Opera", 
    author: "Gaston Le Roux", 
    isbn: "9781483706979", 
    description: "Before they sold out celiac chia distillery master cleanse, affogato gochujang tbh DIY glossier green juice tumeric typewriter.", 
    price: 1613, 
    imageUrl: "https://books.images.hpb.com/9781483706979/large.jpg",
    inventory: 15
  },
  {
    title: "A Court of Thorns and Roses", 
    author: "Sarah J. Maas", 
    isbn: "9781635575569", 
    description: "Disrupt portland raw denim heirloom, godard man braid etsy lomo kale chips hammock cardigan green juice williamsburg dreamcatcher marfa.", 
    price: 899, 
    imageUrl: "https://images.alibris.com/isbn/9781635575569.gif", 
    inventory: 17
  },
  {
    title: "One of Us Is Lying",
    author: "Karen M. McManus", 
    isbn: "9781524714680", 
    description: "Disrupt portland raw denim heirloom, godard man braid etsy lomo kale chips hammock cardigan green juice williamsburg dreamcatcher marfa.", 
    price: 849,
    imageUrl: "https://books.images.hpb.com/9781524714680/large.jpg", 
    inventory:  12
  },
  {
    title: "Truly, Madly, Deadly", 
    author: "Hannah Jayne", 
    isbn: "9781402281211",
    description: "Disrupt portland raw denim heirloom, godard man braid etsy lomo kale chips hammock cardigan green juice williamsburg dreamcatcher marfa.",
    price: 499,
    imageUrl: "https://books.images.hpb.com/9781402281211/large.jpg",
    inventory: 15
  }

    title: "The Wise Man's Fear",
    author: "Patrick Rothfuss",
    isbn: "0781234567906",
    description: `“There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.”
 
    My name is Kvothe. You may have heard of me.
     
    So begins a tale told from his own point of view—a story unequaled in fantasy literature. Now in The Wise Man’s Fear, Day Two of The Kingkiller Chronicle, an escalating rivalry with a powerful member of the nobility forces Kvothe to leave the University and seek his fortune abroad. Adrift, penniless, and alone, he travels to Vintas, where he quickly becomes entangled in the politics of courtly society.  `,
    price: 1599,
    imageUrl:
      "https://m.media-amazon.com/images/I/51-ckcKhlAL._SX308_BO1,204,203,200_.jpg",
    inventory: 20,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9781234567906",
    description:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for....",
    price: 2099,
    imageUrl:
      "https://m.media-amazon.com/images/I/41+L9Q+rCLL._SY344_BO1,204,203,200_.jpg",
    inventory: 20,
  },
  {
    title: "Chainsaw Man, Vol. 1",
    author: "Tatsuki Fujimoto",
    isbn: "9781234567906",
    description:
      "Denji’s a poor young man who’ll do anything for money, even hunting down devils with his pet devil Pochita. He’s a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he’s betrayed by someone he trusts. Now with the power of a devil inside him, Denji’s become a whole new man—Chainsaw Man!",
    price: 999,
    imageUrl:
      "https://m.media-amazon.com/images/P/B08JTYRXZB.01._SCLZZZZZZZ_SX500_.jpg",
    inventory: 20,
  },
  {
    title: "The Final Empire",
    author: "Brandon Sanderson",
    isbn: "9781234567906",
    description: `For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler's most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.`,
    price: 1099,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617768316i/68428.jpg",
    inventory: 20,
  },
  {
    title: "Elantris",
    author: "Brandon Sanderson",
    isbn: "9781234567906",
    description: `Elantris was the capital of Arelon: gigantic, beautiful, literally radiant, filled with benevolent beings who used their powerful magical abilities for the benefit of all. Yet each of these demigods was once an ordinary person until touched by the mysterious transforming power of the Shaod. Ten years ago, without warning, the magic failed. Elantrians became wizened, leper-like, powerless creatures, and Elantris itself dark, filthy, and crumbling.`,
    price: 1299,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1475740953i/68427.jpg",
    inventory: 20,
  },
  {
    title: "Gideon the Ninth",
    author: "Tamsyn Muir",
    isbn: "9781234567906",
    description: `The Emperor needs necromancers.

    The Ninth Necromancer needs a swordswoman.
    
    Gideon has a sword, some dirty magazines, and no more time for undead bullshit.
    
    Brought up by unfriendly, ossifying nuns, ancient retainers, and countless skeletons, Gideon is ready to abandon a life of servitude and an afterlife as a reanimated corpse. She packs up her sword, her shoes, and her dirty magazines, and prepares to launch her daring escape. But her childhood nemesis won't set her free without a service.`,
    price: 1299,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546870952i/42036538.jpg",
    inventory: 20,
  },
  {
    title: "Cell",
    author: "Stephen King",
    isbn: "9781234567906",
    description: `'Civilization slipped into its second dark age on an unsurprising track of blood but with a speed that could not have been foreseen by even the most pessimistic futurist. By Halloween, every major city from New York to Moscow stank to the empty heavens and the world as it had been was a memory.' The event became known as The Pulse. The virus was carried by every cell phone operating within the entire world. Within hours, those receiving calls would be infected. A young artist Clayton Riddell realises what is happening. He flees the devastation of explosive, burning Boston, desperate to reach his son before his son switches on his little red mobile phone ...`,
    price: 1399,
    imageUrl:
      "https://m.media-amazon.com/images/P/1668025205.01._SCLZZZZZZZ_SX500_.jpg",
    inventory: 20,
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
