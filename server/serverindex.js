const { GraphQLServer } = require('graphql-yoga')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://teamBogo:rainbow6siege@cluster0-vo9fe.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});


//schema model
const Product = mongoose.model('product', {
  name: String,
  category: String,
  brand: String,
  price: Number,
  url: String
});


// schema
const typeDefs = `
  type Query {
    hello(name: String): String! 
    products: [Product]
  }
  type Product {
    id : ID!
    name: String!
    category: String!
    brand: String!
    price: Int!
    url: String!
  }
  type Mutation {
      createProduct(
        name: String!, 
        category: String!, 
        brand: String!, 
        price: Int!, 
        url: String!): Product

      updateProductPrice(
        id: ID!,
        price: Int!): Boolean

      removeProduct(
        id: ID!): Boolean
  }
`


const resolvers = {
  Query: {
    // if no name given, say "hello world"
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    products: () => Product.find()
  },
  Mutation: { 
      createProduct: async (_,{ name, category, brand, price, url }) => {
          const product = new Product({name, category, brand, price, url});
          //saves in data base as it is a promise
          await product.save();
          return product;
      },

      updateProductPrice: async (_, {id, price}) => {
        await Product.findByIdAndUpdate(id, {price});
        return true;
      },

      removeProduct: async (_, {id}) => {
        await Product.findByIdAndRemove(id);
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

