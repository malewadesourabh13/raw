const express = require('express');

const Product = require('../models/productModel')

//get all products
const getProducts = async(req, res) => {

    try {
        let products 
        if(req.user.paid) {
            products = await Product.find({})
        } else {
            products = await Product.find({}).limit(5)
        }
        return res.send(products)
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//get product by id
const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        return res.send(product)

    } catch (error) {
        res.send({
            status: 404,
            message: 'Product not found'
        })
        console.log(`Error: ${error}`);
    }
}

//delete a product - by admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      return res.send({ message: 'Product removed' })
    } else {
        return res.send({
            status: 404,
            message: `Product not found`
      })
    }
}

//create a product - by admin
const createProduct = async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
   /*  return res.send({
        status: 201,
        createProduct
    }) */
    res.status(201).send(createdProduct)
}


//update a product - by admin
const updateProduct = async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      return res.send(updatedProduct)
    } else {
        return res.send({
            status: 404,
            message: `Product not found`
      })
    }
}

module.exports = {getProducts, getProductById, deleteProduct, createProduct, updateProduct }