const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 7200;
const mongoose = require("mongoose");
const Order = require("./Order");
const amqp = require("amqplib");
// const isAuthenticated = require("../isAuthenticated");
const isAuthenticated = require("./isAuthenticated");

var channel, connection;

mongoose.connect(
    //"mongodb://localhost/order-service",
    "mongodb://localhost:27017",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error("Failed to connect to MongoDB:", err);
        } else {
            console.log("Order-Service DB Connected");
        }
    }
);
app.use(express.json());

function createOrder(products, userEmail) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total,
    });
    newOrder.save();
    return newOrder;
}

app.get("/order/history", isAuthenticated, async (req, res) => {
    const { email } = req.body;
    try {
        // Retrieve products from the collection based on the specified column and value
        const order = await Order.find({user:email});
        
        if (order.length === 0) {
            return res.json({ message: "No order found" });
        }

        return res.json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/order/track", isAuthenticated, async (req, res) => {
    const {orderId} = req.body;
    try {
        
        // Retrieve product by productId from the collection
        const product = await Order.findOne({ _id: orderId});
        
        if (!product) {
            return res.json({ message: "order not found" });
        }

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/order/manage/delete", isAuthenticated, async (req, res) => {
    const {orderId} = req.body;
    try {
        // Delete the product by ID
        const deletedProduct = await Order.findOneAndRemove({ _id: orderId });

        if (!deletedProduct) {
            return res.json({ message: "order not found" });
        }

        return res.json({ message: "order cancelled successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
});

async function connect() {
    const amqpServer = "amqp://rabbitmq:5672";
    // Connect to RabbitMQ server
    connection = await amqp.connect(amqpServer);
    console.log("Connected to RabbitMQ server.");

    // Create a channel
    channel = await connection.createChannel();
    console.log("Channel created.");
    await channel.assertQueue("ORDER");
}
connect()
    .then(() => {
        channel.consume("ORDER", (data) => {
            try {
                if (data === null) {
                    throw new Error("No message received");
                }

                console.log("Consuming ORDER service");
                const { products, userEmail } = JSON.parse(data.content);
                const newOrder = createOrder(products, userEmail);
                channel.ack(data);
                channel.sendToQueue(
                    "PRODUCT",
                    Buffer.from(JSON.stringify({ newOrder }))
                );
            } catch (error) {
                console.error("Error consuming ORDER service:", error.message);
            }
        });
    })
    .catch((error) => {
        console.error("Error connecting to RabbitMQ:", error.message);
    });


app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});
