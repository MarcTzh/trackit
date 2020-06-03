const { GraphQLServer } = require('graphql-yoga')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://teamBogo:rainbow6siege@cluster0-vo9fe.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});


//schema model
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  price: Number,
  url: String
});

const Product = mongoose.model('product', ProductSchema);


const Category = mongoose.model('category', {
  name: String,
  listProducts: [ProductSchema]
});


// schema
const typeDefs = `
  type Query {
    hello(name: String): String! 
    products: [Product]
    categories: [Category]
  }
  type Product {
    id : ID!
    name: String!
    category: String!
    brand: String!
    price: Int!
    url: String!
  }
  input ProductInput {
    id : ID!
    name: String!
    category: String!
    brand: String!
    price: Int!
    url: String!
  }
  type Category {
    id: ID!
    name: String!
    listProducts: [Product!]
  }
  input ListProductsInput {
    listProducts: [ProductInput]!
  }
  
  type Mutation {
      createProduct(
        name: String!, 
        category: String!, 
        brand: String!, 
        price: Int!, 
        url: String!
      ): Product

      updateProductPrice(
        id: ID!,
        price: Int!
      ): Boolean

      removeProduct(
        id: ID!
      ): Boolean

      createCategory(
        name: String!
      ): Category

      updateCategory(
        id: ID!,
        listProducts: ListProductsInput!
      ): Boolean

      removeCategory(
        id: ID!
      ): Boolean
  }
`


const resolvers = {
  Query: {
    // if no name given, say "hello world"
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    products: () => Product.find(),
    categories: () => Categories.find()
  },
  Mutation: { 
      createProduct: async (_,{ name, category, brand, price, url }) => {
          const product = new Product({name, category, brand, price, url});
          //saves in data base as it is a promise
          await product.save();
          return product;
      },

      createCategory: async (_,{ name }) => {
        const category = new Category({name});
        await category.save();
        return category;
      },

      updateProductPrice: async (_, {id, price}) => {
        await Product.findByIdAndUpdate(id, {price});
        return true;
      },

      updateCategory: async (_, {id, listProducts}) => {
        await Category.findByIdAndUpdate(id, {listProducts});
        return true;
      },

      removeProduct: async (_, {id}) => {
        await Product.findByIdAndRemove(id);
        return true;
      },

      removeCategory: async (_, {id}) => {
        await Category.findByIdAndRemove(id);
        return true;
      }

  }
};

const server = new GraphQLServer({ typeDefs, resolvers })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  server.start(() => console.log('Server is running on localhost:4000'))
});

