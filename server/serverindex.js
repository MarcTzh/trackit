const { GraphQLServer } = require('graphql-yoga');
// const parser = require('./AmazonParser.js');
const parser = require('./checkPrice');
const Mailer = require("./Mailer");
const mongoose = require('mongoose');
const notification = require('./notification');
// const { default: UserContext } = require('../src/context/UserContext');
mongoose.connect('mongodb+srv://teamBogo:rainbow6siege@cluster0-vo9fe.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);




//schema model
const Product = mongoose.model('product', {
  name: String,
  category: String,
  brand: String,
  price: Number,
  url: String,
  minPrice: Number,
  priceArray: [Number],
  dateArray: [String],
  userID: String,
  isScraped: Boolean,
});


const Category = mongoose.model('category', {
  name: String,
  userID: String,
  date: Date
});


// schema
const typeDefs = `
  type Query {
    hello(name: String): String! 
    products: [Product]
    categories: [Category]
    userProducts(info: String): [Product]
  }

  type Product {
    id : ID!
    name: String!
    category: String!
    brand: String!
    price: Float
    url: String!
    minPrice: Float!
    priceArray:  [Float]!
    dateArray:  [String!]!
    userID: String!
    date: String
    isScraped: Boolean
  }
 
  type Category {
    id: ID!
    name: String!
    userID: String!
    date: String
  }
  
  type Mutation {
      createProduct(
        name: String!, 
        category: String!, 
        brand: String!, 
        price: Float, 
        url: String!,
        minPrice: Float!,
        priceArray: [Float]!,
        dateArray: [String!]!,
        userID: String!,
        date: String,
        isScraped: Boolean
      ): Product

      createTestProduct(
        name: String!, 
        category: String!, 
        brand: String!, 
        price: Float, 
        url: String!,
        minPrice: Float!,
        priceArray: [Float]!,
        dateArray: [String!]!,
        userID: String!,
        date: String,
      ): Product

      updateProductPrice(
        id: ID!,
        price: Float,
        isScraped: Boolean!
      ): Boolean

      addPriceAndDate(
        id: ID!,
        url: String!,
        date: String!,
        price: Float,
        priceArray: [Float]!,
        dateArray: [String!]!,
        email: String!
      ): Boolean

      removeProduct(
        id: ID!
      ): Boolean

      createCategory(
        name: String!
        userID: String!
      ): Category

      updateCategory(
        id: ID!,
        name: String!
      ): Boolean

      updateProduct(
        id: ID!,
        name: String!
        url: String!
      ): Boolean

      removeCategory(
        id: ID!
      ): Boolean

      addDateCategory(
        id: ID!
        date: String
      ): Boolean
  }
`


const resolvers = {
  Query: {
    // if no name given, say "hello world"
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    products: () => Product.find(),
    categories: () => Category.find(),
    userProducts: (_, { info }) => Product.find({userID: info}),
  },
  
  Mutation: { 
      createProduct: async (_,{ name, category, brand, price, url, minPrice, priceArray, dateArray, userID}) => {
        price = await (parser.checkPrice(url));
        console.log("price" + price);
        if(url.includes('amazon')) {
          brand = 'Amazon'
        } else if(url.includes('lazada')) {
          brand = 'Lazada'
        } else if(url.includes('qoo10')) {
          brand = 'Qoo10'        
        } else {
          brand = 'Other Brands'
        }
        priceArray.push(price);
        if(Number.isNaN(price)) {
          price = null;
        }
        const product = new Product({name, category, brand, price, url, minPrice, priceArray, dateArray, userID});
        //saves in data base as it is a promise
        await product.save();
        return product;
      },

      createTestProduct: async (_,{ name, category, brand, price, url, minPrice, priceArray, dateArray, userID}) => {
        const product = new Product({name, category, brand, price, url, minPrice, priceArray, dateArray, userID});
        await product.save();
        return product;
      },

      createCategory: async (_,{ name, userID }) => {
        const category = new Category({name, userID});
        await category.save();
        return category;
      },

      updateProductPrice: async (_, {id, price, isScraped}) => {
        price = await (parser.checkPrice('https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=Q8JXJJGZ570KZ05BZK33&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051'));
        await Product.findByIdAndUpdate(id, {price, isScraped});
        return true;
      },
      
      addPriceAndDate: async (_, {id, url, date, price, priceArray, dateArray, email}) => {
        console.log("Start");
        price = parseFloat(await parser.checkPrice(url));
        console.log("Price in serverindex: " + price);
        const pdt = await Product.findById(id);
        if(Number.isNaN(price)) {
          price = null;
          await Product.findByIdAndUpdate(id, {url, date, priceArray, dateArray});
          notification.notify(email, pdt, true);
          console.log("notify broken link: " + email)
          return false;
        } else {
          priceArray.push(price);
          // console.log("pushed into priceArray");
          dateArray.push(date);
          notification.notify(email, pdt, false);
          console.log("notify price drop: " + email)
          // console.log("pushed into dateArray");
          await Product.findByIdAndUpdate(id, {url, date, price, priceArray, dateArray});
          console.log("Product updated")
          return true;
        }
        
      },

      updateCategory: async (_, {id, name}) => {
        await Category.findByIdAndUpdate(id, {name});
        return true;
      },

      updateProduct: async (_, {id, name, url}) => {
        await Product.findByIdAndUpdate(id, {name, url});
        return true;
      },

      removeProduct: async (_, {id}) => {
        await Product.findByIdAndRemove(id);
        return true;
      },

      removeCategory: async (_, {id}) => {
        await Category.findByIdAndRemove(id);
        return true;
      },

      addDateCategory: async (_, {id, date}) => {
        await Category.findByIdAndUpdate(id, date);
        return true;
      },

  }
};

const server = new GraphQLServer({ typeDefs, resolvers })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  server.start(() => console.log('Server is running on localhost:4000'))
});

module.exports = db
